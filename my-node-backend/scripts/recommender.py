from flask import Flask, request, jsonify
import pandas as pd
from keybert import KeyBERT
from fuzzywuzzy import fuzz, process
import numpy as np

app = Flask(__name__)

# Load technologies data
df = pd.read_csv('technologies.csv')
techs_df = pd.DataFrame(df).fillna('')

# Initialize KeyBERT model
kw_model = KeyBERT()

def extract_keywords(doc):
    """
    Extracts the top 10 keywords from a given document using KeyBERT.
    """
    keyphrases = kw_model.extract_keywords(doc, keyphrase_ngram_range=(1, 2), top_n=10)
    return list(set(keyword for keyword, score in keyphrases))

def filter_skills(keywords, techs_df):
    """
    Filters and categorizes skills based on keywords and the technology dataset.
    """
    matched_skills = []
    for keyword in keywords:
        for category in techs_df.columns:
            for tech in techs_df[category].dropna().unique():
                score = fuzz.token_sort_ratio(keyword.lower(), tech.lower())
                if score >= 60:
                    matched_skills.append(tech)
    return list(set(matched_skills))

@app.route('/match', methods=['POST'])
def match_descriptions():
    data = request.json
    job_skills = data.get('job_description', [])  # Assume this is now a list of skill names
    candidate_description = data.get('candidate_description', '')

    # Extract keywords from candidate description
    candidate_keywords = extract_keywords(candidate_description)

    # Filter candidate skills based on extracted keywords
    candidate_skills = filter_skills(candidate_keywords, techs_df)

    # Compare filtered candidate skills with the list of job skills
    matched_scores = {}
    for job_skill in job_skills:
        best_score = max(fuzz.partial_ratio(job_skill, cand_skill) for cand_skill in candidate_skills)
        matched_scores[job_skill] = best_score

    # Calculate the global matching score
    global_score = np.mean(list(matched_scores.values())) if matched_scores else 0

    return jsonify({
        'global_match_score': global_score,
        'job_skills': job_skills,
        'candidate_skills': candidate_skills,
        'candidate_keywords': candidate_keywords,
        'matched_scores': matched_scores
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
