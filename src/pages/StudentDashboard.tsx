
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, CreditCard, User, Home } from 'lucide-react';
import StudentOverviewTab from '@/components/student/StudentOverviewTab';
import StudentReportsTab from '@/components/student/StudentReportsTab';
import StudentPaymentsTab from '@/components/student/StudentPaymentsTab';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Navigation items for the sidebar
  const navItems = [
    { href: '/student-dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { href: '/student-dashboard?tab=reports', label: 'Download Reports', icon: <FileText size={20} /> },
    { href: '/student-dashboard?tab=payments', label: 'Payments', icon: <CreditCard size={20} /> },
    { href: '/student-profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <Layout navItems={navItems} role="student" userName="John Doe">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-kollektif mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's your attendance overview.</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <StudentOverviewTab />
          </TabsContent>
          
          <TabsContent value="reports">
            <StudentReportsTab />
          </TabsContent>
          
          <TabsContent value="payments">
            <StudentPaymentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
