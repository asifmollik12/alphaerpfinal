'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';

import { modulesById, type ModuleId, type Module } from '@/lib/modules';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function PaymentForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedModules, setSelectedModules] = useState<Module[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const moduleIds = searchParams.get('modules')?.split(',') as ModuleId[] | undefined;
    if (moduleIds) {
      const modules = moduleIds.map((id) => modulesById[id]).filter(Boolean);
      setSelectedModules(modules);
      const total = modules.reduce((sum, module) => sum + module.price, 0);
      setTotalPrice(total);
    }
  }, [searchParams]);

  const handlePayment = () => {
    startTransition(() => {
        toast({
          title: 'Processing...',
          description: 'Please wait a moment.',
        });
      // Simulate payment processing
      setTimeout(() => {
        toast({
            title: 'Modules Unlocked!',
            description: 'Your modules are unlocked. Welcome to your new dashboard.',
        });
        const moduleIds = selectedModules.map(m => m.id).join(',');
        router.push(`/dashboard?modules=${moduleIds}`);
      }, 2000);
    });
  };

  if (selectedModules.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Modules Selected</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please go back and select some modules to purchase.</p>
        </CardContent>
        <CardFooter>
            <Button onClick={() => router.push('/modules')}>Select Modules</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your selected modules before payment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {selectedModules.map((module) => (
            <li key={module.id} className="flex justify-between items-center">
              <span className="text-foreground">{module.name}</span>
              <span className="font-medium">{formatPrice(module.price)}</span>
            </li>
          ))}
        </ul>
        <Separator />
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total per month</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={handlePayment} disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" />}
          Unlock for Free
        </Button>
      </CardFooter>
    </Card>
  );
}
