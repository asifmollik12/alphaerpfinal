
import type { LucideIcon } from 'lucide-react';
import { Users, Briefcase, WalletCards, Receipt, Store, BookOpen, Home, Factory } from 'lucide-react';

export type ModuleId = 'hrm' | 'crm' | 'visa' | 'expense' | 'pos' | 'lms' | 'real-estate' | 'manufacturing';

export type Module = {
  id: ModuleId;
  name: string;
  description: string;
  price: number;
  Icon: LucideIcon;
};

export const modules: Module[] = [
  { id: 'hrm', name: 'HRM', description: 'Human Resources Management', price: 2.5, Icon: Users },
  { id: 'crm', name: 'CRM', description: 'Customer Relationship Management', price: 2.5, Icon: Briefcase },
  { id: 'visa', name: 'Visa Process', description: 'Streamline employee visa processes', price: 5, Icon: WalletCards },
  { id: 'expense', name: 'Expense', description: 'Track and manage company expenses', price: 2.5, Icon: Receipt },
  { id: 'pos', name: 'POS', description: 'Point of Sale for retail operations', price: 3, Icon: Store },
  { id: 'lms', name: 'LMS', description: 'Learning Management System', price: 2.5, Icon: BookOpen },
  { id: 'real-estate', name: 'Real Estate', description: 'Manage real estate properties', price: 4.5, Icon: Home },
  { id: 'manufacturing', name: 'Manufacturing', description: 'Streamline and manage manufacturing processes', price: 5.5, Icon: Factory },
];

export const modulesById = modules.reduce((acc, module) => {
  acc[module.id] = module;
  return acc;
}, {} as Record<ModuleId, Module>);
