function diagnose() {
    const symptoms = document.getElementById('symptoms').value;
    // Add code to call the diagnose function from the Streamlit app
    fetch('/diagnose', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptoms }),
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('diagnosis-results');
        resultsDiv.innerHTML = `<p>${data.full_response}</p>`;
        if (data.diagnoses.length > 0) {
            resultsDiv.innerHTML += '<p>Potential diagnoses:</p><ul>';
            data.diagnoses.forEach(diagnosis => {
                resultsDiv.innerHTML += `<li>${diagnosis}</li>`;
            });
            resultsDiv.innerHTML += '</ul>';
        } else {
            resultsDiv.innerHTML += '<p>No specific diagnoses could be determined. Please consult a medical professional.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function analyzeHealthData() {
    const healthData = document.getElementById('health-data').value;
    // Add code to call the analyzeHealthData function from the Streamlit app
    fetch('/analyze_health_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ health_data: healthData }),
    })
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('health-data-results');
        resultsDiv.innerHTML = `<p>${data.analysis}</p>`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function askChatbot() {
    const question = document.getElementById('question').value;
    // Add code to call the askChatbot function from the Streamlit app
    fetch('/ask_chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question }),
    })
    .then(response => response.json())
    .then(data => {
        const responseDiv = document.getElementById('chatbot-response');
        responseDiv.innerHTML = `<p>${data.answer}</p>`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
