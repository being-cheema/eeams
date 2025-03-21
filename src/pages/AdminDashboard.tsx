
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Users, Book, Settings } from 'lucide-react';
import AdminOverviewTab from '@/components/admin/AdminOverviewTab';
import TeachersTable from '@/components/admin/TeachersTable';
import StudentsTable from '@/components/admin/StudentsTable';

const AdminDashboard = () => {
  // Navigation items for the sidebar
  const navItems = [
    { href: '/admin-dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { href: '/admin-dashboard?tab=teachers', label: 'Manage Teachers', icon: <Users size={20} /> },
    { href: '/admin-dashboard?tab=students', label: 'Manage Students', icon: <Book size={20} /> },
    { href: '/admin-settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <Layout navItems={navItems} role="admin" userName="Admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-kollektif mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your academy's teachers, students, and view analytics.</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <AdminOverviewTab />
          </TabsContent>
          
          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-6 animate-fade-in">
            <TeachersTable />
          </TabsContent>
          
          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6 animate-fade-in">
            <StudentsTable />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
