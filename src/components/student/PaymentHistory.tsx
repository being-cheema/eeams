
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentHistory = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>Your recent payments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-muted-foreground text-sm border-b">
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Description</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3">May 3, 2023</td>
                <td className="py-3">Monthly Fee - May 2023</td>
                <td className="py-3">₹2,500</td>
                <td className="py-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3">Apr 5, 2023</td>
                <td className="py-3">Monthly Fee - April 2023</td>
                <td className="py-3">₹2,500</td>
                <td className="py-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3">Mar 7, 2023</td>
                <td className="py-3">Monthly Fee - March 2023</td>
                <td className="py-3">₹2,500</td>
                <td className="py-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
