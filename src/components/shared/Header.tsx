'use client';

import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { ThemeToggleButton } from '../ThemeToggleButton';
import { EditProfileDialog } from '@/components/profile/EditProfileDialog';
import { useState, useEffect } from 'react';

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
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/modules">
          <Logo />
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggleButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="cursor-pointer h-8 w-8">
                  <AvatarImage src={userAvatar} alt="User" />
                  <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{userName}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <EditProfileDialog 
                    currentName={userName} 
                    currentAvatar={userAvatar}
                    onUpdate={handleUpdateProfile}
                />
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
