
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { UserCheck, FileDown, Users, PieChart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const TeacherDashboard = () => {
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [attendanceData, setAttendanceData] = useState<{
    id: number;
    name: string;
    present: boolean;
    batch: string;
  }[]>([
    { id: 1, name: 'Arjun Mehta', present: true, batch: 'Morning Batch' },
    { id: 2, name: 'Priya Singh', present: false, batch: 'Morning Batch' },
    { id: 3, name: 'Rahul Kumar', present: true, batch: 'Evening Batch' },
    { id: 4, name: 'Neha Sharma', present: true, batch: 'Evening Batch' },
    { id: 5, name: 'Vikram Patel', present: false, batch: 'Morning Batch' },
  ]);

  // Filter students based on search query and selected batch
  const filteredStudents = attendanceData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatch ? student.batch === selectedBatch : true;
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

  const handleMarkAttendance = () => {
    toast.success('Attendance marked successfully!');
  };

  const handleGoToReports = () => {
    window.location.href = '/teacher-reports';
  };

  const handleStatusChange = (studentId: number, status: string) => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.id === studentId 
          ? {...student, present: status === 'present'} 
          : student
      )
    );
    toast.info(`Marked ${status} for student #${studentId}`);
  };

  const handleDownload = () => {
    toast.success('Attendance data downloaded successfully');
  };

  return (
    <Layout navItems={teacherNavItems} role="teacher" userName="Rajesh Kumar">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-kollektif text-foreground">Teacher Dashboard</h1>
            <p className="text-muted-foreground mt-1">Mark attendance and manage your classes</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={handleGoToReports}
              className="flex items-center gap-2"
            >
              <FileDown className="h-4 w-4" />
              View Reports
            </Button>
            <Button 
              className="bg-brand-orange hover:bg-brand-orange/90 animated-btn"
              onClick={handleMarkAttendance}
            >
              <Clock className="mr-2 h-4 w-4" />
              Mark Attendance
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData.length}</div>
              <p className="text-xs text-muted-foreground">Across all batches</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData.filter(s => s.present).length}</div>
              <p className="text-xs text-muted-foreground">Out of {attendanceData.length} students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((attendanceData.filter(s => s.present).length / attendanceData.length) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">Average across batches</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="mark" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
            <TabsTrigger value="view">View Today's Attendance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mark" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mark Student Attendance</CardTitle>
                <CardDescription>Select a batch and mark attendance for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batch">Select Batch</Label>
                    <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                      <SelectTrigger id="batch">
                        <SelectValue placeholder="Select batch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Morning Batch">Morning Batch</SelectItem>
                        <SelectItem value="Evening Batch">Evening Batch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search">Search Student</Label>
                    <Input 
                      id="search" 
                      placeholder="Search by name..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.batch}</TableCell>
                          <TableCell>
                            <RadioGroup 
                              defaultValue={student.present ? "present" : "absent"}
                              onValueChange={(value) => handleStatusChange(student.id, value)}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="present" id={`present-${student.id}`} />
                                <Label htmlFor={`present-${student.id}`}>Present</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="absent" id={`absent-${student.id}`} />
                                <Label htmlFor={`absent-${student.id}`}>Absent</Label>
                              </div>
                            </RadioGroup>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                          No students found. Try a different search or batch.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleMarkAttendance} 
                  className="ml-auto bg-brand-orange hover:bg-brand-orange/90 animated-btn"
                >
                  Save Attendance
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="view" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Attendance</CardTitle>
                <CardDescription>Overview of today's attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.batch}</TableCell>
                        <TableCell>
                          <Badge variant={student.present ? 'default' : 'outline'} className={student.present ? 'bg-green-500' : ''}>
                            {student.present ? 'Present' : 'Absent'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Total Present: {attendanceData.filter(s => s.present).length} | Total Absent: {attendanceData.filter(s => !s.present).length}
                </p>
                <Button variant="outline" onClick={handleDownload}>Download</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;

