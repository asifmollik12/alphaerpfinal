'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { Module, ModuleId } from '@/lib/modules';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type ModuleCardProps = {
  module: Module;
  isSelected: boolean;
  onSelectionChange: (id: ModuleId, selected: boolean) => void;
};

export function ModuleCard({ module, isSelected, onSelectionChange }: ModuleCardProps) {
  const { id, name, description, price, Icon } = module;
  const uniqueId = `module-${id}`;

  return (
    <Card
      className={cn(
        'transition-all duration-300 relative overflow-hidden group',
        'hover:shadow-xl hover:-translate-y-1',
        isSelected ? 'ring-2 ring-primary' : 'bg-secondary/30',
        'dark:hover:bg-card-hover/10',
        'hover:bg-card-hover'
      )}
    >
      <div className="relative p-6">
        <div className="flex flex-row items-start justify-between pb-4">
          <div className="flex items-center gap-4">
            <div className="bg-secondary/50 p-3 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold">{name}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor={uniqueId} className="cursor-pointer text-sm font-medium">
              {isSelected ? 'Enabled' : 'Enable'}
            </Label>
            <Switch
              id={uniqueId}
              checked={isSelected}
              onCheckedChange={(checked) => onSelectionChange(id, checked)}
              aria-label={`Select ${name} module`}
            />
          </div>
        </div>

        <CardDescription className="min-h-[40px]">{description}</CardDescription>
        <p className="mt-4 text-2xl font-bold">
          {price > 0 ? (
            <>
              {formatPrice(price)}
              <span className="text-sm font-normal text-muted-foreground">/month</span>
            </>
          ) : (
            'Free'
          )}
        </p>
      </div>
      <Badge
        variant="default"
        className="absolute bottom-4 right-4"
      >
        Free
      </Badge>
    </Card>
  );
}
