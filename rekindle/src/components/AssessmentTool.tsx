import React, { useState } from 'react';
import { CheckCircle, ArrowRight, AlertTriangle, RefreshCw } from 'lucide-react';

type Question = {
  id: number;
  text: string;
};

const questions: Question[] = [
  { id: 1, text: "I feel emotionally drained from my work." },
  { id: 2, text: "I feel used up at the end of the workday." },
  { id: 3, text: "I feel fatigued when I get up in the morning and have to face another day on the job." },
  { id: 4, text: "Working with people all day is really a strain for me." },
  { id: 5, text: "I feel burned out from my work." },
  { id: 6, text: "I feel frustrated by my job." },
  { id: 7, text: "I feel I'm working too hard on my job." },
  { id: 8, text: "I feel like I'm at the end of my rope." },
  { id: 9, text: "I've become less interested in my work since I started this job." },
  { id: 10, text: "I have become less enthusiastic about my work." },
];

type ResultLevel = {
  level: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  advice: string[];
};

const resultLevels: Record<string, ResultLevel> = {
  low: {
    level: "Low Risk",
    description: "You're showing few signs of burnout. Keep up the good work!",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    advice: [
      "Continue your current self-care practices",
      "Maintain healthy work-life boundaries",
      "Regularly check in with yourself about stress levels"
    ]
  },
  moderate: {
    level: "Moderate Risk",
    description: "You're showing some signs of burnout. It's time to address these concerns.",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: <AlertTriangle className="h-8 w-8 text-yellow-500" />,
    advice: [
      "Speak with your manager about workload concerns",
      "Prioritize self-care activities outside of work",
      "Consider setting firmer boundaries around work hours",
      "Take regular breaks during the workday"
    ]
  },
  high: {
    level: "High Risk",
    description: "You're showing significant signs of burnout. It's important to take action now.",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
    advice: [
      "Consider speaking with a mental health professional",
      "Discuss options for reduced hours or time off with your employer",
      "Implement strict boundaries between work and personal life",
      "Prioritize sleep, nutrition, and physical activity",
      "Reconnect with activities and people that bring you joy"
    ]
  }
};

const AssessmentTool: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [resultLevel, setResultLevel] = useState<keyof typeof resultLevels | null>(null);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(answers).length;
    
    if (answeredQuestions < totalQuestions) return;
    
    const sum = Object.values(answers).reduce((acc, val) => acc + val, 0);
    const average = sum / totalQuestions;
    
    let level: keyof typeof resultLevels;
    if (average <= 2) {
      level = 'low';
    } else if (average <= 3.5) {
      level = 'moderate';
    } else {
      level = 'high';
    }
    
    setResultLevel(level);
    setIsComplete(true);
  };

  const resetAssessment = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsComplete(false);
    setResultLevel(null);
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      {!isComplete ? (
        <>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl md:text-2xl font-semibold font-serif text-gray-800">
                Burnout Assessment
              </h3>
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-lg md:text-xl text-gray-700 font-medium mb-6">
              {currentQuestion.text}
            </p>
            
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(currentQuestion.id, value)}
                  className={`py-3 rounded-lg border transition-all duration-200 ${
                    answers[currentQuestion.id] === value
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
              <span>Never</span>
              <span>Always</span>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg flex items-center ${
                currentQuestionIndex === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={() => {
                if (currentQuestionIndex < questions.length - 1) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else if (Object.keys(answers).length === questions.length) {
                  calculateResult();
                }
              }}
              className="px-4 py-2 text-blue-600 rounded-lg flex items-center hover:bg-blue-50"
              disabled={!answers[currentQuestion.id]}
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  <span>Next</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </>
              ) : (
                'View Results'
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className={`inline-flex items-center justify-center p-4 rounded-full ${resultLevel ? resultLevels[resultLevel].color : ''} mb-4`}>
            {resultLevel && resultLevels[resultLevel].icon}
          </div>
          
          <h3 className="text-2xl font-bold mb-2 font-serif">
            {resultLevel && resultLevels[resultLevel].level}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {resultLevel && resultLevels[resultLevel].description}
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
            <h4 className="font-semibold text-gray-800 mb-3">Recommendations:</h4>
            <ul className="space-y-2">
              {resultLevel && resultLevels[resultLevel].advice.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={resetAssessment}
              className="flex items-center justify-center px-6 py-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake Assessment
            </button>
            
            <a
              href="/resources"
              className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
            >
              View Resources
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentTool;