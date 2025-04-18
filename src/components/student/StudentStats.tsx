import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, CheckCircle2 } from 'lucide-react';

interface StudentStatsProps {
  attendanceRate: number;
  totalClasses: number;
  presentClasses: number;
  batches: Array<{
    id: number;
    name: string;
  }>;
}

const StudentStats: React.FC<StudentStatsProps> = ({
  attendanceRate,
  totalClasses,
  presentClasses,
  batches,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{attendanceRate}%</div>
          <p className="text-xs text-muted-foreground">
            {presentClasses} of {totalClasses} classes attended
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClasses}</div>
          <p className="text-xs text-muted-foreground">
            Classes scheduled this month
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Enrolled Batches</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{batches.length}</div>
          <p className="text-xs text-muted-foreground">
            {batches.map(batch => batch.name).join(', ')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentStats;
