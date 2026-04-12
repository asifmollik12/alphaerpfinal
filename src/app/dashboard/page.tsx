'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VisaLayout from './visa/layout';
import VisaDashboardPage from './visa/page';

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const modules = searchParams.get('modules');

  if (modules?.includes('visa')) {
    return (
      <VisaLayout>
        <VisaDashboardPage />
      </VisaLayout>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Content for other modules can be rendered here */}
    </div>
  );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading dashboard...</div>}>
            <DashboardPageContent />
        </Suspense>
    )
}
