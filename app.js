function diagnose() {
    const symptoms = document.getElementById('symptoms').value;
    const resultsDiv = document.getElementById('diagnosis-results');
    resultsDiv.innerHTML = '<p>Loading...</p>';
    fetch('/diagnose', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptoms }),
    })
    .then(response => response.json())
    .then(data => {
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
        resultsDiv.innerHTML = '<p>Error occurred. Please try again.</p>';
    });
}
