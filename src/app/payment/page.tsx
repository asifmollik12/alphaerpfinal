'use client';

import { Suspense } from 'react';
import { Header } from '@/components/shared/Header';
import { PaymentForm } from '@/components/payment/PaymentForm';

function PaymentPageContent() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Complete Your Purchase
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            You're just one step away from unlocking your new ERP capabilities.
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <PaymentForm />
        </div>
      </main>
    </>
  );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentPageContent />
        </Suspense>
    )
}
