import React from 'react';
import StudentStats from './StudentStats';
import AttendanceHistory from './AttendanceHistory';
import AttendanceTrendChart from './AttendanceTrendChart';

interface StudentOverviewTabProps {
  attendanceRate: number;
  totalClasses: number;
  presentClasses: number;
  batches: Array<{
    id: number;
    name: string;
  }>;
}

const StudentOverviewTab: React.FC<StudentOverviewTabProps> = ({
  attendanceRate,
  totalClasses,
  presentClasses,
  batches,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <StudentStats 
        attendanceRate={attendanceRate}
        totalClasses={totalClasses}
        presentClasses={presentClasses}
        batches={batches}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceHistory />
        <AttendanceTrendChart />
      </div>
    </div>
  );
};

export default StudentOverviewTab;
