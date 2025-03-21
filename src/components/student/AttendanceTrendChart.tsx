
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for chart
const chartData = [
  { month: 'Jan', attendance: 85 },
  { month: 'Feb', attendance: 90 },
  { month: 'Mar', attendance: 78 },
  { month: 'Apr', attendance: 92 },
  { month: 'May', attendance: 88 },
];

const AttendanceTrendChart = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Attendance Trend</CardTitle>
        <CardDescription>Monthly attendance percentage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, 'Attendance']}
              />
              <Bar dataKey="attendance" fill="#FF7217" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceTrendChart;
