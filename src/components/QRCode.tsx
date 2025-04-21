import React from 'react';
import qrImage from '@/assets/qr_eeams2.jpg';

const QRCode = () => {
  return (
    <div className="w-64 h-200 p-4 bg-white rounded-lg shadow-sm overflow-hidden">
      <img 
        src={qrImage} 
        alt="Payment QR Code"
        className="w-full h-full object-contain"
      />
      <div className="mt-3 text-center text-sm font-medium text-brand-orange">
        Google Pay
      </div>
    </div>
  );
};

export default QRCode;
