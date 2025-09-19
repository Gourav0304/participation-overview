'use client';

import React from 'react';
import { User } from '@/services/userApi';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type DoughnutChartProps = {
  data: User[];
};

const COLORS = [
  '#3182CE',
  '#059669',
  '#7C3AED',
  '#94A3B8',
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#8B5CF6',
  '#E11D48',
  '#3B82F6',
];

export const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  const chartData = data.map((user, i) => ({
    name: `${user.firstName} ${user.lastName}`,
    value: user.participationPercentage,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="w-full h-80 sm:max-w-lg mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={100}
            paddingAngle={4}
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
