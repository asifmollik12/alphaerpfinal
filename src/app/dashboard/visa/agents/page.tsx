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

const agents = [
  {
    name: 'Agent Smith',
    email: 'agent.smith@example.com',
    avatar: 'https://picsum.photos/seed/agent1/40/40',
    passportNo: 'N/A',
    visaSpecialization: 'Work Permit',
    country: 'USA',
    totalFiles: 10,
    commissionDue: 500,
    commissionPaid: 2000,
  },
  {
    name: 'Agent Jones',
    email: 'agent.jones@example.com',
    avatar: 'https://picsum.photos/seed/agent2/40/40',
    passportNo: 'N/A',
    visaSpecialization: 'Student Visa',
    country: 'UK',
    totalFiles: 8,
    commissionDue: 1000,
    commissionPaid: 1500,
  },
  {
    name: 'Agent Brown',
    email: 'agent.brown@example.com',
    avatar: 'https://picsum.photos/seed/agent3/40/40',
    passportNo: 'N/A',
    visaSpecialization: 'Tourist Visa',
    country: 'Canada',
    totalFiles: 15,
    commissionDue: 0,
    commissionPaid: 3000,
  },
  {
    name: 'Agent White',
    email: 'agent.white@example.com',
    avatar: 'https://picsum.photos/seed/agent4/40/40',
    passportNo: 'N/A',
    visaSpecialization: 'Permanent Resident',
    country: 'Australia',
    totalFiles: 12,
    commissionDue: 200,
    commissionPaid: 2500,
  },
  {
    name: 'Agent Green',
    email: 'agent.green@example.com',
    avatar: 'https://picsum.photos/seed/agent5/40/40',
    passportNo: 'N/A',
    visaSpecialization: 'Work Permit',
    country: 'Germany',
    totalFiles: 5,
    commissionDue: 1500,
    commissionPaid: 1000,
  },
];

export default function AgentManagementPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Management</CardTitle>
        <CardDescription>
          View, search, and manage all your agents in one place.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter by agent name..."
              className="max-w-sm"
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Agent
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
                    Agent
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Passport No.</TableHead>
                <TableHead>Visa Specialization</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Total Files</TableHead>
                <TableHead>Commission Due</TableHead>
                <TableHead>Commission Paid</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={agent.avatar} alt={agent.name} />
                        <AvatarFallback>
                          {agent.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {agent.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{agent.passportNo}</TableCell>
                  <TableCell>{agent.visaSpecialization}</TableCell>
                  <TableCell>{agent.country}</TableCell>
                  <TableCell>{agent.totalFiles}</TableCell>
                  <TableCell className={agent.commissionDue > 0 ? 'text-red-500' : ''}>
                    {`$${agent.commissionDue.toFixed(2)}`}
                  </TableCell>
                  <TableCell className="text-green-500">
                    {`$${agent.commissionPaid.toFixed(2)}`}
                  </TableCell>
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
          0 of 5 row(s) selected.
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
