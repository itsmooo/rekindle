import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Eye,
  Download,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  Clock,
  ChevronRight
} from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
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
    if (prediction >= 70) return ['High Risk', 'text-red-600', 'bg-red-100', 'border-red-200'];
    if (prediction >= 40) return ['Medium Risk', 'text-yellow-600', 'bg-yellow-100', 'border-yellow-200'];
    return ['Low Risk', 'text-green-600', 'bg-green-100', 'border-green-200'];
  };

  const getRiskIcon = (prediction: number) => {
    if (prediction >= 70) return <AlertTriangle className="w-4 h-4" />;
    if (prediction >= 40) return <Activity className="w-4 h-4" />;
    return <Shield className="w-4 h-4" />;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterRisk === 'all') return matchesSearch;
    
    const latestPrediction = user.burnoutPredictions[user.burnoutPredictions.length - 1];
    if (!latestPrediction) return false;
    
    const [riskLabel] = getRiskLevel(latestPrediction.prediction);
    return matchesSearch && riskLabel.toLowerCase().includes(filterRisk);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-600 font-medium">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Monitor employee wellbeing and burnout risks</p>
            </div>
            <div className="flex items-center space-x-4 mt-6 lg:mt-0">
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
              <button className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-blue-100 mb-1">Total Users</h3>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  <div className="flex items-center mt-2 text-blue-100 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>Active employees</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Users className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-red-100 mb-1">High Risk</h3>
                  <p className="text-3xl font-bold">{stats.highRiskCount}</p>
                  <div className="flex items-center mt-2 text-red-100 text-sm">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    <span>Needs attention</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-indigo-100 mb-1">Avg Burnout Score</h3>
                  <p className="text-3xl font-bold">{stats.averageBurnoutScore}%</p>
                  <div className="flex items-center mt-2 text-indigo-100 text-sm">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    <span>Organization health</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <PieChart className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-green-100 mb-1">Recent Assessments</h3>
                  <p className="text-3xl font-bold">{stats.recentPredictions.length}</p>
                  <div className="flex items-center mt-2 text-green-100 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>This week</span>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Activity className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Predictions */}
        {stats && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-blue-600" />
                Recent Predictions
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Last 7 days
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Employee</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Risk Level</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentPredictions.map((prediction) => {
                    const [riskLabel, riskColor, riskBg, riskBorder] = getRiskLevel(prediction.prediction);
                    return (
                      <tr key={`${prediction.userId}-${prediction.date}`} className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors duration-200">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{prediction.userName}</div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {new Date(prediction.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${riskColor} ${riskBg} border ${riskBorder}`}>
                            {getRiskIcon(prediction.prediction)}
                            <span className="ml-1">{riskLabel}</span>
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <span className="font-semibold text-gray-900">{prediction.prediction.toFixed(1)}%</span>
                            <div className="ml-3 w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  prediction.prediction >= 70 ? 'bg-red-500' :
                                  prediction.prediction >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(prediction.prediction, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Employee List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4 lg:mb-0">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              All Employees
            </h2>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 appearance-none"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="high">High Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="low">Low Risk</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="py-4 px-4 font-semibold text-gray-700">Employee</th>
                  <th className="py-4 px-4 font-semibold text-gray-700">Risk Status</th>
                  <th className="py-4 px-4 font-semibold text-gray-700">Burnout Score</th>
                  <th className="py-4 px-4 font-semibold text-gray-700">Mental Fatigue</th>
                  <th className="py-4 px-4 font-semibold text-gray-700">Resource Allocation</th>
                  <th className="py-4 px-4 font-semibold text-gray-700">Last Assessment</th>
                  <th className="py-4 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => {
                  const latestPrediction = user.burnoutPredictions[user.burnoutPredictions.length - 1];
                  const [riskLabel, riskColor, riskBg, riskBorder] = latestPrediction
                    ? getRiskLevel(latestPrediction.prediction)
                    : ['No Data', 'text-gray-500', 'bg-gray-100', 'border-gray-200'];

                  return (
                    <tr key={user._id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-all duration-200 group">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${riskColor} ${riskBg} border ${riskBorder}`}>
                          {latestPrediction && getRiskIcon(latestPrediction.prediction)}
                          <span className="ml-1">{riskLabel}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {latestPrediction ? (
                          <div className="flex items-center">
                            <span className="font-semibold text-gray-900">{latestPrediction.prediction.toFixed(1)}%</span>
                            <div className="ml-3 w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  latestPrediction.prediction >= 70 ? 'bg-red-500' :
                                  latestPrediction.prediction >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(latestPrediction.prediction, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-medium ${latestPrediction ? 'text-gray-900' : 'text-gray-400'}`}>
                          {latestPrediction ? `${latestPrediction.mentalFatigueScore}/10` : 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-medium ${latestPrediction ? 'text-gray-900' : 'text-gray-400'}`}>
                          {latestPrediction ? `${latestPrediction.resourceAllocation}/10` : 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {latestPrediction 
                          ? new Date(latestPrediction.date).toLocaleDateString()
                          : 'Never'}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="flex items-center px-3 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 group-hover:bg-blue-100"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No employees found matching your criteria</p>
            </div>
          )}
        </div>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h3>
                      <p className="text-gray-600">{selectedUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Total Assessments
                    </h4>
                    <p className="text-3xl font-bold text-blue-900">{selectedUser.burnoutPredictions.length}</p>
                  </div>
                  
                  {selectedUser.burnoutPredictions.length > 0 && (
                    <>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                        <h4 className="text-lg font-semibold text-purple-800 mb-2 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Latest Score
                        </h4>
                        <p className="text-3xl font-bold text-purple-900">
                          {selectedUser.burnoutPredictions[selectedUser.burnoutPredictions.length - 1].prediction.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <h4 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          Last Assessment
                        </h4>
                        <p className="text-lg font-semibold text-green-900">
                          {new Date(selectedUser.burnoutPredictions[selectedUser.burnoutPredictions.length - 1].date).toLocaleDateString()}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                    Assessment History
                  </h4>
                  <div className="space-y-4">
                    {selectedUser.burnoutPredictions.map((prediction, index) => {
                      const [riskLabel, riskColor, riskBg, riskBorder] = getRiskLevel(prediction.prediction);
                      return (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                            <div className="flex items-center mb-4 lg:mb-0">
                              <span className="text-gray-600 font-medium">
                                {new Date(prediction.date).toLocaleDateString()}
                              </span>
                              <span className={`ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${riskColor} ${riskBg} border ${riskBorder}`}>
                                {getRiskIcon(prediction.prediction)}
                                <span className="ml-1">{prediction.prediction.toFixed(1)}% - {riskLabel}</span>
                              </span>
                            </div>
                            <div className="w-32 bg-gray-200 rounded-full h-3">
                              <div 
                                className={`h-3 rounded-full ${
                                  prediction.prediction >= 70 ? 'bg-red-500' :
                                  prediction.prediction >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(prediction.prediction, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="bg-white/60 rounded-lg p-3">
                              <span className="font-medium text-gray-700">Designation:</span>
                              <span className="ml-2 text-gray-900">
                                {prediction.designation === 1 ? 'Entry Level' : 
                                 prediction.designation === 2 ? 'Mid Level' : 'Senior Level'}
                              </span>
                            </div>
                            <div className="bg-white/60 rounded-lg p-3">
                              <span className="font-medium text-gray-700">Resource Allocation:</span>
                              <span className="ml-2 text-gray-900">{prediction.resourceAllocation}/10</span>
                            </div>
                            <div className="bg-white/60 rounded-lg p-3">
                              <span className="font-medium text-gray-700">Mental Fatigue:</span>
                              <span className="ml-2 text-gray-900">{prediction.mentalFatigueScore}/10</span>
                            </div>
                            <div className="bg-white/60 rounded-lg p-3">
                              <span className="font-medium text-gray-700">Company Type:</span>
                              <span className="ml-2 text-gray-900">{prediction.companyType}</span>
                            </div>
                            <div className="bg-white/60 rounded-lg p-3">
                              <span className="font-medium text-gray-700">WFH Setup:</span>
                              <span className="ml-2 text-gray-900">{prediction.wfhSetupAvailable}</span>
                            </div>
                            <div className="bg-white/60 rounded-lg p-3">
                              <span className="font-medium text-gray-700">Gender:</span>
                              <span className="ml-2 text-gray-900">{prediction.gender}</span>
                            </div>
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
