import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAttendanceReport } from '@/services/api';
import { toast } from 'sonner';

interface AttendanceRecord {
  id: number;
  date: string;
  status: 'P' | 'A' | 'L';
}

interface MonthlyAttendance {
  month: string;
  total: number;
  present: number;
  attendance: number;
}

const AttendanceTrendChart = () => {
  const [chartData, setChartData] = useState<MonthlyAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        // Get last 6 months of attendance
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
        
        const data = await getAttendanceReport(
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
          'json'
        ) as AttendanceRecord[];
        
        // Process data to get monthly attendance
        const monthlyData = data.reduce((acc: { [key: string]: MonthlyAttendance }, record) => {
          const date = new Date(record.date);
          const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
          
          if (!acc[monthKey]) {
            acc[monthKey] = {
              month: date.toLocaleString('default', { month: 'short' }),
              total: 0,
              present: 0,
              attendance: 0
            };
          }
          
          acc[monthKey].total++;
          if (record.status === 'P') {
            acc[monthKey].present++;
          }
          
          acc[monthKey].attendance = Math.round((acc[monthKey].present / acc[monthKey].total) * 100);
          
          return acc;
        }, {});
        
        // Convert to array and sort by date
        const sortedData = Object.values(monthlyData).sort((a, b) => {
          const monthA = new Date(a.month + ' 1, 2023').getMonth();
          const monthB = new Date(b.month + ' 1, 2023').getMonth();
          return monthA - monthB;
        });
        
        setChartData(sortedData);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        toast.error('Failed to load attendance trend');
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Attendance Trend</CardTitle>
        <CardDescription>Monthly attendance percentage</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-orange"></div>
          </div>
        ) : chartData.length > 0 ? (
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
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
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No attendance data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceTrendChart;
