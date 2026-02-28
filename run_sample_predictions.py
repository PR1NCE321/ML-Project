import pandas as pd
import joblib
import os

# Define paths
MODEL_PATH = 'model.pkl'

def test_model():
    print(f"Loading model from {MODEL_PATH}...")
    
    if not os.path.exists(MODEL_PATH):
        print("Error: model.pkl not found. Please run 'python train_model.py' first.")
        return

    try:
        model = joblib.load(MODEL_PATH)
    except Exception as e:
        print(f"Error loading model: {e}")
        return

    # Define sample data (Test Cases)
    samples = [
        {
            # Case 1: Likely Low Risk (High Income, Good Credit, Low Loan)
            "Age": 45,
            "Income": 95000,
            "LoanAmount": 20000,
            "CreditScore": 750,
            "MonthsEmployed": 120,
            "NumCreditLines": 3,
            "InterestRate": 4.5,
            "LoanTerm": 36,
            "DTIRatio": 0.2,
            "Education": "Master's",
            "EmploymentType": "Full-time",
            "MaritalStatus": "Married",
            "HasMortgage": 1,
            "HasDependents": 1,
            "LoanPurpose": "Home",
            "HasCoSigner": 1
        },
        {
            # Case 2: Likely High Risk (Low Income, Poor Credit, High Loan)
            "Age": 22,
            "Income": 25000,
            "LoanAmount": 50000,
            "CreditScore": 580,
            "MonthsEmployed": 6,
            "NumCreditLines": 8,
            "InterestRate": 25.0,
            "LoanTerm": 60,
            "DTIRatio": 0.6,
            "Education": "High School",
            "EmploymentType": "Unemployed",
            "MaritalStatus": "Single",
            "HasMortgage": 0,
            "HasDependents": 0,
            "LoanPurpose": "Other",
            "HasCoSigner": 0
        },
         {
            # Case 3: Moderate/Average Case
            "Age": 35,
            "Income": 55000,
            "LoanAmount": 30000,
            "CreditScore": 680,
            "MonthsEmployed": 48,
            "NumCreditLines": 5,
            "InterestRate": 12.0,
            "LoanTerm": 48,
            "DTIRatio": 0.4,
            "Education": "Bachelor's",
            "EmploymentType": "Full-time",
            "MaritalStatus": "Single",
            "HasMortgage": 0,
            "HasDependents": 1,
            "LoanPurpose": "Auto",
            "HasCoSigner": 0
        }
    ]

    print("\n" + "="*50)
    print("RUNNING PREDICTIONS ON SAMPLE DATA")
    print("="*50 + "\n")

    for i, sample_data in enumerate(samples, 1):
        print(f"Sample #{i}:")
        print("-" * 20)
        # Convert single dictionary to DataFrame
        df = pd.DataFrame([sample_data])
        
        # Display key input features for context
        print(f"Profile: Age {sample_data['Age']}, Income ${sample_data['Income']}, Score {sample_data['CreditScore']}, Loan ${sample_data['LoanAmount']}")
        print(f"Status: {sample_data['EmploymentType']}, {sample_data['Education']}")
        
        try:
            # Predict Class
            prediction = model.predict(df)[0]
            # Predict Probability
            probs = model.predict_proba(df)[0]
            prob_default = probs[1]
            
            result_text = "DEFAULT (High Risk)" if prediction == 1 else "NO DEFAULT (Low Risk)"
            color_code = "\033[91m" if prediction == 1 else "\033[92m" # Red or Green ANSI
            reset_code = "\033[0m"
            
            print(f"\nPrediction: {color_code}{result_text}{reset_code}")
            print(f"Probability of Default: {prob_default:.2%}")
        except Exception as e:
            print(f"Error during prediction: {e}")
            
        print("\n" + "="*50 + "\n")

if __name__ == "__main__":
    test_model()
