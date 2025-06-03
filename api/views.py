from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import pickle
from sklearn.preprocessing import StandardScaler

class PredictBurnoutView(APIView):
    def post(self, request):
        try:
            # Load the trained model and scaler
            with open('models/linear_regression.pkl', 'rb') as model_file:
                model = pickle.load(model_file)
            with open('models/scaler.pkl', 'rb') as file:
                scaler = pickle.load(file)

            # Get data from request
            data = request.data
            designation = int(data.get('designation'))
            resource_allocation = float(data.get('resource_allocation'))
            mental_fatigue_score = float(data.get('mental_fatigue_score'))
            company_type = data.get('company_type')
            wfh_setup_available = data.get('wfh_setup_available')
            gender = data.get('gender')

            # Prepare input data
            input_data = pd.DataFrame({
                'Designation': [designation],
                'Resource Allocation': [resource_allocation],
                'Mental Fatigue Score': [mental_fatigue_score],
                'Company Type_Service': [1 if company_type == 'Service' else 0],
                'WFH Setup Available_Yes': [1 if wfh_setup_available == 'Yes' else 0],
                'Gender_Male': [1 if gender == 'Male' else 0]
            })

            # Scale the data
            scaled_data = scaler.transform(input_data)
            
            # Make prediction
            prediction = model.predict(scaled_data)[0]
            rounded_prediction = round(prediction, 2)

            return Response({
                'prediction': rounded_prediction
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST) 