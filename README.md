# Flask Document Query Engine with React Frontend

This project is a full-stack application that allows users to upload documents and query them using natural language processing. The backend is built with Flask and integrates with Azure OpenAI for language models and embeddings. The frontend is built with React and provides a user-friendly interface for uploading documents and querying them.


## Features

- Upload documents via a REST API.
- Query the uploaded documents using natural language processing.
- Integration with Azure OpenAI for language models and embeddings.
- User-friendly React frontend for document upload and querying.

## Prerequisites

- Python 3.7 or later
- Node.js and npm
- Azure OpenAI account with API key and endpoint

## Installation

### Backend

1. Clone the repository:

    ```sh
    git clone https://github.com/VykuntaBoddepalli/Document-Query-System.git
    ```

2. Create a virtual environment and activate it:

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required dependencies:

    ```sh
    pip install -r requirements.txt
    ```

4. Create a `.env` file in the `Document Query Sytem` directory with the following content:

    ```plaintext
    AZURE_OPENAI_ENGINE=gpt-4o-mini
    AZURE_OPENAI_ENDPOINT=your_azure_openai_endpoint
    AZURE_OPENAI_API_KEY=your_azure_openai_api_key
    AZURE_OPENAI_MODEL=gpt-35-turbo-16k
    AZURE_OPENAI_API_VERSION=2024-05-01-preview
    AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME=text-embedding-ada-002
    AZURE_OPENAI_EMBEDDING_MODEL=text-embedding-ada-002
    ```

    Replace `your_azure_openai_endpoint` and `your_azure_openai_api_key` with your actual Azure OpenAI endpoint and API key.

5. Start the Flask application:

    ```sh
    python app.py
    ```

    The backend will be running at `http://127.0.0.1:5000/`.

### Frontend

1. Navigate to the `document-analysis-frontend` directory:

    ```sh
    cd ../document-analysis-frontend
    ```

2. Install the required dependencies:

    ```sh
    npm install
    ```

3. Start the React application:

    ```sh
    npm start
    ```

    The frontend will be running at `http://localhost:3000/`.

## Configuration

Ensure that the `.env` file in the `Document Query System` directory is correctly configured with your Azure OpenAI credentials.

## Usage

1. Open your browser and navigate to `http://localhost:3000/`.
2. Use the interface to upload a document and query it.

## API Endpoints

### Upload Document

- **URL**: `/upload`
- **Method**: `POST`
- **Description**: Upload a document to be indexed.
- **Request**:
  - Form data with a file field named `file`.
- **Response**:
  - `200 OK` with a JSON message indicating success.
  - `400 Bad Request` if no file is provided.

### Query Document

- **URL**: `/query`
- **Method**: `POST`
- **Description**: Query the uploaded documents.
- **Request**:
  - JSON body with a field named `query`.
- **Response**:
  - `200 OK` with a JSON response containing the query result.
  - `400 Bad Request` if no query is provided.
