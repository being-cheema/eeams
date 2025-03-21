
import React from 'react';

const QRCode = () => {
  return (
    <div className="w-48 h-48 p-2 bg-white rounded-lg shadow-sm overflow-hidden">
      {/* SVG representation of a QR code */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <g fill="#333333">
          {/* QR Code positioning squares */}
          <rect x="10" y="10" width="20" height="20" />
          <rect x="15" y="15" width="10" height="10" fill="white" />
          
          <rect x="70" y="10" width="20" height="20" />
          <rect x="75" y="15" width="10" height="10" fill="white" />
          
          <rect x="10" y="70" width="20" height="20" />
          <rect x="15" y="75" width="10" height="10" fill="white" />
          
          {/* QR Code data pattern - simplified representation */}
          <rect x="40" y="10" width="5" height="5" />
          <rect x="50" y="10" width="5" height="5" />
          <rect x="60" y="10" width="5" height="5" />
          
          <rect x="10" y="40" width="5" height="5" />
          <rect x="20" y="40" width="5" height="5" />
          <rect x="30" y="35" width="5" height="5" />
          <rect x="40" y="40" width="5" height="5" />
          <rect x="50" y="40" width="5" height="5" />
          <rect x="55" y="45" width="5" height="5" />
          <rect x="60" y="40" width="5" height="5" />
          <rect x="70" y="40" width="5" height="5" />
          <rect x="80" y="40" width="5" height="5" />
          
          <rect x="40" y="50" width="5" height="5" />
          <rect x="50" y="50" width="5" height="5" />
          <rect x="60" y="50" width="5" height="5" />
          
          <rect x="40" y="60" width="5" height="5" />
          <rect x="50" y="60" width="5" height="5" />
          <rect x="60" y="60" width="5" height="5" />
          
          <rect x="40" y="70" width="5" height="5" />
          <rect x="50" y="70" width="5" height="5" />
          <rect x="60" y="70" width="5" height="5" />
          
          <rect x="40" y="80" width="5" height="5" />
          <rect x="50" y="80" width="5" height="5" />
          <rect x="60" y="80" width="5" height="5" />
          
          {/* QR Code alignment pattern */}
          <rect x="70" y="70" width="10" height="10" />
          <rect x="72" y="72" width="6" height="6" fill="white" />
          <rect x="74" y="74" width="2" height="2" />
        </g>
      </svg>
      
      <div className="mt-2 text-center text-xs font-medium text-brand-orange">
        Google Pay
      </div>
    </div>
  );
};

export default QRCode;
