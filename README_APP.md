# Loan Default Prediction App

This project consists of a Flask backend serving a Logistic Regression model and a React (Vite) frontend.

## 1. Setup

### Prerequisites
- Python 3.x
- Node.js & npm

### Backend Setup
1. Open a terminal in the root directory.
2. Install Python dependencies:
   ```bash
   pip install flask flask-cors pandas scikit-learn joblib
   ```
3. Train the model (if not already done):
   ```bash
   python train_model.py
   ```
4. Start the Flask server:
   ```bash
   cd backend
   python app.py
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup
1. Open a new terminal.
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## Features
- **Machine Learning**: Logistic Regression model trained on `loan_default_preprocessed.csv`.
- **API**: Flask REST API Endpoint `/predict`.
- **UI**: Modern, responsive React interface with Glassmorphism design and animations.
