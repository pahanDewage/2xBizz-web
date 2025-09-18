/* eslint-disable */
import React from "react";

// Simple Pie Chart Component (fallback)
export const SimplePieChart = ({ data, width = 300, height = 300 }) => {
  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];
  
  return (
    <div className="simple-chart-container">
      <svg width={width} height={height} className="mx-auto">
        <circle
          cx={width / 2}
          cy={height / 2}
          r={Math.min(width, height) / 3}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2"
        />
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (item.value / total) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          
          const x1 = width / 2 + (Math.min(width, height) / 3) * Math.cos((startAngle * Math.PI) / 180);
          const y1 = height / 2 + (Math.min(width, height) / 3) * Math.sin((startAngle * Math.PI) / 180);
          const x2 = width / 2 + (Math.min(width, height) / 3) * Math.cos((endAngle * Math.PI) / 180);
          const y2 = height / 2 + (Math.min(width, height) / 3) * Math.sin((endAngle * Math.PI) / 180);
          
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          const pathData = [
            `M ${width / 2} ${height / 2}`,
            `L ${x1} ${y1}`,
            `A ${Math.min(width, height) / 3} ${Math.min(width, height) / 3} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          currentAngle += angle;
          
          return (
            <path
              key={index}
              d={pathData}
              fill={colors[index % colors.length]}
              stroke="#fff"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      
      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-sm">
              {item.name}: {item.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple Bar Chart Component (fallback)
export const SimpleBarChart = ({ data, width = 400, height = 300 }) => {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(item => item.allocation));
  const barWidth = width / (data.length + 1);
  
  return (
    <div className="simple-bar-chart-container">
      <svg width={width} height={height} className="mx-auto">
        {data.map((item, index) => {
          const barHeight = (item.allocation / maxValue) * (height - 40);
          const x = index * barWidth + barWidth * 0.1;
          const y = height - barHeight - 20;
          
          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth * 0.8}
                height={barHeight}
                fill="#8884d8"
                rx="2"
              />
              <text
                x={x + barWidth * 0.4}
                y={height - 5}
                textAnchor="middle"
                className="text-xs fill-gray-600"
                transform={`rotate(-45, ${x + barWidth * 0.4}, ${height - 5})`}
              >
                {item.name.length > 10 ? item.name.substring(0, 10) + '...' : item.name}
              </text>
              <text
                x={x + barWidth * 0.4}
                y={y - 5}
                textAnchor="middle"
                className="text-xs fill-gray-800"
              >
                {item.allocation.toFixed(1)}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
