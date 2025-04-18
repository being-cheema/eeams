import React from 'react';
import PaymentQRSection from './PaymentQRSection';
import PaymentProofUploader from './PaymentProofUploader';
import PaymentHistory from './PaymentHistory';

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
}

const StudentPaymentsTab: React.FC<StudentPaymentsTabProps> = ({
  pendingPayments,
  approvedPayments,
  rejectedPayments,
  totalPaid,
  activePaymentWindows,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PaymentQRSection activePaymentWindows={activePaymentWindows} />
        <PaymentProofUploader activePaymentWindows={activePaymentWindows} />
      </div>
      
      <PaymentHistory />
    </div>
  );
};

export default StudentPaymentsTab;
