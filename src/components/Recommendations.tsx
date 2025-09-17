import React from 'react';

const recommendations = [
  'Schedule follow-up appointment in 3 months',
  'Consider annual cardiovascular stress test',
  'Review dietary and exercise plan with healthcare provider'
];

const Recommendations: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <h4 className="text-base font-medium text-gray-800 mb-3">Recommendations</h4>
      <ul className="space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <span className="text-green-500 mr-2 font-medium">✓</span>
            {rec}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;