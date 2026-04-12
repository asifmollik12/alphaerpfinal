'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserCog } from 'lucide-react';

export default function HRMPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-6 w-6" />
          HRM Dashboard
        </CardTitle>
        <CardDescription>
          This is the dashboard for Human Resources Management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center py-16">
          <UserCog className="h-24 w-24 text-primary opacity-50 mb-6" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome to the HRM Module
          </h2>
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
            Manage your employees, payroll, and other HR tasks from here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
