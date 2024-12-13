from flask import Flask, request, jsonify
from flask_cors import CORS
from llama_index.llms import AzureOpenAI
from llama_index import ServiceContext, SimpleDirectoryReader, VectorStoreIndex
from llama_index.embeddings import AzureOpenAIEmbedding
import os
import shutil
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize your LLM and embedding model
llm = AzureOpenAI(
    engine=os.getenv("AZURE_OPENAI_ENGINE"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    model=os.getenv("AZURE_OPENAI_MODEL"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION")
)

embbed_model = AzureOpenAIEmbedding(
    deployment_name=os.getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    model=os.getenv("AZURE_OPENAI_EMBEDDING_MODEL")
)

service_context = ServiceContext.from_defaults(
    llm=llm,
    embed_model=embbed_model
)

# Directory to store uploaded documents
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Clear the upload directory
    for filename in os.listdir(UPLOAD_FOLDER):
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print(f'Failed to delete {file_path}. Reason: {e}')

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Load the document and create the index
    documents = SimpleDirectoryReader(UPLOAD_FOLDER).load_data(show_progress=True)
    index = VectorStoreIndex.from_documents(documents, service_context=service_context, show_progress=True)
    global query_engine
    query_engine = index.as_query_engine()

    return jsonify({"message": "File uploaded and indexed successfully"}), 200

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    user_query = data.get('query')
    if not user_query:
        return jsonify({"error": "No query provided"}), 400

    response = query_engine.query(user_query)
    return jsonify({"response": str(response)}), 200

if __name__ == '__main__':
    app.run(debug=True)
