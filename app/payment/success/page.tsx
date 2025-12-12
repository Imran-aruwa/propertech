// ============================================
// FILE: app/payment/success/page.tsx
// ============================================
'use client';

import Link from 'next/link';
import { CheckCircle, Download, Home } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Your rent payment has been processed successfully.</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-medium">TXN-2024-001234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">KES 25,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">Dec 09, 2024</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Download Receipt
          </button>
          <Link href="/tenant/dashboard" className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}



