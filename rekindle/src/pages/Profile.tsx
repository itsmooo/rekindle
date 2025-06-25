import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { 
  User, 
  Mail, 
  MapPin, 
  Building, 
  Briefcase, 
  Camera, 
  Edit3, 
  Save, 
  X, 
  Activity,
  TrendingUp,
  Calendar,
  BarChart3,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  company: string;
  position: string;
  avatar: string;
  createdAt: string;
}

interface UserStats {
  totalAssessments: number;
  latestScore: number | null;
  averageScore: number | null;
  assessmentHistory: Array<{
    prediction: number;
    date: string;
    designation: number;
    resourceAllocation: number;
    mentalFatigueScore: number;
  }>;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    company: '',
    position: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token ? 'Present' : 'Missing');
      
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/login');
        return;
      }

      // Try to fetch from API first
      try {
        console.log('Attempting to fetch profile data...');
        const [profileResponse, statsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:8000/api/profile/statistics', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setProfile(profileResponse.data);
        setStats(statsResponse.data);
        setEditForm({
          name: profileResponse.data.name || '',
          email: profileResponse.data.email || '',
          bio: profileResponse.data.bio || '',
          location: profileResponse.data.location || '',
          company: profileResponse.data.company || '',
          position: profileResponse.data.position || ''
        });
      } catch (apiError) {
        console.log('API not available, using mock data');
        // Use mock data when API is not available
        const mockProfile: UserProfile = {
          _id: '1',
          name: user?.name || 'John Doe',
          email: user?.email || 'john.doe@example.com',
          bio: 'Passionate software developer focused on creating meaningful solutions that improve workplace wellness and mental health.',
          location: 'San Francisco, CA',
          company: 'Tech Solutions Inc.',
          position: 'Senior Software Engineer',
          avatar: '',
          createdAt: new Date().toISOString()
        };

        const mockStats: UserStats = {
          totalAssessments: 5,
          latestScore: 35,
          averageScore: 42,
          assessmentHistory: [
            {
              prediction: 35,
              date: new Date(Date.now() - 86400000).toISOString(),
              designation: 3,
              resourceAllocation: 7.5,
              mentalFatigueScore: 4
            },
            {
              prediction: 48,
              date: new Date(Date.now() - 7 * 86400000).toISOString(),
              designation: 3,
              resourceAllocation: 6.0,
              mentalFatigueScore: 5
            },
            {
              prediction: 52,
              date: new Date(Date.now() - 14 * 86400000).toISOString(),
              designation: 3,
              resourceAllocation: 5.5,
              mentalFatigueScore: 6
            }
          ]
        };

        setProfile(mockProfile);
        setStats(mockStats);
        setEditForm({
          name: mockProfile.name,
          email: mockProfile.email,
          bio: mockProfile.bio,
          location: mockProfile.location,
          company: mockProfile.company,
          position: mockProfile.position
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, JPEG, etc.)');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const token = localStorage.getItem('token');
      
      // Check if server is running first
      try {
        await axios.get('http://localhost:8000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (serverError) {
        throw new Error('Server not available. Please make sure the backend server is running on port 8000.');
      }

      const response = await axios.post(
        'http://localhost:8000/api/profile/upload-avatar',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (profile) {
        setProfile({ ...profile, avatar: `http://localhost:8000${response.data.avatar}` });
      }
      
      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert('Upload endpoint not found. Please check if the server is running and the upload route is properly configured.');
        } else if (error.response?.status === 401) {
          alert('Authentication failed. Please log in again.');
          navigate('/login');
        } else if (error.response?.status === 400) {
          alert('Invalid file or request. Please try with a different image.');
        } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
          alert('Cannot connect to server. Please make sure the backend server is running on port 8000.');
        } else {
          alert(`Upload failed: ${error.response?.data?.error || error.message}`);
        }
      } else {
        alert(`Upload failed: ${error.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.put(
          'http://localhost:8000/api/profile',
          editForm,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setProfile(response.data);
      } catch (apiError) {
        // Update local state for demo
        if (profile) {
          setProfile({ ...profile, ...editForm });
        }
        console.log('Profile updated locally (API not available)');
      }
      
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return ['High Risk', 'text-red-600', 'bg-red-100', 'border-red-200'];
    if (score >= 40) return ['Medium Risk', 'text-yellow-600', 'bg-yellow-100', 'border-yellow-200'];
    return ['Low Risk', 'text-green-600', 'bg-green-100', 'border-green-200'];
  };

  const getRiskIcon = (score: number) => {
    if (score >= 70) return <AlertTriangle className="w-5 h-5" />;
    if (score >= 40) return <Activity className="w-5 h-5" />;
    return <Shield className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-violet-400/8 to-blue-500/8 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-600 font-medium">Loading your profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Profile not found</h1>
            <p className="text-gray-600 mt-2">Please try logging in again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-violet-400/8 to-blue-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-cyan-300/8 to-blue-400/8 rounded-full blur-2xl"></div>
      </div>

      <div className="relative pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your <span className="text-blue-600">Profile</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your account settings and track your wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                <div className="text-center">
                  {/* Avatar */}
                  <div className="relative inline-block mb-6">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        profile.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {uploading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <Camera className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Profile Info */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h2>
                  <p className="text-gray-600 mb-4">{profile.email}</p>
                  
                  {/* Edit Button */}
                  <button
                    onClick={() => setEditing(!editing)}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>

                {/* Profile Details */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span>{profile.location || 'Location not set'}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Building className="w-5 h-5 text-indigo-500" />
                    <span>{profile.company || 'Company not set'}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <span>{profile.position || 'Position not set'}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {profile.bio || 'No bio added yet. Click edit to add your bio.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats and History */}
            <div className="lg:col-span-2 space-y-8">
              {/* Wellness Overview */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-blue-500" />
                  Wellness Overview
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-blue-600">{stats?.totalAssessments || 0}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Total Assessments</h4>
                    <p className="text-sm text-gray-600">Completed evaluations</p>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-indigo-600">
                        {stats?.averageScore?.toFixed(0) || 'N/A'}%
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Average Score</h4>
                    <p className="text-sm text-gray-600">Overall wellness trend</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                        {stats?.latestScore ? getRiskIcon(stats.latestScore) : <Shield className="w-6 h-6" />}
                      </div>
                      <span className="text-2xl font-bold text-green-600">
                        {stats?.latestScore || 'N/A'}%
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Latest Score</h4>
                    <p className="text-sm text-gray-600">Most recent assessment</p>
                  </div>
                </div>

                {/* Latest Assessment Details */}
                {stats?.latestScore && (
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Latest Assessment Status</h4>
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${getRiskLevel(stats.latestScore)[2]} ${getRiskLevel(stats.latestScore)[3]} border`}>
                        {getRiskIcon(stats.latestScore)}
                        <span className={`font-semibold ${getRiskLevel(stats.latestScore)[1]}`}>
                          {getRiskLevel(stats.latestScore)[0]}
                        </span>
                      </div>
                      <span className="text-gray-600">
                        Score: <span className="font-semibold">{stats.latestScore}%</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Assessment History */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-indigo-500" />
                  Assessment History
                </h3>

                {stats?.assessmentHistory && stats.assessmentHistory.length > 0 ? (
                  <div className="space-y-4">
                    {stats.assessmentHistory.map((assessment, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getRiskIcon(assessment.prediction)}
                            <div>
                              <span className="font-semibold text-gray-900">
                                Burnout Risk: {assessment.prediction}%
                              </span>
                              <p className="text-sm text-gray-600">
                                {new Date(assessment.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-lg ${getRiskLevel(assessment.prediction)[2]} ${getRiskLevel(assessment.prediction)[3]} border`}>
                            <span className={`text-sm font-medium ${getRiskLevel(assessment.prediction)[1]}`}>
                              {getRiskLevel(assessment.prediction)[0]}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">Level: {assessment.designation}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-indigo-500" />
                            <span className="text-gray-600">Resources: {assessment.resourceAllocation}/10</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-purple-500" />
                            <span className="text-gray-600">Fatigue: {assessment.mentalFatigueScore}/10</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">No assessments yet</h4>
                    <p className="text-gray-500">Take your first assessment to start tracking your wellness journey.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
                <button
                  onClick={() => setEditing(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="City, State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={editForm.company}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    value={editForm.position}
                    onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Job title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 