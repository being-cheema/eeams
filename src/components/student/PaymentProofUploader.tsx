import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Info } from 'lucide-react';
import { toast } from 'sonner';
import { submitPayment } from '@/services/api';

interface PaymentWindow {
  window_id: number;
  batch_name: string;
  start_date: string;
  end_date: string;
  amount: number;
}

interface PaymentProofUploaderProps {
  activePaymentWindows: PaymentWindow[];
}

const PaymentProofUploader: React.FC<PaymentProofUploaderProps> = ({ activePaymentWindows }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const activeWindow = activePaymentWindows.length > 0 ? activePaymentWindows[0] : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !activeWindow) {
      toast.error('Please upload payment proof');
      return;
    }

    try {
      setIsUploading(true);
      await submitPayment(activeWindow.window_id, selectedFile);
      toast.success('Payment proof uploaded successfully');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading payment proof:', error);
      toast.error('Failed to upload payment proof');
    } finally {
      setIsUploading(false);
    }
  };

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
        <CardTitle>Upload Payment Proof</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monthly Payment Alert */}
        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
            <div className="space-y-2">
              <p className="font-medium">Monthly Payment Policy:</p>
              <ul className="space-y-1 text-xs">
                <li>• Only <strong>one payment upload per month</strong> is allowed</li>
                <li>• Any remaining fees will automatically <strong>carry forward</strong> to the next month</li>
                <li>• Your next month's total will include: New monthly fee + Previous remaining amount</li>
              </ul>
              <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-900 rounded text-xs">
                <p className="font-medium">Example:</p>
                <p>Monthly fee: ₹500 | You paid: ₹300 | Remaining: ₹200</p>
                <p>Next month total: ₹500 + ₹200 = ₹700</p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Upload Payment Proof</label>
            <div className="mt-1">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="payment-proof"
              />
              <label
                htmlFor="payment-proof"
                className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
              >
                {selectedFile ? (
                  <div className="flex items-center gap-2">
                    <FileText size={20} />
                    <span>{selectedFile.name}</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={24} className="mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload payment proof
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: JPG, PNG, PDF
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <Button
            className="w-full bg-brand-orange hover:bg-brand-orange/90 animated-btn"
            onClick={handleSubmit}
            disabled={isUploading || !selectedFile}
          >
            {isUploading ? 'Uploading...' : 'Submit Payment Proof'}
          </Button>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-2">Upload Guidelines</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Upload clear screenshot or PDF of payment confirmation</li>
            <li>• Make sure transaction ID and amount are visible</li>
            <li>• File size should be less than 5MB</li>
            <li>• Payment will be verified within 24 hours</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentProofUploader;
