
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowUpDown,
  MoreHorizontal,
  PlusCircle,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';

const clients = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'https://picsum.photos/seed/client1/40/40',
      passportNo: 'A12345678',
      visaType: 'Work Permit',
      country: 'USA',
      status: 'Approved',
      appliedDate: '2023-10-15',
    },
    {
      name: 'Bob Williams',
      email: 'bob@example.com',
      avatar: 'https://picsum.photos/seed/client2/40/40',
      passportNo: 'B87654321',
      visaType: 'Student Visa',
      country: 'UK',
      status: 'In Progress',
      appliedDate: '2023-11-20',
    },
    {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      avatar: 'https://picsum.photos/seed/client3/40/40',
      passportNo: 'C55555555',
      visaType: 'Tourist Visa',
      country: 'Canada',
      status: 'Submitted',
      appliedDate: '2024-01-05',
    },
    {
      name: 'Diana Miller',
      email: 'diana@example.com',
      avatar: 'https://picsum.photos/seed/client4/40/40',
      passportNo: 'D44444444',
      visaType: 'Permanent Resident',
      country: 'Australia',
      status: 'New',
      appliedDate: '2024-02-12',
    },
    {
        name: 'Ethan Davis',
        email: 'ethan@example.com',
        avatar: 'https://picsum.photos/seed/client5/40/40',
        passportNo: 'E33333333',
        visaType: 'Work Permit',
        country: 'Germany',
        status: 'Rejected',
        appliedDate: '2023-09-30',
    },
    {
        name: 'Fiona Garcia',
        email: 'fiona@example.com',
        avatar: 'https://picsum.photos/seed/client6/40/40',
        passportNo: 'F22222222',
        visaType: 'Student Visa',
        country: 'USA',
        status: 'Approved',
        appliedDate: '2023-12-01',
    },
    {
        name: 'George Rodriguez',
        email: 'george@example.com',
        avatar: 'https://picsum.photos/seed/client7/40/40',
        passportNo: 'G11111111',
        visaType: 'Work Permit',
        country: 'Canada',
        status: 'In Progress',
        appliedDate: '2024-01-22',
    },
    {
        name: 'Hannah Wilson',
        email: 'hannah@example.com',
        avatar: 'https://picsum.photos/seed/client8/40/40',
        passportNo: 'H99999999',
        visaType: 'Tourist Visa',
        country: 'UK',
        status: 'New',
        appliedDate: '2024-02-18',
    },
    {
        name: 'Ian Martinez',
        email: 'ian@example.com',
        avatar: 'https://picsum.photos/seed/client9/40/40',
        passportNo: 'I88888888',
        visaType: 'Student Visa',
        country: 'Australia',
        status: 'Submitted',
        appliedDate: '2024-02-01',
    }
];

const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'default';
      case 'in progress':
        return 'secondary';
      case 'submitted':
        return 'outline';
      case 'rejected':
        return 'destructive';
      case 'new':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  

export default function ClientManagementPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Management</CardTitle>
        <CardDescription>
          View, search, and manage all your clients in one place.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter by client name..."
              className="max-w-sm"
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Client
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">
                  <Checkbox />
                </TableHead>
                <TableHead>
                  <Button variant="ghost" className="pl-0">
                    Client
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Passport No.</TableHead>
                <TableHead>Visa Type</TableHead>
                <TableHead>
                    <Button variant="ghost" className="pl-0">
                        Country
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback>
                          {client.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {client.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{client.passportNo}</TableCell>
                  <TableCell>{client.visaType}</TableCell>
                  <TableCell>{client.country}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(client.status) as any}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.appliedDate}</TableCell>
                  <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          0 of 9 row(s) selected.
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
