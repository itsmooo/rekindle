import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
import pickle

# Load the data
data = pd.read_csv('data/raw/raw_data.csv')

# Prepare features
X = data[['Designation', 'Resource Allocation', 'Mental Fatigue Score']].copy()
X['Company Type_Service'] = (data['Company Type'] == 'Service').astype(int)
X['WFH Setup Available_Yes'] = (data['WFH Setup Available'] == 'Yes').astype(int)
X['Gender_Male'] = (data['Gender'] == 'Male').astype(int)

# Fill missing values with median
X = X.fillna(X.median())

# Handle missing values in target variable
y = data['Burn Rate'].fillna(data['Burn Rate'].median())

# Create and fit the scaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Create and train the model
model = LinearRegression()
model.fit(X_scaled, y)

# Save the model and scaler
with open('models/linear_regression.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('models/scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

print("Model and scaler have been retrained and saved successfully!") 