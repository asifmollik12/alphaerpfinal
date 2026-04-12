'use client';

import Link from 'next/link';
import {
  LayoutGrid,
  Users,
  Briefcase,
  FileText,
  BarChart,
  Receipt,
  Mail,
  UserCog,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useState, useEffect } from 'react';
import { Logo } from '../Logo';

const navItems = [
    { href: "/dashboard?modules=visa", icon: LayoutGrid, label: "Dashboard" },
    { href: "/dashboard/visa/agents", icon: Briefcase, label: "Agents" },
    { href: "/dashboard/visa/clients", icon: Users, label: "Clients" },
    { href: "/dashboard/visa/hrm", icon: UserCog, label: "HRM" },
    { href: "/dashboard/visa/mail", icon: Mail, label: "Mail" },
    { href: "#", icon: Receipt, label: "Expense" },
    { href: "#", icon: FileText, label: "Applications" },
    { href: "#", icon: BarChart, label: "Reports" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState('John Doe');
  const [userEmail, setUserEmail] = useState('john.doe@example.com');
  const [userAvatar, setUserAvatar] = useState('https://picsum.photos/seed/user/100/100');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedAvatar = localStorage.getItem('userAvatar');
    if (storedName) {
      setUserName(storedName);
      setUserEmail(`${storedName.toLowerCase().replace(' ', '.')}@example.com`);
    }
    if (storedAvatar) {
      setUserAvatar(storedAvatar);
    }
  }, []);
  
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex flex-col gap-2 flex-grow">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/modules" className="flex items-center gap-2 font-semibold">
                    <Logo />
                </Link>
            </div>
            <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  pathname === item.href
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-sm">{userName}</p>
                    <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
            </div>
        </div>
    </aside>
  );
}
