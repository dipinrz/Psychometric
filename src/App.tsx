import React from 'react';
import Header from './components/Header';
import GaugeChart from './components/GaugeChart';
import HealthCard from './components/HealthCard';
import Recommendations from './components/Recommendations';
import Footer from './components/Footer';

const healthMetrics = [
  {
    title: '🥗 Dietary Practices',
    score: 78,
    suggestion: 'Increase leafy greens by 2 servings/day'
  },
  {
    title: '🏃 Exercise Regimen',
    score: 65,
    suggestion: 'Add 30 mins cardio 2× weekly'
  },
  {
    title: '🧘 Mental Health',
    score: 82,
    suggestion: 'Consider daily meditation practice'
  },
  {
    title: '😴 Sleep Cycle',
    score: 90,
    suggestion: 'Excellent sleep hygiene'
  },
  {
    title: '💼 Work Satisfaction',
    score: 70,
    suggestion: 'Consider stress management technique'
  },
  {
    title: '🤝 Social Connections',
    score: 60,
    suggestion: 'Prioritize social activities weekly'
  },
  {
    title: '🩺 Medical History',
    score: 85,
    suggestion: 'No major cardiovascular events. Regular check-ups recommended.',
    fullWidth: true
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
        <Header 
          patientName="Alex Morgan" 
          age={42} 
          date="May 07, 2025" 
        />
        
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            OVERALL CARDIOVASCULAR RISK
          </h3>
          <div className="relative inline-block">
            <GaugeChart percentage={42} />
          </div>
          <div className="mt-3 text-sm text-orange-600">
            Moderate risk: follow up in 3 months
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {healthMetrics.map((metric, index) => (
            <HealthCard
              key={index}
              title={metric.title}
              score={metric.score}
              suggestion={metric.suggestion}
              fullWidth={metric.fullWidth}
            />
          ))}
        </div>

        <Recommendations />
        <Footer />
      </div>
    </div>
  );
}

export default App;