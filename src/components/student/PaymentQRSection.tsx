import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode } from 'lucide-react';

interface PaymentWindow {
  window_id: number;
  batch_name: string;
  start_date: string;
  end_date: string;
  amount: number;
}

interface PaymentQRSectionProps {
  activePaymentWindows: PaymentWindow[];
}

const PaymentQRSection: React.FC<PaymentQRSectionProps> = ({ activePaymentWindows }) => {
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
          Current payment window for {activeWindow.batch_name}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center p-6 bg-muted/50 rounded-lg">
          <QrCode size={120} className="text-brand-orange" />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-2xl font-bold">₹{activeWindow.amount.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">
            Due by {new Date(activeWindow.end_date).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentQRSection;
