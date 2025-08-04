import { Wrench, Calendar, CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function Services() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockServices = [
    {
      id: '1',
      type: 'cleaning',
      title: 'Weekly Common Area Cleaning',
      description: 'Deep cleaning of lobby, hallways, and elevator areas',
      priority: 'medium',
      status: 'scheduled',
      assignedTo: 'CleanPro Services',
      requestedDate: '2024-12-02',
      estimatedCost: 450,
      location: 'Common Areas - All Floors'
    },
    {
      id: '2',
      type: 'gardening',
      title: 'Landscape Maintenance',
      description: 'Trim hedges, water plants, and general garden upkeep',
      priority: 'low',
      status: 'completed',
      assignedTo: 'Green Thumb Landscaping',
      requestedDate: '2024-11-28',
      completedDate: '2024-11-30',
      estimatedCost: 320,
      actualCost: 295,
      location: 'Building Entrance & Garden Area'
    },
    {
      id: '3',
      type: 'security',
      title: 'Security Camera Installation',
      description: 'Install 4 new security cameras in parking garage',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'SecureWatch Systems',
      requestedDate: '2024-11-25',
      estimatedCost: 1200,
      location: 'Parking Garage - Level B1'
    },
    {
      id: '4',
      type: 'maintenance',
      title: 'HVAC System Inspection',
      description: 'Quarterly inspection and maintenance of HVAC systems',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Climate Control Experts',
      requestedDate: '2024-12-05',
      estimatedCost: 680,
      location: 'Rooftop - HVAC Units'
    },
    {
      id: '5',
      type: 'repair',
      title: 'Elevator Emergency Repair',
      description: 'Fix malfunctioning emergency button in Elevator B',
      priority: 'urgent',
      status: 'completed',
      assignedTo: 'Vertical Transport Solutions',
      requestedDate: '2024-11-27',
      completedDate: '2024-11-27',
      estimatedCost: 850,
      actualCost: 850,
      location: 'Elevator B'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-gray-100 text-gray-600">Pending</Badge>;
      case 'scheduled':
        return <Badge className="bg-primary/10 text-primary">Scheduled</Badge>;
      case 'in-progress':
        return <Badge className="bg-warning/10 text-warning">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-success/10 text-success">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-error/10 text-error">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-error/10 text-error">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-warning/10 text-warning">High</Badge>;
      case 'medium':
        return <Badge className="bg-primary/10 text-primary">Medium</Badge>;
      case 'low':
        return <Badge className="bg-gray-100 text-gray-600">Low</Badge>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'cleaning':
        return '🧽';
      case 'gardening':
        return '🌱';
      case 'security':
        return '🛡️';
      case 'maintenance':
        return '🔧';
      case 'repair':
        return '⚡';
      default:
        return '📋';
    }
  };

  const filteredServices = mockServices.filter(service => {
    if (filterType !== 'all' && service.type !== filterType) return false;
    if (filterStatus !== 'all' && service.status !== filterStatus) return false;
    return true;
  });

  const totalServices = mockServices.length;
  const completedServices = mockServices.filter(s => s.status === 'completed').length;
  const pendingServices = mockServices.filter(s => s.status === 'pending').length;
  const totalCost = mockServices.reduce((sum, s) => sum + (s.actualCost || s.estimatedCost), 0);

  const handleCreateService = () => {
    toast({
      title: "Service Request Created",
      description: "New service request has been submitted successfully.",
    });
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Tracking</h1>
          <p className="mt-1 text-sm text-gray-600">Track cleaning, gardening, security, and maintenance services.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="gardening">Gardening</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="repair">Repair</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                New Service Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Service Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="gardening">Gardening</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="title">Service Title</Label>
                  <Input id="title" placeholder="Enter service title" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the service needed" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cost">Estimated Cost (€)</Label>
                    <Input id="cost" type="number" placeholder="0" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Specify location" />
                </div>
                <Button onClick={handleCreateService} className="w-full">
                  Create Service Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Services</p>
                <p className="text-2xl font-bold text-gray-900">{totalServices}</p>
              </div>
              <Wrench className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-success">{completedServices}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-warning">{pendingServices}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold text-gray-900">€{totalCost.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium">€</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Services</TabsTrigger>
          <TabsTrigger value="history">Service History</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Current Service Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredServices.filter(s => s.status !== 'completed').map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="text-2xl">{getTypeIcon(service.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                            {getStatusBadge(service.status)}
                            {getPriorityBadge(service.priority)}
                          </div>
                          <p className="text-gray-600 mb-3">{service.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                            <div>
                              <span className="font-medium">Assigned to:</span> {service.assignedTo}
                            </div>
                            <div>
                              <span className="font-medium">Location:</span> {service.location}
                            </div>
                            <div>
                              <span className="font-medium">Estimated Cost:</span> €{service.estimatedCost}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-500">
                            <span className="font-medium">Requested:</span> {service.requestedDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Completed Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredServices.filter(s => s.status === 'completed').map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="text-2xl">{getTypeIcon(service.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                            {getStatusBadge(service.status)}
                          </div>
                          <p className="text-gray-600 mb-3">{service.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500">
                            <div>
                              <span className="font-medium">Service Provider:</span> {service.assignedTo}
                            </div>
                            <div>
                              <span className="font-medium">Completed:</span> {service.completedDate}
                            </div>
                            <div>
                              <span className="font-medium">Final Cost:</span> €{service.actualCost}
                            </div>
                            <div>
                              <span className="font-medium">Location:</span> {service.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                        <Button variant="outline" size="sm">
                          Rate Service
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}