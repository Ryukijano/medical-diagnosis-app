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

# Define a single state interface
class AgentState(TypedDict):
    messages: list
    summary: str
    current_tool: str
    context: Dict

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

# Create a state router that determines the appropriate tool
def process_message(state: AgentState) -> AgentState:
    message = state["messages"][-1].content
    
    if state["current_tool"] == "diagnose":
        response = diagnose(message, state["context"].get("health_history"))
    elif state["current_tool"] == "analyze":
        response = analyze_health_data(message)
    else:
        response = ask_chatbot(message)
        
    state["messages"].append(AIMessage(content=response))
    return state

# Update the router to handle all cases
def route_by_intent(state: AgentState) -> AgentState:
    message = state["messages"][-1].content.lower()
    
    if any(word in message for word in ["symptom", "pain", "feel"]):
        state["current_tool"] = "diagnose"
    elif any(word in message for word in ["data", "stats", "measurements"]):
        state["current_tool"] = "analyze"
    else:
        state["current_tool"] = "chat"
        
    return state

def update_summary(state: AgentState) -> AgentState:
    state["summary"] = memory.predict_new_summary(
        state["messages"][-2].content,
        state["messages"][-1].content,
        state["summary"]
    )
    return state

# Define a unified state manager
def get_state_reducer():
    return (
        StateGraph(AgentState)
        .add_node("router", route_by_intent)
        .add_node("process", process_message)
        .add_node("summarize", update_summary)
        .add_edge("router", "process")
        .add_edge("process", "summarize")
        .add_edge("summarize", END)
    )

# Simplified UI with one chat interface
st.title("Medical Assistant")

if "messages" not in st.session_state:
    st.session_state.messages = []
    st.session_state.context = {"health_history": {}}

chat_container = st.container()
user_input = st.text_input("Enter your message:", key="user_input")

if st.button("Send", key="send_button", type="primary"):
    with st.spinner("Processing..."):
        workflow = get_state_reducer().compile()
        
        current_state = {
            "messages": st.session_state.messages + [HumanMessage(content=user_input)],
            "context": st.session_state.context,
            "summary": "",
            "current_tool": None
        }
        
        result = workflow.invoke(current_state)
        st.session_state.messages = result["messages"]
        st.session_state.context = result["context"]
