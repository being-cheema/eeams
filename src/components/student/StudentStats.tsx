
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const StudentStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Attendance Rate</CardTitle>
          <CardDescription>Current month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-kollektif text-brand-orange mb-2">86%</div>
          <p className="text-sm text-muted-foreground">4 out of 5 classes attended</p>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Next Class</CardTitle>
          <CardDescription>Upcoming schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={16} />
            <span>Friday, 26 May 2023</span>
          </div>
          <div className="text-lg font-medium">Mathematics - Advanced</div>
          <div className="text-sm text-muted-foreground">4:00 PM - 6:00 PM</div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Payment Status</CardTitle>
          <CardDescription>May 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-medium text-green-600 mb-2">Paid</div>
          <p className="text-sm text-muted-foreground">Last payment: May 3, 2023</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentStats;
