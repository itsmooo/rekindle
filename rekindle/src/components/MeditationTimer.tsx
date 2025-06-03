import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

const MeditationTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTime, setSelectedTime] = useState(300);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedTime);
  };

  const times = [
    { value: 300, label: '5 min' },
    { value: 600, label: '10 min' },
    { value: 900, label: '15 min' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-2xl font-bold font-serif mb-6 text-gray-800">
        Mindful Break Timer
      </h3>
      
      <div className="flex justify-center mb-8">
        <div className="text-6xl font-bold text-blue-600">
          {formatTime(timeLeft)}
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mb-8">
        {times.map((time) => (
          <button
            key={time.value}
            onClick={() => {
              setSelectedTime(time.value);
              setTimeLeft(time.value);
              setIsRunning(false);
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedTime === time.value
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {time.label}
          </button>
        ))}
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`p-4 rounded-full ${
            isRunning
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>
        
        <button
          onClick={handleReset}
          className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <RefreshCw className="h-6 w-6" />
        </button>
      </div>
      
      <div className="mt-8 text-center text-gray-600">
        <p className="mb-2">Take a moment to breathe and reset.</p>
        <p className="text-sm">Find a quiet space and focus on your breath.</p>
      </div>
    </div>
  );
};

export default MeditationTimer;