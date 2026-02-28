import pandas as pd
import joblib
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from sklearn.model_selection import train_test_split

# Load data and model
print("Loading data and model...")
data = pd.read_csv('data/loan_default_preprocessed.csv')
model = joblib.load('model.pkl')

# Check Class Balance
print("\n" + "="*40)
print("CLASS DISTRIBUTION (Target Variable 'Default')")
print("="*40)
print(data['Default'].value_counts(normalize=True))
print("="*40)

# Prepare Data (Same logic as training)
categorical_features = ['Education', 'EmploymentType', 'MaritalStatus', 'LoanPurpose']
binary_features = ['HasMortgage', 'HasDependents', 'HasCoSigner']
numerical_features = ['Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed', 
                      'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio']
feature_columns = numerical_features + binary_features + categorical_features

X = data[feature_columns]
y = data['Default']

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Predict
print("\nRunning predictions on Test Set...")
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

# Detailed Metrics
print("\n" + "="*40)
print("DETAILED PERFORMANCE REPORT")
print("="*40)
print(classification_report(y_test, y_pred))

print("\n" + "="*40)
print("CONFUSION MATRIX")
print("="*40)
cm = confusion_matrix(y_test, y_pred)
tn, fp, fn, tp = cm.ravel()
print(f"True Negatives (Correctly predicted NO Default): {tn}")
print(f"False Positives (Predicted Default but didn't): {fp}")
print(f"False Negatives (Predicted NO Default but actually Defaulted): {fn}  <-- CRITICAL ERROR TYPE")
print(f"True Positives (Correctly predicted Default): {tp}")

print("\n" + "="*40)
print(f"ROC-AUC Score: {roc_auc_score(y_test, y_prob):.4f}")
print("="*40)
