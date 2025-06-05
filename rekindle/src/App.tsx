import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Resources from './pages/Resources';
import ForEmployers from './pages/ForEmployers';
import Stories from './pages/Stories';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/assessment" 
              element={
                <ProtectedRoute>
                  <Assessment />
                </ProtectedRoute>
              } 
            />
            <Route path="/resources" element={<Resources />} />
            <Route path="/for-employers" element={<ForEmployers />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;