import React, { useRef, useEffect } from 'react';

interface GaugeChartProps {
  percentage: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ percentage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const angle = Math.PI * (percentage / 100);
    const startAngle = Math.PI;
    const endAngle = 2 * Math.PI;

    // Background arc
    ctx.beginPath();
    ctx.arc(100, 100, 80, startAngle, endAngle);
    ctx.strokeStyle = '#ecf0f1';
    ctx.lineWidth = 20;
    ctx.stroke();

    // Gradient color (green to yellow to red)
    const gradient = ctx.createLinearGradient(20, 0, 180, 0);
    gradient.addColorStop(0, '#2ecc71');
    gradient.addColorStop(0.5, '#f1c40f');
    gradient.addColorStop(1, '#e74c3c');

    // Value arc
    ctx.beginPath();
    ctx.arc(100, 100, 80, startAngle, startAngle + angle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.stroke();
  }, [percentage]);

  return (
    <div className="relative w-50 h-30 mx-auto">
      <canvas
        ref={canvasRef}
        width="200"
        height="120"
        className="w-full h-full"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-5 text-2xl font-bold text-gray-800">
        {percentage}%
      </div>
    </div>
  );
};

export default GaugeChart;