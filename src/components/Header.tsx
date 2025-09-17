import React from 'react';

interface HeaderProps {
  patientName: string;
  age: number;
  date: string;
}

const Header: React.FC<HeaderProps> = ({ patientName, age, date }) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Patient Report</h2>
        <div className="font-semibold text-gray-700">
          {patientName}, {age}
        </div>
      </div>
      <div>
        <small className="text-gray-500">{date}</small>
      </div>
    </div>
  );
};

export default Header;