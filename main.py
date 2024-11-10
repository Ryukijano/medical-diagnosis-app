import os
import re
import streamlit as st
import google.generativeai as genai

# Set your API key
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# Initialize the Gemini client
model = genai.GenerativeModel("gemini-1.5-flash")

def diagnose(symptoms):
    prompt = f"Patient reports: {symptoms}. What could be wrong?"
    response = model.generate_content(prompt)

    # Extract potential diagnoses (this is a simple example, you'll need more robust NLP techniques)
    diagnoses = re.findall(r"Possible diagnoses?:?\s*(.*?)\n", response.text)

    return diagnoses, response.text

def analyze_health_data(data):
    prompt = f"Analyze the following health data: {data}. Provide personalized health recommendations."
    response = model.generate_content(prompt)
    return response.text

def chatbot(question):
    prompt = f"User asks: {question}"
    response = model.generate_content(prompt)
    return response.text

# Streamlit interface
st.title("Medical Diagnosis Application")
st.write("Input your symptoms to receive potential diagnoses and explanations from Gemini.")

# User input for symptoms
symptoms = st.text_area("Describe your symptoms:")

if st.button("Diagnose"):
    if symptoms:
        diagnoses, full_response = diagnose(symptoms)
        
        # Display results
        st.write("Disclaimer: This is for informational purposes only and not a substitute for professional medical advice.")
        if diagnoses:
            st.write("Potential diagnoses:")
            for diagnosis in diagnoses:
                st.write(f"- {diagnosis}")
        else:
            st.write("No specific diagnoses could be determined. Please consult a medical professional.")
        st.write("\nFull response from Gemini:")
        st.write(full_response)
    else:
        st.write("Please enter your symptoms.")

# User input for health data
st.write("Input your daily health data to receive personalized health recommendations.")
health_data = st.text_area("Enter your health data (e.g., temperature, blood pressure, heart rate):")

if st.button("Analyze Health Data"):
    if health_data:
        analysis = analyze_health_data(health_data)
        st.write("Health Data Analysis:")
        st.write(analysis)
    else:
        st.write("Please enter your health data.")

# User input for chatbot
st.write("Ask any health-related questions to the chatbot.")
question = st.text_area("Enter your question:")

if st.button("Ask Chatbot"):
    if question:
        answer = chatbot(question)
        st.write("Chatbot Response:")
        st.write(answer)
    else:
        st.write("Please enter your question.")
