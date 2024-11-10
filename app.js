function showLoadingIndicator() {
    document.getElementById('loading-indicator').style.display = 'block';
}

function hideLoadingIndicator() {
    document.getElementById('loading-indicator').style.display = 'none';
}

function diagnose() {
    const symptoms = document.getElementById('symptoms').value;
    showLoadingIndicator();
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
        hideLoadingIndicator();
    })
    .catch(error => {
        console.error('Error:', error);
        hideLoadingIndicator();
    });
}

function analyzeHealthData() {
    const healthData = document.getElementById('health-data').value;
    showLoadingIndicator();
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
        hideLoadingIndicator();
    })
    .catch(error => {
        console.error('Error:', error);
        hideLoadingIndicator();
    });
}

function askChatbot() {
    const question = document.getElementById('question').value;
    showLoadingIndicator();
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
        hideLoadingIndicator();
    })
    .catch(error => {
        console.error('Error:', error);
        hideLoadingIndicator();
    });
}
