
import React from 'react';
import StudentStats from './StudentStats';
import AttendanceHistory from './AttendanceHistory';
import AttendanceTrendChart from './AttendanceTrendChart';

const StudentOverviewTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <StudentStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceHistory />
        <AttendanceTrendChart />
      </div>
    </div>
  );
};

export default StudentOverviewTab;
