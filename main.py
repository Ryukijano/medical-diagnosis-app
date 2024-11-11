import streamlit as st
import google.generativeai as genai
import os
from langchain import LangChain
from langgraph import LangGraph

# Configure the Gemini API
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# Function to diagnose symptoms using the Gemini API
def diagnose(symptoms):
    prompt = f"Patient reports: {symptoms}. What could be wrong?"
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

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

# Streamlit app
st.title("Medical Diagnosis Application")

# Symptom Checker
st.header("Symptom Checker")
symptoms = st.text_area("Describe your symptoms:")
if st.button("Diagnose"):
    with st.spinner("Diagnosing..."):
        diagnosis = diagnose(symptoms)
    st.write("Diagnosis:")
    st.write(diagnosis)

# Health Monitoring
st.header("Health Monitoring")
health_data = st.text_area("Enter your health data:")
if st.button("Analyze Health Data"):
    with st.spinner("Analyzing..."):
        analysis = analyze_health_data(health_data)
    st.write("Health Data Analysis:")
    st.write(analysis)

# Medical Advice Chatbot
st.header("Medical Advice Chatbot")
question = st.text_area("Enter your question:")
if st.button("Ask Chatbot"):
    with st.spinner("Asking..."):
        answer = ask_chatbot(question)
    st.write("Chatbot Response:")
    st.write(answer)
