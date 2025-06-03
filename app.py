from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.preprocessing import StandardScaler
import pandas as pd
import pickle
import logging
import os

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Basic route to test if server is running
@app.route('/')
def home():
    logger.info("Home endpoint called")
    return jsonify({"message": "Server is running"})

@app.route('/test')
def test():
    logger.info("Test endpoint called")
    return jsonify({"message": "Server is running", "status": "success"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        logger.info("Predict endpoint called")
        data = request.get_json()
        logger.debug(f"Received data: {data}")
        
        # Load the model and scaler
        model_path = os.path.join(os.path.dirname(__file__), 'models', 'linear_regression.pkl')
        scaler_path = os.path.join(os.path.dirname(__file__), 'models', 'scaler.pkl')
        
        with open(model_path, 'rb') as model_file:
            model = pickle.load(model_file)
        with open(scaler_path, 'rb') as file:
            scaler = pickle.load(file)

        # Extract data
        designation = int(data['designation'])
        resource_allocation = float(data['resource_allocation'])
        mental_fatigue_score = float(data['mental_fatigue_score'])
        company_type = data['company_type']
        wfh_setup_available = data['wfh_setup_available']
        gender = data['gender']
        
        # Create DataFrame
        input_data = pd.DataFrame({
            'Designation': [designation],
            'Resource Allocation': [resource_allocation],
            'Mental Fatigue Score': [mental_fatigue_score],
            'Company Type_Service': [company_type],
            'WFH Setup Available_Yes': [wfh_setup_available],
            'Gender_Male': [gender]
        })
        
        # Convert categorical variables
        input_data['Company Type_Service'] = 1 if input_data.at[0, 'Company Type_Service'] == 'Service' else 0
        input_data['WFH Setup Available_Yes'] = 1 if input_data.at[0, 'WFH Setup Available_Yes'] == 'Yes' else 0
        input_data['Gender_Male'] = 1 if input_data.at[0, 'Gender_Male'] == 'Male' else 0

        # Make prediction
        scaled_data = scaler.transform(input_data)
        prediction = float(model.predict(scaled_data)[0] * 100)
        rounded_prediction = round(prediction, 2)
        
        logger.info(f"Prediction made: {rounded_prediction}")
        return jsonify({
            'prediction': rounded_prediction,
            'status': 'success'
        })
    
    except Exception as e:
        logger.error(f"Error in predict endpoint: {str(e)}", exc_info=True)
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 400

# For local development
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 9000))
    app.run(host='0.0.0.0', port=port, debug=True)