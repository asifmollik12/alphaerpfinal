'use client';

import Link from 'next/link';
import {
  PanelLeft,
  Search,
  LayoutGrid,
  Briefcase,
  Users,
  Receipt,
  FileText,
  BarChart,
  Mail,
  UserCog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { EditProfileDialog } from '../profile/EditProfileDialog';
import { useState, useEffect } from 'react';
import { Logo } from '../Logo';

const navItems = [
    { href: "/dashboard/visa", icon: LayoutGrid, label: "Dashboard" },
    { href: "/dashboard/visa/agents", icon: Briefcase, label: "Agents" },
    { href: "/dashboard/visa/clients", icon: Users, label: "Clients" },
    { href: "/dashboard/visa/hrm", icon: UserCog, label: "HRM" },
    { href: "/dashboard/visa/mail", icon: Mail, label: "Mail" },
    { href: "#", icon: Receipt, label: "Expense" },
    { href: "#", icon: FileText, label: "Applications" },
    { href: "#", icon: BarChart, label: "Reports" },
];


export function Header() {
    const [userName, setUserName] = useState('John Doe');
    const [userAvatar, setUserAvatar] = useState('https://picsum.photos/seed/user/100/100');

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        const storedAvatar = localStorage.getItem('userAvatar');
        if (storedName) {
            setUserName(storedName);
        }
        if (storedAvatar) {
            setUserAvatar(storedAvatar);
        }
    }, []);

    const handleUpdateProfile = (newName: string, newAvatar?: string) => {
        setUserName(newName);
        localStorage.setItem('userName', newName);
        if (newAvatar) {
          setUserAvatar(newAvatar);
          localStorage.setItem('userAvatar', newAvatar);
        }
    };
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/modules"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Logo />
            </Link>
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search clients, applications..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
           <EditProfileDialog 
                currentName={userName} 
                currentAvatar={userAvatar}
                onUpdate={handleUpdateProfile}
            />
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
