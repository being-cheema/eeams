
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Percent, DollarSign, Download, Upload, Settings } from 'lucide-react';
import { toast } from 'sonner';

const KeyMetricsCard = () => {
  // Mock handlers
  const handleExportReports = () => {
    toast.success('Reports exported successfully!');
  };

  const handleBackupData = () => {
    toast.success('Data backed up successfully!');
  };

  const handleSystemSettings = () => {
    toast.info('Opening system settings...');
  };
  
  return (
    <Card className="glass-card lg:col-span-2">
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
        <CardDescription>Current performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/50 rounded-lg border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <BarChart3 size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Teacher-Student Ratio</p>
                <p className="text-lg font-medium">1:24</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Recommended ratio: 1:20
            </div>
          </div>
          
          <div className="p-4 bg-white/50 rounded-lg border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <Percent size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Retention Rate</p>
                <p className="text-lg font-medium">92%</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              3% higher than last year
            </div>
          </div>
          
          <div className="p-4 bg-white/50 rounded-lg border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                <DollarSign size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fee per Hour</p>
                <p className="text-lg font-medium">₹500</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Last updated: April 15, 2023
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 mt-4">
          <div className="p-4 bg-white/50 rounded-lg border border-border/50">
            <h3 className="font-medium mb-2">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleExportReports}
              >
                <Download size={14} />
                <span>Export Reports</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleBackupData}
              >
                <Upload size={14} />
                <span>Backup Data</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleSystemSettings}
              >
                <Settings size={14} />
                <span>System Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyMetricsCard;
