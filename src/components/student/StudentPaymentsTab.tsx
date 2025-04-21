import React, { useState, useEffect } from 'react';
import PaymentQRSection from './PaymentQRSection';
import PaymentProofUploader from './PaymentProofUploader';
import PaymentHistory from './PaymentHistory';
import { getActivePaymentWindows } from '@/services/api';

interface StudentPaymentsTabProps {
  pendingPayments: number;
  approvedPayments: number;
  rejectedPayments: number;
  totalPaid: number;
  activePaymentWindows: Array<{
    window_id: number;
    batch_name: string;
    start_date: string;
    end_date: string;
    amount: number;
  }>;
  studentName: string;
}

const StudentPaymentsTab: React.FC<StudentPaymentsTabProps> = ({
  pendingPayments,
  approvedPayments,
  rejectedPayments,
  totalPaid,
  activePaymentWindows,
  studentName,
}) => {
  const [totalPendingFee, setTotalPendingFee] = useState(0);

  useEffect(() => {
    const fetchTotalPendingFee = async () => {
      try {
        const data = await getActivePaymentWindows();
        setTotalPendingFee(data.total_pending_fee);
      } catch (error) {
        console.error('Error fetching total pending fee:', error);
      }
    };

    fetchTotalPendingFee();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PaymentQRSection 
          activePaymentWindows={activePaymentWindows} 
          studentName={studentName} 
          totalPendingFee={totalPendingFee}
        />
        <PaymentProofUploader activePaymentWindows={activePaymentWindows} />
      </div>
      
      <PaymentHistory />
    </div>
  );
};

export default StudentPaymentsTab;
