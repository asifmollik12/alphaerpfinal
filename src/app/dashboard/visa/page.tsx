'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import {
  Activity,
  Users,
  CheckCircle,
  Clock,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell } from 'recharts';

const applications = [
  {
    client: 'Jane Smith',
    avatar: 'https://picsum.photos/seed/1/40/40',
    visaType: 'Tourist Visa',
    status: 'In Progress',
    lastUpdate: '2024-03-01',
    statusVariant: 'secondary',
  },
  {
    client: 'Hannah Wilson',
    avatar: 'https://picsum.photos/seed/2/40/40',
    visaType: 'Tourist Visa',
    status: 'New',
    lastUpdate: '2024-02-18',
    statusVariant: 'default',
  },
  {
    client: 'Diana Miller',
    avatar: 'https://picsum.photos/seed/3/40/40',
    visaType: 'Permanent Resident',
    status: 'New',
    lastUpdate: '2024-02-12',
    statusVariant: 'default',
  },
  {
    client: 'Ian Martinez',
    avatar: 'https://picsum.photos/seed/4/40/40',
    visaType: 'Student Visa',
    status: 'Submitted',
    lastUpdate: '2024-02-01',
    statusVariant: 'outline',
  },
  {
    client: 'George Rodriguez',
    avatar: 'https://picsum.photos/seed/5/40/40',
    visaType: 'Work Permit',
    status: 'In Progress',
    lastUpdate: '2024-01-22',
    statusVariant: 'secondary',
  },
];

const chartData = [
  { status: 'New', value: 2, fill: 'hsl(var(--chart-1))' },
  { status: 'In Progress', value: 2, fill: 'hsl(var(--chart-2))' },
  { status: 'Submitted', value: 1, fill: 'hsl(var(--chart-3))' },
  { status: 'Approved', value: 3, fill: 'hsl(var(--chart-4))' },
  { status: 'Rejected', value: 1, fill: 'hsl(var(--chart-5))' },
];

const chartConfig = {
  value: {
    label: 'Applications',
  },
  new: {
    label: 'New',
    color: 'hsl(var(--chart-1))',
  },
  'in-progress': {
    label: 'In Progress',
    color: 'hsl(var(--chart-2))',
  },
  submitted: {
    label: 'Submitted',
    color: 'hsl(var(--chart-3))',
  },
  approved: {
    label: 'Approved',
    color: 'hsl(var(--chart-4))',
  },
  rejected: {
    label: 'Rejected',
    color: 'hsl(var(--chart-5))',
  },
};

export default function VisaDashboardPage() {
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">0 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Applications in Progress
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Currently active applications
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67%</div>
              <p className="text-xs text-muted-foreground">
                Based on all completed applications
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Processing Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45 days</div>
              <p className="text-xs text-muted-foreground">
                For all completed applications
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              An overview of the most recent visa applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Visa Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Last Update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={app.avatar} alt={app.client} />
                          <AvatarFallback>
                            {app.client.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{app.client}</span>
                      </div>
                    </TableCell>
                    <TableCell>{app.visaType}</TableCell>
                    <TableCell>
                      <Badge variant={app.statusVariant as any}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {app.lastUpdate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Application Statuses</CardTitle>
            <CardDescription>
              Breakdown of all current application statuses.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="status"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fill}
                      className="focus:outline-none"
                    />
                  ))}
                </Pie>
                <ChartLegend
                  content={<ChartLegendContent nameKey="status" />}
                  className="-mt-4 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}