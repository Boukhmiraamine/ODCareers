from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from pymongo import MongoClient
import os

app = Flask(__name__)

mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client['db_recrutement']
jobs_collection = db['jobs']

tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModelForSequenceClassification.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

def encode(texts):
    inputs = tokenizer(texts, padding=True, truncation=True, return_tensors="pt", max_length=512)
    with torch.no_grad():  
        outputs = model(**inputs)
    return torch.nn.functional.softmax(outputs.logits, dim=1)[:, 1]  

@app.route('/search', methods=['POST'])
def search_jobs():
    try:
        search_query = request.json['query']
        job_docs = list(jobs_collection.find({}, {'_id': 0, 'description': 1}))

        results = []
        descriptions = [doc['description'] for doc in job_docs]
        scores = encode([search_query] + descriptions)  

        for doc, score in zip(job_docs, scores[1:]):  
            if score.item() > 0.8: 
                doc['similarity'] = score.item()
                results.append(doc)

        if not results:
            return jsonify({'message': 'No matching jobs found'}), 404
        return jsonify(results)

    except Exception as e:
        return jsonify({'error': 'Failed to process search', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
