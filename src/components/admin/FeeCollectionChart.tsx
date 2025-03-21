
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for fee collection
const feeCollection = [
  { month: 'Jan', amount: 112500 },
  { month: 'Feb', amount: 125000 },
  { month: 'Mar', amount: 118750 },
  { month: 'Apr', amount: 131250 },
  { month: 'May', amount: 137500 },
];

const FeeCollectionChart = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Fee Collection</CardTitle>
        <CardDescription>Last 5 months (in ₹)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={feeCollection} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
              />
              <Bar dataKey="amount" fill="#FF7217" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeeCollectionChart;
