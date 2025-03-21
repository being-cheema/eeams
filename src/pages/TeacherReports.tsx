
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { UserCheck, FileDown, Calendar, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from 'sonner';

const TeacherReports = () => {
  const [selectedTab, setSelectedTab] = useState('daily');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for attendance reports
  const attendanceData = [
    { id: 1, name: 'Arjun Mehta', date: '2023-06-01', status: 'present', batch: 'Morning Batch', time: '10:00 AM' },
    { id: 2, name: 'Priya Singh', date: '2023-06-01', status: 'absent', batch: 'Morning Batch', time: '10:00 AM' },
    { id: 3, name: 'Rahul Kumar', date: '2023-06-01', status: 'present', batch: 'Evening Batch', time: '4:00 PM' },
    { id: 4, name: 'Neha Sharma', date: '2023-06-01', status: 'present', batch: 'Evening Batch', time: '4:00 PM' },
    { id: 5, name: 'Vikram Patel', date: '2023-06-01', status: 'absent', batch: 'Morning Batch', time: '10:00 AM' },
    { id: 6, name: 'Ananya Gupta', date: '2023-06-02', status: 'present', batch: 'Morning Batch', time: '10:00 AM' },
    { id: 7, name: 'Sanjay Joshi', date: '2023-06-02', status: 'present', batch: 'Evening Batch', time: '4:00 PM' },
    { id: 8, name: 'Divya Reddy', date: '2023-06-02', status: 'absent', batch: 'Evening Batch', time: '4:00 PM' },
  ];

  // Mock data for monthly summary
  const monthlySummary = [
    { id: 1, name: 'Arjun Mehta', totalClasses: 22, attended: 20, percentage: 90.9, batch: 'Morning Batch' },
    { id: 2, name: 'Priya Singh', totalClasses: 22, attended: 18, percentage: 81.8, batch: 'Morning Batch' },
    { id: 3, name: 'Rahul Kumar', totalClasses: 22, attended: 22, percentage: 100, batch: 'Evening Batch' },
    { id: 4, name: 'Neha Sharma', totalClasses: 22, attended: 19, percentage: 86.4, batch: 'Evening Batch' },
    { id: 5, name: 'Vikram Patel', totalClasses: 22, attended: 15, percentage: 68.2, batch: 'Morning Batch' },
    { id: 6, name: 'Ananya Gupta', totalClasses: 22, attended: 21, percentage: 95.5, batch: 'Morning Batch' },
    { id: 7, name: 'Sanjay Joshi', totalClasses: 22, attended: 17, percentage: 77.3, batch: 'Evening Batch' },
    { id: 8, name: 'Divya Reddy', totalClasses: 22, attended: 20, percentage: 90.9, batch: 'Evening Batch' },
  ];

  // Filter and search functionality based on batch selection as well
  const filteredDailyData = attendanceData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.batch.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatch ? student.batch.toLowerCase().includes(selectedBatch.toLowerCase()) : true;
    return matchesSearch && matchesBatch;
  });

  const filteredMonthlyData = monthlySummary.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.batch.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatch ? student.batch.toLowerCase().includes(selectedBatch.toLowerCase()) : true;
    return matchesSearch && matchesBatch;
  });

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

  const handleDownloadReport = () => {
    const reportType = selectedTab === 'daily' ? 'Daily Attendance' : 'Monthly Summary';
    const monthText = selectedMonth ? ` for ${selectedMonth}` : '';
    const batchText = selectedBatch ? ` (${selectedBatch})` : '';
    
    toast.success(`${reportType} report${monthText}${batchText} downloaded successfully!`);
  };

  return (
    <Layout navItems={teacherNavItems} role="teacher" userName="Rajesh Kumar">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-kollektif text-foreground">Attendance Reports</h1>
            <p className="text-muted-foreground mt-1">View and analyze student attendance data</p>
          </div>
          <Button 
            onClick={handleDownloadReport} 
            className="bg-brand-orange hover:bg-brand-orange/90 animated-btn"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export Report
          </Button>
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
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="january">January</SelectItem>
                <SelectItem value="february">February</SelectItem>
                <SelectItem value="march">March</SelectItem>
                <SelectItem value="april">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="june">June</SelectItem>
                <SelectItem value="july">July</SelectItem>
                <SelectItem value="august">August</SelectItem>
                <SelectItem value="september">September</SelectItem>
                <SelectItem value="october">October</SelectItem>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="december">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning Batch</SelectItem>
                <SelectItem value="afternoon">Afternoon Batch</SelectItem>
                <SelectItem value="evening">Evening Batch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="daily" className="space-y-4" onValueChange={setSelectedTab}>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDailyData.length > 0 ? (
                      filteredDailyData.map((student) => (
                        <TableRow key={`${student.id}-${student.date}`}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.batch}</TableCell>
                          <TableCell>{new Date(student.date).toLocaleDateString()}</TableCell>
                          <TableCell>{student.time}</TableCell>
                          <TableCell>
                            <Badge variant={student.status === 'present' ? 'default' : 'destructive'} className={student.status === 'present' ? 'bg-green-500' : ''}>
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                          No attendance records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Monthly Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent>
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
                    {filteredMonthlyData.length > 0 ? (
                      filteredMonthlyData.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.batch}</TableCell>
                          <TableCell>{student.totalClasses}</TableCell>
                          <TableCell>{student.attended}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`${
                                student.percentage >= 90 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : student.percentage >= 75 
                                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200' 
                                    : 'bg-red-50 text-red-700 border-red-200'
                              }`}
                            >
                              {student.percentage}%
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TeacherReports;

