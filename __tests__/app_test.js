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
});