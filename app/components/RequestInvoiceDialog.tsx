'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { extractUUID, fetchInvoiceData } from '../utils/services';
import { InvoiceData } from '../models/types';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';
import { FileDown } from 'lucide-react';

export function RequestInvoiceDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const resetForm = () => {
    setEmail('');
    setUrl('');
    setError(null);
    setInvoiceData(null);
    setShowPdfPreview(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!url.trim()) {
      setError('Please enter the listing URL');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);

      const uuid = extractUUID(url);
      if (!uuid) {
        setError('Invalid URL format. Could not extract listing ID.');
        setIsLoading(false);
        return;
      }

      const data = await fetchInvoiceData(uuid, email);

      setInvoiceData(data);
    } catch (err) {
      console.error('Error retrieving invoice data:', err);
      setError('Failed to retrieve listing data. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="px-6 py-3 text-lg font-bold w-full h-full bg-orange-500 hover:bg-orange-600"
        >
          <FileDown className="size-6 mr-2" />
          Request PDF Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className={`${showPdfPreview ? 'sm:max-w-[800px]' : 'sm:max-w-[425px]'}`}>
        {!invoiceData ? (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Request PDF Invoice</DialogTitle>
              <DialogDescription>
                Enter your email and the listing URL to generate a PDF invoice.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Listing URL</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://www.withgarage.com/listing/..."
                  disabled={isLoading}
                />
              </div>

              {/* Error message container - always present, just hidden when no error */}
              <div className="h-6 text-center">
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            </div>

            <DialogFooter className="flex justify-between sm:justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Generate Invoice'}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-4">
            <DialogHeader>
              <DialogTitle>Invoice Generated</DialogTitle>
              <DialogDescription>
                Your invoice for {invoiceData.details.title} has been generated successfully.
              </DialogDescription>
            </DialogHeader>

            <div className="my-4 flex flex-col gap-4">
              {showPdfPreview ? (
                <div className="h-[600px] border rounded overflow-hidden">
                  <PDFViewer width="100%" height="100%" className="border-0">
                    <InvoicePDF invoiceData={invoiceData} />
                  </PDFViewer>
                </div>
              ) : (
                <div className="bg-gray-50 border rounded p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{invoiceData.details.title}</h3>
                    <p className="text-sm text-gray-500">
                      Invoice #{invoiceData.invoiceId.substring(0, 8)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Year</p>
                      <p>{invoiceData.details.year}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Make</p>
                      <p>{invoiceData.details.make}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Amount</p>
                      <p className="font-semibold">${invoiceData.pricing.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Generated For</p>
                      <p>{invoiceData.buyer.contact}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPdfPreview(!showPdfPreview)}
                >
                  {showPdfPreview ? 'Hide Preview' : 'Preview PDF'}
                </Button>
                <PDFDownloadLink
                  document={<InvoicePDF invoiceData={invoiceData} />}
                  fileName={`invoice-${invoiceData.details.title.replace(/\s+/g, '-')}.pdf`}
                  // basically same class as shadcn primary button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  {({ loading }) => (loading ? 'Preparing PDF...' : 'Download Invoice')}
                </PDFDownloadLink>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  resetForm();
                  setIsOpen(false);
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
