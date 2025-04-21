import React, { useState, useEffect } from 'react';
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
import { getTeacherDashboard, getBatchStudents, markAttendance, getTeacherAttendanceReports, getTodayAttendance, getUserInfo } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

type ViewType = 'daily' | 'monthly';

interface Student {
  id: number;
  name: string;
  email: string;
}

interface BatchData {
  id: number;
  name: string;
  student_count: number;
}

interface AttendanceStatus {
  status: 'P' | 'A' | 'L';
  remarks: string;
}

interface DashboardData {
  batches: BatchData[];
}

interface TodayAttendanceData {
  date: string;
  batches: Array<{
    batch_id: number;
    batch_name: string;
    students: Array<{
      student_id: number;
      student_name: string;
      status: 'P' | 'A' | 'L';
      status_display: string;
      remarks: string;
    }>;
  }>;
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [attendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceStatus, setAttendanceStatus] = useState<Record<number, AttendanceStatus>>({});
  const [todayAttendance, setTodayAttendance] = useState<TodayAttendanceData | null>(null);
  const [selectedView, setSelectedView] = useState<ViewType>('daily');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [attendanceReports, setAttendanceReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAttendanceMarked, setIsAttendanceMarked] = useState<Record<number, boolean>>({});
  const [teacherName, setTeacherName] = useState('');
  const [classRemark, setClassRemark] = useState('');

