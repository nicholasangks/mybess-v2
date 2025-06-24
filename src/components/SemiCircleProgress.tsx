'use client';

import React from 'react';
import { useTheme } from 'next-themes';

interface SemiCircleProgressProps {
  percentage: number;
  stroke?: number;
  trackColor?: string;
}

const SemiCircleProgress: React.FC<SemiCircleProgressProps> = ({
  percentage,
  stroke = 4,
  trackColor = '#e5e7eb',
}) => {
  const { theme } = useTheme();
  const progressColor = theme === 'dark' ? '#009439' : '#009439';

  const radius = 100;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full aspect-[2/1]">
      <svg
        viewBox="0 0 200 100"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Track */}
        <circle
          cx="100"
          cy="100"
          r={normalizedRadius}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform="rotate(-180 100 100)"
        />
        {/* Progress */}
        <circle
          cx="100"
          cy="100"
          r={normalizedRadius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-180 100 100)"
        />
        {/* Label */}
        <text
          x="100"
          y="90"
          textAnchor="middle"
          className="fill-current text-gray-800 dark:text-gray-100 text-[10px] sm:text-[12px] md:text-[16px] font-semibold"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default SemiCircleProgress;
