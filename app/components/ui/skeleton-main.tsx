'use client';

import { RequestInvoiceDialog } from '../RequestInvoiceDialog';

export function GarageSkeletonPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation Bar */}
      <header className="flex items-center border-b border-gray-200 h-16 px-4">
        <div className="w-32">
          <div className="h-8 w-28 bg-gray-200 rounded-md" />
        </div>
        <div className="flex-grow mx-4">
          <div className="h-10 w-full max-w-md rounded-full bg-gray-200" />
        </div>
        <div className="flex space-x-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-6 w-20 bg-gray-200 rounded-md" />
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Image Gallery Section */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="col-span-2">
            <div className="h-96 w-full rounded-md bg-gray-200" />
          </div>
          <div className="grid grid-rows-3 gap-4">
            <div className="h-28 w-full rounded-md bg-gray-200" />
            <div className="h-28 w-full rounded-md bg-gray-200" />
            <div className="h-28 w-full rounded-md bg-gray-200" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Info */}
          <div className="flex-grow">
            <div className="h-10 w-3/4 mb-4 bg-gray-200 rounded-md" />
            <div className="flex gap-4 mb-6">
              <div className="h-6 w-32 bg-gray-200 rounded-md" />
              <div className="h-6 w-40 bg-gray-200 rounded-md" />
              <div className="h-6 w-28 bg-gray-200 rounded-md" />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border rounded-lg p-4 flex items-center h-14" />
              <div className="border rounded-lg p-4 flex items-center h-14" />
              <div className="border rounded-lg p-4 flex items-center h-14" />
              <div className="w-full flex justify-center">
                <RequestInvoiceDialog />
              </div>
            </div>
          </div>

          {/* Purchase Area */}
          <div className="w-full md:w-96 border rounded-lg p-6 h-min">
            <div className="h-10 w-full mb-2 bg-gray-200 rounded-md" />
            <div className="h-6 w-32 mb-8 bg-gray-200 rounded-md" />

            <div className="h-8 w-full mb-4 bg-gray-200 rounded-md" />
            <div className="h-8 w-full mb-4 bg-gray-200 rounded-md" />
            <div className="h-6 w-full bg-gray-200 rounded-md" />
          </div>
        </div>
      </main>
    </div>
  );
}
