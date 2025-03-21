
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for attendance trend
const attendanceTrend = [
  { month: 'Jan', attendance: 88 },
  { month: 'Feb', attendance: 92 },
  { month: 'Mar', attendance: 86 },
  { month: 'Apr', attendance: 89 },
  { month: 'May', attendance: 86 },
];

const AttendanceTrendChart = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Attendance Trend</CardTitle>
        <CardDescription>Last 5 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis domain={[75, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, 'Attendance']}
              />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#FF7217" 
                strokeWidth={2} 
                dot={{ r: 4, fill: "#FF7217" }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceTrendChart;
