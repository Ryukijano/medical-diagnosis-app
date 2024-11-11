# Medical Diagnosis Application

This application allows users to input their symptoms and receive potential diagnoses and explanations from the Gemini API. It also includes features for health monitoring and a medical advice chatbot.

## Features

- **Symptom Checker**: Input your symptoms to receive potential diagnoses and explanations from the Gemini API.
- **Health Monitoring**: Input your daily health data (e.g., temperature, blood pressure, heart rate) to receive personalized health recommendations.
- **Medical Advice Chatbot**: Ask health-related questions to the chatbot and receive medical advice based on your symptoms.

## Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/githubnext/workspace-blank.git
    cd workspace-blank
    ```

2. **Set up GitHub Secrets**:
    - Navigate to the repository settings on GitHub.
    - Select "Secrets" and add a new secret with the name `GOOGLE_API_KEY`.

3. **Create a `.streamlit/secrets.toml` file**:
    ```toml
    [api_keys]
    google_gemini = "YOUR_API_KEY"
    ```

4. **Install dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

5. **Run the application locally**:
    ```sh
    streamlit run main.py
    ```

## Deployment

The application is configured to be deployed on GitHub Pages using GitHub Actions. The deployment workflow is defined in the `.github/workflows/deploy.yml` file.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with a descriptive message.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Additional Features

- **Responsive AI Respond Button**: The application now includes a responsive AI respond button and a waiting for response button. The buttons are styled to be user-friendly and visually appealing.
- **Loading Indicator**: A loading indicator is displayed while the AI is processing the input, providing a better user experience.
- **Enhanced UI/UX**: The user interface has been improved to make the application more user-friendly and visually appealing.
- **Secure API Key Handling**: The API key is securely read from the secrets file, enhancing security.