  // Fetch user info on component mount
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

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getTeacherDashboard();
        // Map the batch data to match our interface
        const mappedData: DashboardData = {
          batches: data.batches.map((batch: any) => ({
            id: batch.id,
            name: batch.name,
            student_count: batch.student_count
          }))
        };
        setDashboardData(mappedData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch today's attendance when component mounts and after marking attendance
  const fetchTodayAttendance = async () => {
    try {
      const data = await getTodayAttendance();
      setTodayAttendance(data);
    } catch (error) {
      console.error('Error fetching today\'s attendance:', error);
      setTodayAttendance(null);
    }
  };

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  // Fetch students when batch is selected
  useEffect(() => {
    const fetchBatchStudents = async () => {
      if (!selectedBatch) {
        setStudents([]);
        return;
      }
      
      setIsLoadingStudents(true);
      try {
        const batchId = parseInt(selectedBatch);
        const data = await getBatchStudents(batchId);
        setStudents(data.students || []);
      } catch (error) {
        console.error('Error fetching batch students:', error);
        toast.error('Failed to load batch students');
        setStudents([]);
      } finally {
        setIsLoadingStudents(false);
      }
    };

    fetchBatchStudents();
  }, [selectedBatch]);

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleStatusChange = (studentId: number, status: 'P' | 'A' | 'L', remarks: string = 'ok') => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: { status, remarks }
    }));
  };

  const handleRemarksChange = (studentId: number, remarks: string) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks
      }
    }));
  };

  const handleMarkAttendance = async () => {
    if (!selectedBatch || Object.keys(attendanceStatus).length === 0) {
      toast.error('Please select a batch and mark attendance for students');
      return;
    }

    try {
      const attendanceData = Object.entries(attendanceStatus).map(([studentId, data]) => ({
        student_id: parseInt(studentId),
        status: data.status,
        remarks: data.remarks || 'ok'
      }));

      await markAttendance({
        batch_id: parseInt(selectedBatch),
        date: attendanceDate,
        attendance: attendanceData,
        class_remark: classRemark
      });

      toast.success('Attendance marked successfully!');
      
      // Refresh today's attendance after marking
      await fetchTodayAttendance();
      
      // Reset attendance status and class remark
      setAttendanceStatus({});
      setClassRemark('');
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error('Failed to mark attendance');
    }
  };

  const fetchAttendanceReports = async () => {
    try {
      setLoading(true);
      const reports = await getTeacherAttendanceReports({
        view: selectedView,
        month: format(selectedMonth, 'yyyy-MM'),
      });
      setAttendanceReports(reports);
    } catch (error) {
      console.error('Error fetching attendance reports:', error);
      toast.error('Failed to fetch attendance reports');
    } finally {
      setLoading(false);
    }
  };

  // Update attendance status when today's attendance data changes
  useEffect(() => {
    if (todayAttendance?.batches) {
      const markedStatus: Record<number, boolean> = {};
      const existingAttendance: Record<number, AttendanceStatus> = {};

      todayAttendance.batches.forEach(batch => {
        batch.students.forEach(student => {
          markedStatus[student.student_id] = true;
          existingAttendance[student.student_id] = {
            status: student.status,
            remarks: student.remarks
          };
        });
      });

      setIsAttendanceMarked(markedStatus);
      setAttendanceStatus(existingAttendance);
    }
  }, [todayAttendance]);

  if (isLoading) {
    return (
      <Layout navItems={teacherNavItems} role="teacher" userName="Loading...">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
        </div>
      </Layout>
    );
  }

  const totalStudents = dashboardData?.batches.reduce((acc, batch) => acc + batch.student_count, 0) || 0;
  const presentToday = todayAttendance?.batches?.reduce((acc, batch) => 
    acc + batch.students.filter(student => student.status === 'P').length, 0) || 0;
  const attendanceRate = totalStudents > 0 ? Math.round((presentToday / totalStudents) * 100) : 0;

  return (
    <Layout navItems={teacherNavItems} role="teacher" userName={teacherName}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-kollektif text-foreground">Welcome, {teacherName}</h1>
            <p className="text-muted-foreground mt-1">Mark attendance and manage your classes</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/teacher-reports')}
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
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Across all batches</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{presentToday}</div>
              <p className="text-xs text-muted-foreground">Out of {totalStudents} students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceRate}%</div>
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
                        {(dashboardData?.batches || []).map(batch => (
                          <SelectItem key={batch.id} value={String(batch.id)}>
                            {batch.name}
                          </SelectItem>
                        ))}
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
                
                <div className="space-y-2">
                  <Label htmlFor="classRemark">Class Remark</Label>
                  <Input
                    id="classRemark"
                    placeholder="Add a remark for the entire class..."
                    value={classRemark}
                    onChange={(e) => setClassRemark(e.target.value)}
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingStudents ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-brand-orange"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>
                            <RadioGroup 
                              value={attendanceStatus[student.id]?.status || 'A'}
                              onValueChange={(value) => handleStatusChange(student.id, value as 'P' | 'A' | 'L')}
                              className="flex space-x-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="P" id={`present-${student.id}`} />
                                <Label htmlFor={`present-${student.id}`}>Present</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="A" id={`absent-${student.id}`} />
                                <Label htmlFor={`absent-${student.id}`}>Absent</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="L" id={`late-${student.id}`} />
                                <Label htmlFor={`late-${student.id}`}>Late</Label>
                              </div>
                            </RadioGroup>
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="Add remarks"
                              value={attendanceStatus[student.id]?.remarks || ''}
                              onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                              className="max-w-[200px]"
                            />
                          </TableCell>
                          <TableCell>
                            {isAttendanceMarked[student.id] ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Already Marked
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                Not Marked
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                          {selectedBatch ? 'No students found. Try a different search.' : 'Please select a batch.'}
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
                  disabled={!selectedBatch || Object.keys(attendanceStatus).length === 0}
                >
                  {Object.values(isAttendanceMarked).some(Boolean) ? 'Update Attendance' : 'Save Attendance'}
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
                      <TableHead>Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAttendance?.batches?.length > 0 ? (
                      todayAttendance.batches.map((batch) => (
                        batch.students.map((student) => (
                          <TableRow key={`${student.student_id}-${batch.batch_id}`}>
                            <TableCell className="font-medium">{student.student_name}</TableCell>
                            <TableCell>{batch.batch_name}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={student.status === 'P' ? 'default' : 'destructive'} 
                                className={student.status === 'P' ? 'bg-green-500' : ''}
                              >
                                {student.status_display}
                              </Badge>
                            </TableCell>
                            <TableCell>{student.remarks}</TableCell>
                          </TableRow>
                        ))
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                          No attendance records for today
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

export default TeacherDashboard;

