
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QRCode from '@/components/QRCode';

const PaymentQRSection = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Pay Fees</CardTitle>
        <CardDescription>Scan QR code to pay via Google Pay</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <QRCode />
        <p className="text-sm text-muted-foreground mt-4">Amount Due: ₹2,500</p>
        <p className="text-xs text-muted-foreground">For May 2023</p>
      </CardContent>
    </Card>
  );
};

export default PaymentQRSection;
