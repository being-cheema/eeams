import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QRCode from '@/components/QRCode';

interface PaymentWindow {
  window_id: number;
  batch_name: string;
  start_date: string;
  end_date: string;
  amount: number;
}

interface PaymentQRSectionProps {
  activePaymentWindows: PaymentWindow[];
  studentName: string;
  totalPendingFee?: number;
}

const PaymentQRSection: React.FC<PaymentQRSectionProps> = ({ 
  activePaymentWindows, 
  studentName,
  totalPendingFee = 0
}) => {
  const activeWindow = activePaymentWindows.length > 0 ? activePaymentWindows[0] : null;

  if (!activeWindow) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>No Active Payment Window</CardTitle>
          <CardDescription>There are no active payment windows at the moment.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Active Payment Window</CardTitle>
        <CardDescription>
          Current payment window for {studentName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg">
          <QRCode />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-2xl font-bold">₹{totalPendingFee.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">
            Due by {new Date(activeWindow.end_date).toLocaleDateString()}
          </p>
          {/* {totalPendingFee > 0 && (
            <div className="mt-4 pt-4 border-t border-border/40">
              <p className="text-sm text-muted-foreground">Total Pending Fee</p>
              <p className="text-xl font-bold text-brand-orange">₹{totalPendingFee.toLocaleString()}</p>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentQRSection;
