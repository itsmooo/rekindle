import React, { useState } from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import axios from "axios";

type PredictionResult = {
  risk: "low" | "moderate" | "high";
  score: number;
  recommendations: string[];
};

const BurnoutPredictionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    designation: "",
    resourceAllocation: "",
    mentalFatigueScore: "",
    companyType: "Service",
    wfhSetup: "Yes",
    gender: "Male",
  });

  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Form submitted");

    try {
      // Test server connection
      console.log("Testing server connection...");
      try {
        const testResponse = await axios.get("http://localhost:9000/test", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        console.log("Server test successful:", testResponse.data);
      } catch (testError) {
        console.error("Server test failed:", testError);
        throw new Error("Could not connect to server. Please ensure the server is running.");
      }

      // Prepare data for backend
      const backendData = {
        designation: parseInt(formData.designation),
        resource_allocation: parseFloat(formData.resourceAllocation),
        mental_fatigue_score: parseFloat(formData.mentalFatigueScore),
        company_type: formData.companyType,
        wfh_setup_available: formData.wfhSetup,
        gender: formData.gender,
      };

      console.log("Sending prediction request with data:", backendData);

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to make a prediction');
      }

      // Make prediction request and save to backend
      const response = await axios.post(
        "http://localhost:8000/api/predict",
        backendData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Received prediction response:", response.data);

      if (response.data.status === 'error') {
        throw new Error(response.data.error || 'Prediction failed');
      }

      const prediction = response.data.prediction;

      // Convert prediction to risk level and recommendations
      const result: PredictionResult = {
        risk: prediction > 70 ? "high" : prediction > 40 ? "moderate" : "low",
        score: Math.round(prediction),
        recommendations: getRecommendations(prediction),
      };

      console.log("Processed prediction result:", result);
      setPredictionResult(result);

    } catch (err: unknown) {
      console.error("Error in handleSubmit:", err);
      if (axios.isAxiosError(err)) {
        console.error("Axios error details:", {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          headers: err.response?.headers,
        });
        setError(
          err.response?.data?.error || 
          `Request failed: ${err.response?.status} ${err.response?.statusText}` ||
          "An error occurred while making the prediction"
        );
      } else {
        setError((err as Error).message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = (score: number): string[] => {
    const recommendations = [
      "Schedule regular breaks throughout the day",
      "Practice stress management techniques",
      "Set clear boundaries between work and personal life",
      "Engage in regular physical activity",
    ];

    if (score > 70) {
      recommendations.push(
        "Consider taking a short leave of absence",
        "Schedule regular check-ins with a mental health professional",
        "Discuss workload with your manager"
      );
    } else if (score > 40) {
      recommendations.push(
        "Take regular short breaks during work hours",
        "Practice mindfulness exercises",
        "Maintain a consistent sleep schedule"
      );
    }

    return recommendations;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-serif mb-4 text-gray-800">
          Employee Burnout Prediction
        </h2>
        <p className="text-gray-600">
          Fill in the details below to assess potential burnout risk and receive
          personalized recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Designation
            </label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Designation</option>
              <option value="1">Entry Level</option>
              <option value="2">Mid Level</option>
              <option value="3">Senior Level</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resource Allocation (%)
            </label>
            <input
              type="number"
              name="resourceAllocation"
              value={formData.resourceAllocation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter percentage (0-100)"
              min="0"
              max="100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mental Fatigue Score (0-10)
            </label>
            <input
              type="number"
              name="mentalFatigueScore"
              value={formData.mentalFatigueScore}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Rate from 0 to 10"
              min="0"
              max="10"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Type
            </label>
            <select
              name="companyType"
              value={formData.companyType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Service">Service</option>
              <option value="Product">Product</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WFH Setup Available
            </label>
            <select
              name="wfhSetup"
              value={formData.wfhSetup}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Predicting..." : "Predict Burnout Risk"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {predictionResult && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-start space-x-4">
            <div
              className={`p-3 rounded-full ${
                predictionResult.risk === "high"
                  ? "bg-red-100 text-red-600"
                  : predictionResult.risk === "moderate"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              <AlertCircle className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Burnout Risk Assessment: {predictionResult.score}%
              </h3>
              <p
                className={`text-lg font-medium mb-4 ${
                  predictionResult.risk === "high"
                    ? "text-red-600"
                    : predictionResult.risk === "moderate"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {predictionResult.risk.charAt(0).toUpperCase() +
                  predictionResult.risk.slice(1)}{" "}
                Risk
              </p>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Recommendations:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {predictionResult.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurnoutPredictionForm;
