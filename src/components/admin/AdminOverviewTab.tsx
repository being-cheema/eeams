
import React from 'react';
import DashboardStats from './DashboardStats';
import AttendanceTrendChart from './AttendanceTrendChart';
import FeeCollectionChart from './FeeCollectionChart';
import SubjectDistributionChart from './SubjectDistributionChart';
import KeyMetricsCard from './KeyMetricsCard';

const AdminOverviewTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceTrendChart />
        <FeeCollectionChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SubjectDistributionChart />
        <KeyMetricsCard />
      </div>
    </div>
  );
};

export default AdminOverviewTab;
