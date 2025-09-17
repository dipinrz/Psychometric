import React from 'react';

interface HealthCardProps {
  title: string;
  score: number;
  suggestion: string;
  fullWidth?: boolean;
}

const HealthCard: React.FC<HealthCardProps> = ({ title, score, suggestion, fullWidth = false }) => {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-xl p-4 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <h4 className="text-base font-medium text-gray-800 mb-2">
        {title} {score}/100
      </h4>
      <div className="bg-gray-300 h-2 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-teal-500 transition-all duration-300 ease-out"
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="text-sm text-gray-600">
        {suggestion}
      </div>
    </div>
  );
};

export default HealthCard;