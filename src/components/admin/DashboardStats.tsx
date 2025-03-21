
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Teachers</CardTitle>
          <CardDescription>Active faculty</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-kollektif text-brand-orange">4</div>
          <p className="text-sm text-muted-foreground">Across 4 subjects</p>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Students</CardTitle>
          <CardDescription>Active enrollment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-kollektif text-brand-orange">94</div>
          <p className="text-sm text-muted-foreground">5% increase from last month</p>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Average Attendance</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-kollektif text-brand-orange">86%</div>
          <p className="text-sm text-muted-foreground">2% lower than April</p>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Fee Collection</CardTitle>
          <CardDescription>May 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-kollektif text-brand-orange">₹137.5K</div>
          <p className="text-sm text-muted-foreground">5% higher than April</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
