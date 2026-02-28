from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

# Load model
# Assuming model.pkl is in the root directory relative to this file
MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../model.pkl'))

print(f"Loading model from: {MODEL_PATH}")
try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print("Model loaded successfully.")
    else:
        print("Model file not found!")
        model = None
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "ML Model API is running"}), 200

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        data = request.json
        
        # Convert to DataFrame
        # The pipeline expects a DataFrame with specific columns
        df = pd.DataFrame([data])
        
        # Predict
        prediction = model.predict(df)[0]
        # Probability of class 1 (Default)
        probability = model.predict_proba(df)[0][1]
        
        result = {
            'prediction': int(prediction),
            'probability': float(probability),
            'message': 'High Risk of Loan' if prediction == 1 else 'Low Risk of Loan'
        }
        
        return jsonify(result)
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
