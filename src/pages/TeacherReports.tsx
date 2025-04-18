import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { UserCheck, FileDown, Calendar, Filter, Search, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from 'sonner';
import { getTeacherAttendanceReports, getTeacherDashboard, getUserInfo, exportAttendanceReport } from '@/services/api';
import { format } from 'date-fns';

const TeacherReports = () => {
  const [selectedTab, setSelectedTab] = useState<'daily' | 'monthly'>('daily');
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [selectedBatch, setSelectedBatch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [batches, setBatches] = useState<Array<{ id: number; name: string }>>([]);
  const [reports, setReports] = useState<any>({ records: [], summary: [] });

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setTeacherName(`${data.first_name} ${data.last_name}`);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setTeacherName('Teacher');
      }
    };

    fetchUserInfo();
  }, []);

  // Fetch batches
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const data = await getTeacherDashboard();
        setBatches(data.batches);
      } catch (error) {
        console.error('Error fetching batches:', error);
        toast.error('Failed to load batches');
      }
    };

    fetchBatches();
  }, []);

  // Fetch reports when tab, month, batch, or search changes
  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        const data = await getTeacherAttendanceReports({
          view: selectedTab,
          month: selectedMonth,
          ...(selectedBatch !== 'all' && { batch: selectedBatch }),
          ...(searchQuery && { search: searchQuery })
        });
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
        toast.error('Failed to load attendance reports');
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to avoid too many API calls while typing
    const timeoutId = setTimeout(fetchReports, 300);
    return () => clearTimeout(timeoutId);
  }, [selectedTab, selectedMonth, selectedBatch, searchQuery]);

  // Use the filtered data directly from the API response
  const dailyData = reports.records || [];
  const monthlyData = reports.summary || [];

  // Navigation items for teacher
  const teacherNavItems = [
    {
      href: '/teacher-dashboard',
      label: 'Dashboard',
      icon: <UserCheck size={18} />
    },
    {
      href: '/teacher-reports',
      label: 'Reports',
      icon: <FileDown size={18} />
    }
  ];

  const handleDownloadReport = async (exportFormat: 'csv' | 'pdf') => {
    try {
      const response = await exportAttendanceReport({
        view: selectedTab,
        month: selectedMonth,
        format: exportFormat,
        ...(selectedBatch !== 'all' && { batch: selectedBatch }),
        ...(searchQuery && { search: searchQuery })
      });

      // Create a blob and download the file
      const blob = new Blob([response], { type: exportFormat === 'pdf' ? 'application/pdf' : 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance_report_${selectedMonth}_${selectedTab}.${exportFormat}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success(`Report downloaded successfully as ${exportFormat.toUpperCase()}!`);
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error(`Failed to download ${exportFormat.toUpperCase()} report`);
    }
  };

  return (
    <Layout navItems={teacherNavItems} role="teacher" userName={teacherName}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-kollektif text-foreground">Attendance Reports</h1>
            <p className="text-muted-foreground mt-1">View and analyze student attendance data</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 animated-btn">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDownloadReport('csv')}>
                <FileDown className="mr-2 h-4 w-4" />
                Download CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownloadReport('pdf')}>
                <FileText className="mr-2 h-4 w-4" />
                Download PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students or batches"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full md:w-[180px]"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                {batches.map(batch => (
                  <SelectItem key={batch.id} value={batch.id.toString()}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="daily" className="space-y-4" onValueChange={(value) => setSelectedTab(value as 'daily' | 'monthly')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">Daily Attendance</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Daily Attendance Record</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-orange"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Batch</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dailyData.length > 0 ? (
                        dailyData.map((record: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{record.name}</TableCell>
                            <TableCell>{record.batch}</TableCell>
                            <TableCell>{format(new Date(record.date), 'dd/MM/yyyy')}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={record.status === 'Present' ? 'default' : 'destructive'} 
                                className={record.status === 'Present' ? 'bg-green-500' : ''}
                              >
                                {record.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                            No attendance records found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Monthly Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-orange"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Batch</TableHead>
                        <TableHead>Total Classes</TableHead>
                        <TableHead>Classes Attended</TableHead>
                        <TableHead>Attendance %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyData.length > 0 ? (
                        monthlyData.map((record: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{record.name}</TableCell>
                            <TableCell>{record.batch}</TableCell>
                            <TableCell>{record.total_classes}</TableCell>
                            <TableCell>{record.classes_attended}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={`${
                                  record.attendance_percentage >= 90 
                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                    : record.attendance_percentage >= 75 
                                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200' 
                                      : 'bg-red-50 text-red-700 border-red-200'
                                }`}
                              >
                                {record.attendance_percentage}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                            No summary records found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TeacherReports;

