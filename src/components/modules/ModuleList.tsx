'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Module, ModuleId } from '@/lib/modules';
import { ModuleCard } from '@/components/modules/ModuleCard';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type ModuleListProps = {
  modules: Module[];
};

export function ModuleList({ modules }: ModuleListProps) {
  const [selectedModules, setSelectedModules] = useState<Set<ModuleId>>(new Set());
  const router = useRouter();

  const handleSelectionChange = (moduleId: ModuleId, isSelected: boolean) => {
    setSelectedModules((prev) => {
      const newSelection = new Set(prev);
      if (isSelected) {
        newSelection.add(moduleId);
      } else {
        newSelection.delete(moduleId);
      }
      return newSelection;
    });
  };

  const totalPrice = modules
    .filter((module) => selectedModules.has(module.id))
    .reduce((sum, module) => sum + module.price, 0);

  const handleUnlock = () => {
    if (selectedModules.size === 0) return;
    const moduleIds = Array.from(selectedModules).join(',');
    router.push(`/payment?modules=${moduleIds}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isSelected={selectedModules.has(module.id)}
            onSelectionChange={handleSelectionChange}
          />
        ))}
      </div>

      {selectedModules.size > 0 && (
        <div className="sticky bottom-0 mt-12 py-4 bg-background/80 backdrop-blur-lg">
          <Card className="max-w-3xl mx-auto shadow-2xl">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-lg font-bold">
                    {formatPrice(totalPrice)}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedModules.size} module{selectedModules.size > 1 ? 's' : ''} selected
                  </p>
                </div>
              </div>
              <Button size="lg" onClick={handleUnlock}>
                Unlock Modules <ArrowRight />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
