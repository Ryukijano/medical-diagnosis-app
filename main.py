import streamlit as st
import google.generativeai as genai
import os
from typing import Dict, TypedDict
from langchain_core.messages import HumanMessage, AIMessage
from langchain.memory import ConversationSummaryMemory
from langchain.chains import ConversationChain, LLMChain
from langchain.agents import Tool, AgentExecutor, create_react_agent
from langchain.prompts import PromptTemplate
from langgraph.graph import StateGraph, END
from langgraph.prebuilt.tool_executor import ToolExecutor

# Configure API
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# Define state schema
class AgentState(TypedDict):
    messages: list
    current_tool: str
    health_history: Dict
    summary: str

# Enhanced tools with more context
def diagnose(symptoms: str, health_history: Dict = None) -> str:
    context = f"Patient history: {health_history}\n" if health_history else ""
    prompt = f"{context}Patient reports: {symptoms}. Provide detailed diagnosis."
    model = genai.GenerativeModel("gemini-1.5-flash")
    return model.generate_content(prompt).text

# Function to analyze health data using the Gemini API
def analyze_health_data(health_data):
    prompt = f"Analyze the following health data: {health_data}"
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

# Function to answer health-related questions using the Gemini API
def ask_chatbot(question):
    prompt = f"Question: {question}"
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

# Create memory with summarization
memory = ConversationSummaryMemory(
    memory_key="chat_history",
    return_messages=True,
    model=genai.GenerativeModel("gemini-1.5-flash")
)

# Define tools
tools = [
    Tool(
        name="symptom_analyzer",
        func=diagnose,
        description="Analyzes patient symptoms with history context"
    ),
    Tool(
        name="health_data_analyzer",
        func=analyze_health_data,
        description="Analyzes health metrics and vital signs"
    )
]

# Create tool executor
tool_executor = ToolExecutor(tools)

# Define state transformations
def route_by_input(state: AgentState) -> str:
    if "symptoms" in state["messages"][-1].content.lower():
        return "diagnose"
    return "chat"

def update_summary(state: AgentState) -> AgentState:
    state["summary"] = memory.predict_new_summary(
        state["messages"][-2].content,
        state["messages"][-1].content,
        state["summary"]
    )
    return state

# Build graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("router", route_by_input)
workflow.add_node("diagnose", tool_executor)
workflow.add_node("summarize", update_summary)

# Add edges
workflow.add_edge("router", "diagnose")
workflow.add_edge("diagnose", "summarize")
workflow.add_edge("summarize", END)

# Compile
chain = workflow.compile()

# Streamlit UI
st.title("Enhanced Medical Diagnosis System")

if "messages" not in st.session_state:
    st.session_state.messages = []
    st.session_state.health_history = {}

user_input = st.text_area("Enter your symptoms or question:")

if st.button("Submit"):
    with st.spinner("Processing..."):
        # Update state
        current_state = {
            "messages": st.session_state.messages + [HumanMessage(content=user_input)],
            "health_history": st.session_state.health_history,
            "summary": memory.buffer,
            "current_tool": None
        }
        
        # Run chain
        result = chain.invoke(current_state)
        
        # Update session state
        st.session_state.messages = result["messages"]
        st.session_state.health_history = result["health_history"]
        
        # Display response
        st.write("Response:", result["messages"][-1].content)
        st.write("Conversation Summary:", result["summary"])
