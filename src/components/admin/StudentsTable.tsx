
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for students
const students = [
  { id: 1, name: 'John Doe', grade: '12', subjects: ['Physics', 'Math'], attendance: 85 },
  { id: 2, name: 'Emma Smith', grade: '11', subjects: ['Chemistry'], attendance: 92 },
  { id: 3, name: 'Michael Brown', grade: '12', subjects: ['Physics', 'Chemistry'], attendance: 78 },
  { id: 4, name: 'Olivia Johnson', grade: '10', subjects: ['Math'], attendance: 90 },
  { id: 5, name: 'William Davis', grade: '11', subjects: ['Biology', 'Chemistry'], attendance: 82 },
];

const StudentsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  // Mock handlers
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddStudentOpen(false);
    toast.success('Student added successfully!');
  };

  const handleDeleteStudent = (id: number) => {
    toast.success(`Student with ID ${id} deleted successfully`);
  };

  const handleEditStudent = (id: number) => {
    toast.info(`Editing student with ID ${id}`);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Manage Students</CardTitle>
            <CardDescription>Add, edit, or remove students</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search students..." 
                className="pl-9 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-brand-orange hover:bg-brand-orange/90 animated-btn">
                  <Plus size={16} className="mr-1" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new student.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddStudent} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input id="student-name" placeholder="Enter full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input id="student-email" type="email" placeholder="Enter email address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-phone">Phone</Label>
                    <Input id="student-phone" placeholder="Enter phone number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-grade">Grade</Label>
                    <select 
                      id="student-grade" 
                      className="w-full p-2 rounded-lg border border-input bg-background"
                      required
                    >
                      <option value="">Select Grade</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Subjects</Label>
                    <div className="flex flex-wrap gap-2">
                      <label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer">
                        <input type="checkbox" name="subjects" value="physics" />
                        <span>Physics</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer">
                        <input type="checkbox" name="subjects" value="chemistry" />
                        <span>Chemistry</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer">
                        <input type="checkbox" name="subjects" value="mathematics" />
                        <span>Mathematics</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 border rounded-md cursor-pointer">
                        <input type="checkbox" name="subjects" value="biology" />
                        <span>Biology</span>
                      </label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Student</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students
                .filter(student => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.map(subject => (
                        <span 
                          key={subject} 
                          className="px-2 py-1 text-xs bg-brand-orange/10 text-brand-orange rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{student.attendance}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditStudent(student.id)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentsTable;
