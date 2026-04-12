'use client';

import { Header } from '@/components/shared/Header';
import { ModuleList } from '@/components/modules/ModuleList';
import { modules } from '@/lib/modules';

export default function ModulesPage() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Select your perfect ERP
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Select the modules you need to assemble your all-in-one solution.
            </p>
          </div>

          <div className="mt-12">
            <ModuleList modules={modules} />
          </div>
        </div>
      </main>
    </>
  );
}
