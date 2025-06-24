'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';

interface GaugeProps {
  value: number;              // e.g., 70
  color?: string;            // e.g., '#3b82f6'
  backgroundColor?: string;  // e.g., '#e5e7eb'
  size?: number;             // chart height
}

export default function GenericGaugeChart({
  value,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  size = 250,
}: GaugeProps) {
  const data = [
    { name: 'filled', value },
    { name: 'rest',   value: 100 - value },
  ];

  return (
    <div style={{ height: size }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            innerRadius="98%"
            outerRadius="100%"
            cx="50%"
            cy="75%"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill={backgroundColor} />
            <Label
              value={`${value}%`}
              position="center"
              style={{ fill: color, fontSize: '1.3rem', fontWeight: 600 }}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
