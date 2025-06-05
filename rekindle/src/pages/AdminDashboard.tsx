import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  burnoutPredictions: Array<{
    prediction: number;
    date: string;
    designation: number;
    resourceAllocation: number;
    mentalFatigueScore: number;
    companyType: string;
    wfhSetupAvailable: string;
    gender: string;
  }>;
}

interface Statistics {
  totalUsers: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  averageBurnoutScore: number;
  recentPredictions: Array<{
    userId: string;
    userName: string;
    prediction: number;
    date: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [usersResponse, statsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:8000/api/admin/statistics', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setUsers(usersResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const getRiskLevel = (prediction: number) => {
    if (prediction >= 70) return ['High Risk', 'text-red-600'];
    if (prediction >= 40) return ['Medium Risk', 'text-yellow-600'];
    return ['Low Risk', 'text-green-600'];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-600">Total Users</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-600">High Risk Employees</h3>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.highRiskCount}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-600">Average Burnout Score</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.averageBurnoutScore}%</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-600">Recent Assessments</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.recentPredictions.length}
              </p>
            </div>
          </div>
        )}

        {/* Recent Predictions */}
        {stats && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Predictions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Employee</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Risk Level</th>
                    <th className="text-left py-3 px-4">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentPredictions.map((prediction) => {
                    const [riskLabel, riskColor] = getRiskLevel(prediction.prediction);
                    return (
                      <tr key={`${prediction.userId}-${prediction.date}`} className="border-b">
                        <td className="py-3 px-4">{prediction.userName}</td>
                        <td className="py-3 px-4">
                          {new Date(prediction.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${riskColor}`}>{riskLabel}</span>
                        </td>
                        <td className="py-3 px-4">{prediction.prediction.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Employee List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">All Employees</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="py-3 px-4 font-medium">Name</th>
                  <th className="py-3 px-4 font-medium">Email</th>
                  <th className="py-3 px-4 font-medium">Latest Risk Level</th>
                  <th className="py-3 px-4 font-medium">Burnout Score</th>
                  <th className="py-3 px-4 font-medium">Mental Fatigue</th>
                  <th className="py-3 px-4 font-medium">Resource Allocation</th>
                  <th className="py-3 px-4 font-medium">Last Assessment</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => {
                  const latestPrediction = user.burnoutPredictions[user.burnoutPredictions.length - 1];
                  const [riskLabel, riskColor] = latestPrediction
                    ? getRiskLevel(latestPrediction.prediction)
                    : ['No Data', 'text-gray-500'];

                  return (
                    <tr key={user._id} className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedUser(user)}>
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${riskColor}`}>{riskLabel}</span>
                      </td>
                      <td className="py-3 px-4">
                        {latestPrediction ? `${latestPrediction.prediction.toFixed(1)}%` : 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        {latestPrediction ? latestPrediction.mentalFatigueScore : 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        {latestPrediction ? `${latestPrediction.resourceAllocation}%` : 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        {latestPrediction 
                          ? new Date(latestPrediction.date).toLocaleDateString()
                          : 'Never'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Employee Information</h4>
                  <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                  <p>
                    <span className="font-medium">Total Assessments:</span>
                    {' '}{selectedUser.burnoutPredictions.length}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Burnout History</h4>
                  <div className="space-y-4">
                    {selectedUser.burnoutPredictions.map((prediction, index) => {
                      const [riskLabel, riskColor] = getRiskLevel(prediction.prediction);
                      return (
                        <div
                          key={index}
                          className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">
                              {new Date(prediction.date).toLocaleDateString()}
                            </span>
                            <span className={`font-medium ${riskColor}`}>
                              {prediction.prediction.toFixed(1)}% - {riskLabel}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <p><span className="font-medium">Designation:</span> {prediction.designation}</p>
                            <p><span className="font-medium">Resource Allocation:</span> {prediction.resourceAllocation}%</p>
                            <p><span className="font-medium">Mental Fatigue:</span> {prediction.mentalFatigueScore}</p>
                            <p><span className="font-medium">Company Type:</span> {prediction.companyType}</p>
                            <p><span className="font-medium">WFH Setup:</span> {prediction.wfhSetupAvailable}</p>
                            <p><span className="font-medium">Gender:</span> {prediction.gender}</p>
                          </div>
                        </div>
                      );
                    })}
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

export default AdminDashboard;
