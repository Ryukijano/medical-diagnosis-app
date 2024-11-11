const fetch = require('node-fetch');

describe('Application Tests', () => {
    test('hello world!', () => {
        expect(1 + 1).toBe(2);
    });
});

describe('API Integration Tests', () => {
  test('diagnose endpoint', async () => {
    const response = await fetch('/diagnose', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms: 'headache' }),
    });
    const data = await response.json();
    expect(data).toHaveProperty('diagnoses');
    expect(data).toHaveProperty('full_response');
  });

  test('analyze_health_data endpoint', async () => {
    const response = await fetch('/analyze_health_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ healthData: '98.6, 120/80, 72' }),
    });
    const data = await response.json();
    expect(data).toHaveProperty('analysis');
  });

  test('ask_chatbot endpoint', async () => {
    const response = await fetch('/ask_chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: 'What is a healthy diet?' }),
    });
    const data = await response.json();
    expect(data).toHaveProperty('answer');
  });

  test('send_message endpoint', async () => {
    const response = await fetch('/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Tell me about the symptoms of flu.' }),
    });
    const data = await response.json();
    expect(data).toHaveProperty('response');
  });
});
