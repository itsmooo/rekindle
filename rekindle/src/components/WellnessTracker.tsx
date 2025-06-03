import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Battery, Smile, Brain, Heart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WellnessTracker: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('energy');
  
  const metrics = [
    { id: 'energy', name: 'Energy Level', icon: Battery, color: '#4F46E5' },
    { id: 'mood', name: 'Mood', icon: Smile, color: '#059669' },
    { id: 'focus', name: 'Focus', icon: Brain, color: '#D97706' },
    { id: 'stress', name: 'Stress Level', icon: Heart, color: '#DC2626' },
  ];

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: metrics.find(m => m.id === selectedMetric)?.name,
        data: [65, 59, 80, 81, 56, 75, 85],
        fill: false,
        borderColor: metrics.find(m => m.id === selectedMetric)?.color,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-2xl font-bold font-serif mb-6 text-gray-800">
        Wellness Tracker
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-4 rounded-xl flex flex-col items-center transition-all ${
                selectedMetric === metric.id
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
              } border`}
            >
              <Icon 
                className={`h-6 w-6 mb-2 ${
                  selectedMetric === metric.id ? 'text-blue-600' : 'text-gray-600'
                }`} 
              />
              <span className={`text-sm font-medium ${
                selectedMetric === metric.id ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {metric.name}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-green-600 font-semibold mb-1">Weekly Average</div>
          <div className="text-2xl font-bold text-green-700">72%</div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-blue-600 font-semibold mb-1">Highest Day</div>
          <div className="text-2xl font-bold text-blue-700">85% (Sun)</div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-yellow-600 font-semibold mb-1">Trend</div>
          <div className="text-2xl font-bold text-yellow-700">↗ Improving</div>
        </div>
      </div>
    </div>
  );
};

export default WellnessTracker;