import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAttendanceReport } from '@/services/api';
import { toast } from 'sonner';

interface AttendanceRecord {
  id: number;
  date: string;
  student: number;
  student_name: string;
  batch: number;
  batch_name: string;
  status: 'P' | 'A' | 'L';
  status_display: string;
  remarks: string;
  marked_by: number;
  marked_by_name: string;
  created_at: string;
}

const AttendanceHistory = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        
        console.log('Fetching attendance data for period:', {
          start: startDate.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0]
        });
        
        const data = await getAttendanceReport(
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
          'json'
        ) as AttendanceRecord[];
        
        console.log('Raw attendance data:', data);
        
        if (Array.isArray(data)) {
          // Sort records by date in descending order
          const sortedRecords = data.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          console.log('Sorted attendance records:', sortedRecords);
          setAttendanceData(sortedRecords);
        } else {
          console.log('No valid attendance records found in response');
          setAttendanceData([]);
          toast.error('No attendance records found');
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        toast.error('Failed to load attendance history');
        setAttendanceData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'P':
        return 'bg-green-100 text-green-800';
      case 'A':
        return 'bg-red-100 text-red-800';
      case 'L':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Attendance History</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-orange"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-muted-foreground text-sm border-b">
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Batch</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Marked By</th>
                  <th className="pb-2 font-medium">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record) => (
                  <tr key={record.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3">{formatDate(record.date)}</td>
                    <td className="py-3">{record.batch_name}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(record.status)}`}>
                        {record.status_display}
                      </span>
                    </td>
                    <td className="py-3">{record.marked_by_name}</td>
                    <td className="py-3 text-sm text-muted-foreground">{record.remarks}</td>
                  </tr>
                ))}
                {attendanceData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-muted-foreground">
                      No attendance records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceHistory;
