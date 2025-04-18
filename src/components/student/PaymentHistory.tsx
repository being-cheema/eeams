import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPaymentHistory } from '@/services/api';
import { toast } from 'sonner';

interface PaymentRecord {
  payment_id: number;
  batch_name: string;
  amount: number;
  status: string;
  date: string;
}

interface PaymentHistoryData {
  student_name: string;
  email: string;
  payment_history: PaymentRecord[];
  total_payments: number;
  total_paid: number;
}

const PaymentHistory = () => {
  const [historyData, setHistoryData] = useState<PaymentHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const data = await getPaymentHistory();
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching payment history:', error);
        toast.error('Failed to load payment history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Loading payment records...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-orange"></div>
        </CardContent>
      </Card>
    );
  }

  if (!historyData || historyData.payment_history.length === 0) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>No payment records found</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>
          Total Paid: ₹{historyData.total_paid.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-muted-foreground text-sm border-b">
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Batch</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {historyData.payment_history.map((record) => (
                <tr key={record.payment_id} className="border-b border-border/50 last:border-0">
                  <td className="py-3">{formatDate(record.date)}</td>
                  <td className="py-3">{record.batch_name}</td>
                  <td className="py-3">₹{record.amount.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
