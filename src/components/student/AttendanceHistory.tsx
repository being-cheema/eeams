
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for attendance
const attendanceData = [
  { date: 'Mon, 15 May', status: 'Present', duration: '2 hours' },
  { date: 'Wed, 17 May', status: 'Present', duration: '1.5 hours' },
  { date: 'Fri, 19 May', status: 'Absent', duration: '0 hours' },
  { date: 'Mon, 22 May', status: 'Present', duration: '2 hours' },
  { date: 'Wed, 24 May', status: 'Present', duration: '2 hours' },
];

const AttendanceHistory = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Attendance History</CardTitle>
        <CardDescription>Last 5 classes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-muted-foreground text-sm border-b">
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Duration</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index} className="border-b border-border/50 last:border-0">
                  <td className="py-3">{record.date}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.status === 'Present' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-3">{record.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceHistory;
