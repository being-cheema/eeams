import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { getAttendanceReport } from '@/services/api';

const StudentReportsTab = () => {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async (format: 'pdf' | 'csv') => {
    if (!fromDate || !toDate) {
      toast.error('Please select date range first');
      return;
    }

    try {
      setIsDownloading(true);
      const blob = await getAttendanceReport(fromDate, toDate, format);
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance_report_${fromDate}_to_${toDate}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`${format.toUpperCase()} report downloaded successfully`);
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error(`Failed to download ${format.toUpperCase()} report`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadCSV = () => handleDownload('csv');
  const handleDownloadPDF = () => handleDownload('pdf');
  
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
              max={toDate || new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">To Date</label>
            <input 
              type="date" 
              className="w-full p-2 rounded-lg border border-input bg-background"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Button 
            className="flex items-center gap-2 animated-btn"
            onClick={handleDownloadCSV}
            disabled={isDownloading || !fromDate || !toDate}
          >
            <Download size={16} />
            <span>{isDownloading ? 'Downloading...' : 'Download CSV'}</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 animated-btn"
            onClick={handleDownloadPDF}
            disabled={isDownloading || !fromDate || !toDate}
          >
            <FileText size={16} />
            <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
          </Button>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2">Download Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Select a date range to download your attendance report</li>
            <li>• CSV format is best for data analysis</li>
            <li>• PDF format is best for printing and sharing</li>
            <li>• Reports include all attendance records within the selected date range</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentReportsTab;
