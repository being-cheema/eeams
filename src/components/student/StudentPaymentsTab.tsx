
import React from 'react';
import PaymentQRSection from './PaymentQRSection';
import PaymentProofUploader from './PaymentProofUploader';
import PaymentHistory from './PaymentHistory';

const StudentPaymentsTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PaymentQRSection />
        <PaymentProofUploader />
      </div>
      
      <PaymentHistory />
    </div>
  );
};

export default StudentPaymentsTab;
