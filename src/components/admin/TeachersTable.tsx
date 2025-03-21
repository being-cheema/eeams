
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for teachers
const teachers = [
  { id: 1, name: 'Sarah Johnson', subject: 'Physics', batches: 2, students: 25 },
  { id: 2, name: 'Michael Chen', subject: 'Chemistry', batches: 1, students: 12 },
  { id: 3, name: 'Olivia Williams', subject: 'Mathematics', batches: 3, students: 35 },
  { id: 4, name: 'David Rodriguez', subject: 'Biology', batches: 2, students: 22 },
];

const TeachersTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);

  // Mock handlers
  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddTeacherOpen(false);
    toast.success('Teacher added successfully!');
  };

  const handleDeleteTeacher = (id: number) => {
    toast.success(`Teacher with ID ${id} deleted successfully`);
  };

  const handleEditTeacher = (id: number) => {
    toast.info(`Editing teacher with ID ${id}`);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Manage Teachers</CardTitle>
            <CardDescription>Add, edit, or remove teachers</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search teachers..." 
                className="pl-9 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={isAddTeacherOpen} onOpenChange={setIsAddTeacherOpen}>
              <DialogTrigger asChild>
                <Button className="bg-brand-orange hover:bg-brand-orange/90 animated-btn">
                  <Plus size={16} className="mr-1" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new teacher.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddTeacher} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-name">Full Name</Label>
                    <Input id="teacher-name" placeholder="Enter full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-email">Email</Label>
                    <Input id="teacher-email" type="email" placeholder="Enter email address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-phone">Phone</Label>
                    <Input id="teacher-phone" placeholder="Enter phone number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-subject">Subject</Label>
                    <select 
                      id="teacher-subject" 
                      className="w-full p-2 rounded-lg border border-input bg-background"
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="biology">Biology</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-fee">Fee per Hour (₹)</Label>
                    <Input id="teacher-fee" type="number" placeholder="Enter fee per hour" required />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Teacher</Button>
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
                <TableHead>Subject</TableHead>
                <TableHead>Batches</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers
                .filter(teacher => teacher.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(teacher => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.id}</TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.batches}</TableCell>
                  <TableCell>{teacher.students}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditTeacher(teacher.id)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleDeleteTeacher(teacher.id)}
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

export default TeachersTable;
