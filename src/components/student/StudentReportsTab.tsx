
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner';

const StudentReportsTab = () => {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  
  const handleDownloadCSV = () => {
    if (fromDate && toDate) {
      toast.success(`CSV report downloaded for period ${fromDate} to ${toDate}`);
    } else {
      toast.error('Please select date range first');
    }
  };

  const handleDownloadPDF = () => {
    if (fromDate && toDate) {
      toast.success(`PDF report downloaded for period ${fromDate} to ${toDate}`);
    } else {
      toast.error('Please select date range first');
    }
  };

  const handleDownloadReport = (report: string) => {
    toast.success(`Downloaded ${report}`);
  };
  
  return (
    <Card className="glass-card animate-fade-in">
      <CardHeader>
        <CardTitle>Download Attendance Reports</CardTitle>
        <CardDescription>Generate and download your attendance records</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">From Date</label>
            <input 
              type="date" 
              className="w-full p-2 rounded-lg border border-input bg-background"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">To Date</label>
            <input 
              type="date" 
              className="w-full p-2 rounded-lg border border-input bg-background"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Button 
            className="flex items-center gap-2 animated-btn"
            onClick={handleDownloadCSV}
          >
            <Download size={16} />
            <span>Download CSV</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 animated-btn"
            onClick={handleDownloadPDF}
          >
            <FileText size={16} />
            <span>Download PDF</span>
          </Button>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2">Recent Downloads</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between items-center p-2 bg-white rounded-md">
              <span>Attendance Report - April 2023</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleDownloadReport('Attendance Report - April 2023')}
              >
                <Download size={14} />
              </Button>
            </li>
            <li className="flex justify-between items-center p-2 bg-white rounded-md">
              <span>Attendance Report - March 2023</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleDownloadReport('Attendance Report - March 2023')}
              >
                <Download size={14} />
              </Button>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentReportsTab;
