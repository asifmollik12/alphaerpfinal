'use client';

import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

type EditProfileDialogProps = {
    currentName: string;
    currentAvatar: string;
    onUpdate: (newName: string, newAvatar?: string) => void;
};

export function EditProfileDialog({ currentName, currentAvatar, onUpdate }: EditProfileDialogProps) {
    const [name, setName] = useState(currentName);
    const [avatar, setAvatar] = useState(currentAvatar);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setAvatar(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSaveChanges = () => {
        onUpdate(name, avatar);
        toast({
            title: "Profile Updated",
            description: "Your changes have been saved successfully.",
        });
    };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit Profile
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar className="h-20 w-20">
                <AvatarImage src={avatar} alt="User avatar" />
                <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow w-full">
                    <Label htmlFor="picture">Profile Picture</Label>
                    <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                    />
                    <Button variant="outline" className="w-full mt-2" onClick={() => fileInputRef.current?.click()}>
                    Change Picture
                    </Button>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">
                Name
                </Label>
                <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleSaveChanges}>
                Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
