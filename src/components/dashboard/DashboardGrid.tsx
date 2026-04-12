'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { modulesById, type Module, type ModuleId } from '@/lib/modules';
import { ArrowRight } from 'lucide-react';

export function DashboardGrid() {
  const searchParams = useSearchParams();
  const [purchasedModules, setPurchasedModules] = useState<Module[]>([]);

  useEffect(() => {
    const moduleIds = searchParams.get('modules')?.split(',') as ModuleId[] | undefined;
    if (moduleIds) {
      const modules = moduleIds.map((id) => modulesById[id]).filter(Boolean);
      setPurchasedModules(modules);
    }
  }, [searchParams]);

  if (purchasedModules.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">You haven't unlocked any modules yet.</p>
        <Link href="/modules" className="text-primary hover:underline mt-2 inline-block">
          Browse Modules
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {purchasedModules.map((module) => (
        <Link key={module.id} href={`/dashboard/${module.id}`} className="group">
          <Card className="h-full transition-all duration-300 hover:shadow-xl hover:border-primary/50 group-hover:-translate-y-1">
            <CardHeader>
              <div className="flex justify-between items-start">
                  <module.Icon className="h-10 w-10 text-primary mb-4" />
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
              <CardTitle>{module.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{module.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
