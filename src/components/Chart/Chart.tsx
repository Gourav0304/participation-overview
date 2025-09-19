'use client';

import React from 'react';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS } from '@/constants/color';
import type { DoughnutChartProps } from '@/constants';

export const DoughnutChart = ({ data }: DoughnutChartProps) => {
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
            innerRadius={65}
            outerRadius={120}
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
