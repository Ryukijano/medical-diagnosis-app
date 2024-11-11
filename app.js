function diagnose() {
    const symptoms = document.getElementById('symptoms').value;
    const diagnoseButton = document.querySelector('button[onclick="diagnose()"]');
    diagnoseButton.disabled = true;
    diagnoseButton.classList.add('loading');
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
        diagnoseButton.disabled = false;
        diagnoseButton.classList.remove('loading');
        document.getElementById('diagnosis-results').innerText = data.diagnosis;
    })
    .catch(error => {
        hideLoading();
        diagnoseButton.disabled = false;
        diagnoseButton.classList.remove('loading');
        console.error('Error:', error);
    });
}

function analyzeHealthData() {
    const healthData = document.getElementById('health-data').value;
    const analyzeButton = document.querySelector('button[onclick="analyzeHealthData()"]');
    analyzeButton.disabled = true;
    analyzeButton.classList.add('loading');
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
        analyzeButton.disabled = false;
        analyzeButton.classList.remove('loading');
        document.getElementById('health-data-results').innerText = data.analysis;
    })
    .catch(error => {
        hideLoading();
        analyzeButton.disabled = false;
        analyzeButton.classList.remove('loading');
        console.error('Error:', error);
    });
}

function askChatbot() {
    const question = document.getElementById('question').value;
    const askButton = document.querySelector('button[onclick="askChatbot()"]');
    askButton.disabled = true;
    askButton.classList.add('loading');
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
        askButton.disabled = false;
        askButton.classList.remove('loading');
        document.getElementById('chatbot-response').innerText = data.answer;
    })
    .catch(error => {
        hideLoading();
        askButton.disabled = false;
        askButton.classList.remove('loading');
        console.error('Error:', error);
    });
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const sendButton = document.querySelector('button[onclick="sendMessage()"]');
    sendButton.disabled = true;
    sendButton.classList.add('loading');
    showLoading();
    fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        hideLoading();
        sendButton.disabled = false;
        sendButton.classList.remove('loading');
        const chatHistory = document.getElementById('chat-history');
        chatHistory.innerHTML += `<div class="user-message">${userInput}</div>`;
        chatHistory.innerHTML += `<div class="ai-message">${data.response}</div>`;
        document.getElementById('user-input').value = '';
    })
    .catch(error => {
        hideLoading();
        sendButton.disabled = false;
        sendButton.classList.remove('loading');
        console.error('Error:', error);
    });
}

function showLoading() {
    document.querySelector('.loading-indicator').style.display = 'flex';
}

function hideLoading() {
    document.querySelector('.loading-indicator').style.display = 'none';
}
