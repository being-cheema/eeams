
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Mock data for subject distribution
const subjectDistribution = [
  { name: 'Physics', value: 35 },
  { name: 'Chemistry', value: 25 },
  { name: 'Mathematics', value: 30 },
  { name: 'Biology', value: 10 },
];

const COLORS = ['#FF7217', '#FFB77D', '#FFC7A1', '#FFD7C5'];

const SubjectDistributionChart = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Subject Distribution</CardTitle>
        <CardDescription>Students per subject</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={subjectDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {subjectDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {subjectDistribution.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-sm">{entry.name}: {entry.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectDistributionChart;
