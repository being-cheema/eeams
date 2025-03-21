
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PaymentProofUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      toast.success('File selected successfully');
    }
  };

  const handleSubmitPaymentProof = () => {
    if (selectedFile) {
      toast.success('Payment proof submitted successfully');
      setSelectedFile(null);
    } else {
      toast.error('Please select a file first');
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Upload Payment Proof</CardTitle>
        <CardDescription>Upload screenshot after making payment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          {selectedFile ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                  <span>Select File</span>
                </Button>
              </label>
            </div>
          )}
        </div>
        
        <Button 
          className="w-full animated-btn" 
          disabled={!selectedFile}
          onClick={handleSubmitPaymentProof}
        >
          Submit Payment Proof
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentProofUploader;
