function diagnose() {
    const symptoms = document.getElementById('symptoms').value;
    showLoading();
    fetch('/diagnose', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
    })
    .then(response => response.json())
    .then(data => {
        hideLoading();
        document.getElementById('diagnosis-results').innerText = data.diagnosis;
    })
    .catch(error => {
        hideLoading();
        console.error('Error:', error);
    });
}

function analyzeHealthData() {
    const healthData = document.getElementById('health-data').value;
    showLoading();
    fetch('/analyze_health_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ healthData }),
    })
    .then(response => response.json())
    .then(data => {
        hideLoading();
        document.getElementById('health-data-results').innerText = data.analysis;
    })
    .catch(error => {
        hideLoading();
        console.error('Error:', error);
    });
}

function askChatbot() {
    const question = document.getElementById('question').value;
    showLoading();
    fetch('/ask_chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    })
    .then(response => response.json())
    .then(data => {
        hideLoading();
        document.getElementById('chatbot-response').innerText = data.answer;
    })
    .catch(error => {
        hideLoading();
        console.error('Error:', error);
    });
}

function showLoading() {
    document.querySelector('.loading-indicator').style.display = 'flex';
}

function hideLoading() {
    document.querySelector('.loading-indicator').style.display = 'none';
}
