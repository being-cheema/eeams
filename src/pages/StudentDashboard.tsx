import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FileText, CreditCard, User, Home } from 'lucide-react';
import StudentOverviewTab from '@/components/student/StudentOverviewTab';
import StudentReportsTab from '@/components/student/StudentReportsTab';
import StudentPaymentsTab from '@/components/student/StudentPaymentsTab';
import { getStudentDashboard } from '@/services/api';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';

interface StudentDashboardData {
  student_name: string;
  attendance_rate: number;
  total_classes: number;
  present_classes: number;
  batches: Array<{
    id: number;
    name: string;
  }>;
  pending_payments_count: number;
  approved_payments_count: number;
  rejected_payments_count: number;
  total_paid: number;
  active_payment_windows: Array<{
    window_id: number;
    batch_name: string;
    start_date: string;
    end_date: string;
    amount: number;
  }>;
}

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get current tab from URL search params
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab') || 'overview';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getStudentDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Navigation items for the sidebar
  const navItems = [
    { href: '/student-dashboard', label: 'Overview', icon: <Home size={20} /> },
    { href: '/student-dashboard?tab=reports', label: 'Download Reports', icon: <FileText size={20} /> },
    { href: '/student-dashboard?tab=payments', label: 'Payments', icon: <CreditCard size={20} /> },
  ];

  if (isLoading) {
    return (
      <Layout navItems={navItems} role="student" userName="Loading...">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
        </div>
      </Layout>
    );
  }

  if (!dashboardData) {
    return (
      <Layout navItems={navItems} role="student" userName="Error">
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Failed to load dashboard data</p>
        </div>
      </Layout>
    );
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'reports':
        return <StudentReportsTab />;
      case 'payments':
        return (
          <StudentPaymentsTab 
            pendingPayments={dashboardData.pending_payments_count}
            approvedPayments={dashboardData.approved_payments_count}
            rejectedPayments={dashboardData.rejected_payments_count}
            totalPaid={dashboardData.total_paid}
            activePaymentWindows={dashboardData.active_payment_windows}
          />
        );
      default:
        return (
          <StudentOverviewTab 
            attendanceRate={dashboardData.attendance_rate}
            totalClasses={dashboardData.total_classes}
            presentClasses={dashboardData.present_classes}
            batches={dashboardData.batches}
          />
        );
    }
  };

  return (
    <Layout navItems={navItems} role="student" userName={dashboardData.student_name}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-kollektif mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {dashboardData.student_name}! Here's your attendance overview.</p>
        </div>

        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
