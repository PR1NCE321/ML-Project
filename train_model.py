import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score

# Load data
print("Loading data...")
data = pd.read_csv('data/loan_default_preprocessed.csv')

# Define features
# Categorical columns that need encoding
categorical_features = ['Education', 'EmploymentType', 'MaritalStatus', 'LoanPurpose']

# Binary columns that are already 0/1 (treat as numeric or passthrough)
binary_features = ['HasMortgage', 'HasDependents', 'HasCoSigner']

# Continuous numerical columns
numerical_features = ['Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed', 
                      'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio']

# All features needed for input
feature_columns = numerical_features + binary_features + categorical_features

X = data[feature_columns]
y = data['Default']

# Create Preprocessing Pipeline
# Scale numerical data, OneHotEncode categorical data, Passthrough binary data
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_features),
        ('cat', OneHotEncoder(drop='first', handle_unknown='ignore'), categorical_features),
        ('bin', 'passthrough', binary_features)
    ])

# Create full pipeline with classifier
# Using max_iter=1000 to avoid convergence warnings
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression(max_iter=1000, class_weight='balanced'))
])

# Split data
print("Splitting data...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train
print("Training model...")
pipeline.fit(X_train, y_train)

# Evaluate
print("Evaluating model...")
train_score = pipeline.score(X_train, y_train)
test_score = pipeline.score(X_test, y_test)
print(f"Train Accuracy: {train_score:.4f}")
print(f"Test Accuracy: {test_score:.4f}")

# Save
print("Saving model to model.pkl...")
joblib.dump(pipeline, 'model.pkl')
print("Model saved successfully!")
