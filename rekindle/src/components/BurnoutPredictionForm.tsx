import React, { useState } from "react";
import { AlertCircle, ArrowRight, TrendingUp, CheckCircle, XCircle, AlertTriangle, Brain, Target, Zap } from "lucide-react";
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

  const getRiskConfig = (risk: string) => {
    switch (risk) {
      case "high":
        return {
          color: "from-red-500 to-red-600",
          bgColor: "from-red-50 to-red-100",
          textColor: "text-red-700",
          icon: XCircle,
          borderColor: "border-red-200"
        };
      case "moderate":
        return {
          color: "from-yellow-500 to-orange-500",
          bgColor: "from-yellow-50 to-orange-100",
          textColor: "text-orange-700",
          icon: AlertTriangle,
          borderColor: "border-orange-200"
        };
      default:
        return {
          color: "from-green-500 to-emerald-600",
          bgColor: "from-green-50 to-emerald-100",
          textColor: "text-green-700",
          icon: CheckCircle,
          borderColor: "border-green-200"
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
      {/* Header Section - Updated to match website colors */}
      <div className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 p-8 md:p-12">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI Burnout Prediction
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get personalized insights using our advanced machine learning model trained on workplace wellness data
          </p>
        </div>
      </div>

      <div className="p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Designation */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2 text-blue-500" />
                Career Level
              </label>
              <div className="relative">
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none text-gray-800 font-medium"
                  required
                >
                  <option value="">Select your career level</option>
                  <option value="1">Entry Level (0-2 years)</option>
                  <option value="2">Mid Level (3-7 years)</option>
                  <option value="3">Senior Level (8+ years)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Resource Allocation */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-indigo-500" />
                Resource Allocation (0-10)
              </label>
              <input
                type="number"
                name="resourceAllocation"
                value={formData.resourceAllocation}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-800 font-medium"
                placeholder="Rate your resource adequacy (0=poor, 10=excellent)"
                min="0"
                max="10"
                step="0.1"
                required
              />
            </div>

            {/* Mental Fatigue Score */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Brain className="w-4 h-4 mr-2 text-blue-600" />
                Mental Fatigue Level (0-10)
              </label>
              <input
                type="number"
                name="mentalFatigueScore"
                value={formData.mentalFatigueScore}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 text-gray-800 font-medium"
                placeholder="Rate your mental exhaustion (0=none, 10=extreme)"
                min="0"
                max="10"
                required
              />
            </div>

            {/* Company Type */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Company Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Service", "Product"].map((type) => (
                  <label key={type} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="companyType"
                      value={type}
                      checked={formData.companyType === type}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 text-center font-medium transition-all duration-200 ${
                      formData.companyType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-gray-50/50 text-gray-600 hover:border-gray-300'
                    }`}>
                      {type}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* WFH Setup */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Work From Home Available
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="wfhSetup"
                      value={option}
                      checked={formData.wfhSetup === option}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 text-center font-medium transition-all duration-200 ${
                      formData.wfhSetup === option
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-gray-50/50 text-gray-600 hover:border-gray-300'
                    }`}>
                      {option}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Male", "Female"].map((gender) => (
                  <label key={gender} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 text-center font-medium transition-all duration-200 ${
                      formData.gender === gender
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-gray-50/50 text-gray-600 hover:border-gray-300'
                    }`}>
                      {gender}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button - Updated to match website colors */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={loading}
              className={`group relative px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl shadow-xl transition-all duration-300 ${
                loading 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:shadow-2xl hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
              }`}
            >
              <div className="flex items-center">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Analyzing Your Data...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-3 h-5 w-5" />
                    Get Burnout Prediction
                    <ArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </div>
            </button>
          </div>
        </form>

        {/* Error Display */}
        {error && (
          <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Prediction Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {predictionResult && (
          <div className="mt-12">
            <div className={`relative bg-gradient-to-r ${getRiskConfig(predictionResult.risk).bgColor} p-8 md:p-10 rounded-3xl border-2 ${getRiskConfig(predictionResult.risk).borderColor} shadow-lg`}>
              <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
              <div className="absolute top-6 right-6 w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Risk Icon and Score */}
                <div className="flex-shrink-0 text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${getRiskConfig(predictionResult.risk).color} rounded-3xl shadow-lg mb-4`}>
                    {React.createElement(getRiskConfig(predictionResult.risk).icon, {
                      className: "h-10 w-10 text-white"
                    })}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {predictionResult.score}%
                  </div>
                  <div className={`text-lg font-semibold ${getRiskConfig(predictionResult.risk).textColor}`}>
                    {predictionResult.risk.charAt(0).toUpperCase() + predictionResult.risk.slice(1)} Risk
                  </div>
                </div>

                {/* Recommendations */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Personalized Recommendations</h3>
                  <div className="grid gap-4">
                    {predictionResult.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BurnoutPredictionForm;
