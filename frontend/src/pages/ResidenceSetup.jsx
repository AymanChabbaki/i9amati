import { Building, User, Settings, MapPin, Users, Save } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function ResidenceSetup() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedResidence, setSelectedResidence] = useState('1');
  const [editMode, setEditMode] = useState(false);

  const mockResidences = [
    {
      id: '1',
      name: 'Oceanview Residences',
      address: '123 Coastal Drive, Marina District',
      totalUnits: 124,
      occupiedUnits: 118,
      agent: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1-555-0123',
        since: '2020-03-15'
      },
      facilities: ['Swimming Pool', 'Gym', 'Parking Garage', 'Garden', 'Security System'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Palm Gardens Complex',
      address: '456 Garden Avenue, Green Valley',
      totalUnits: 98,
      occupiedUnits: 92,
      agent: {
        name: 'Ahmed Benali',
        email: 'ahmed.benali@email.com',
        phone: '+1-555-0124',
        since: '2021-07-20'
      },
      facilities: ['Tennis Court', 'Parking Garage', 'Playground', 'Security System'],
      status: 'active'
    },
    {
      id: '3',
      name: 'City Heights Towers',
      address: '789 Downtown Boulevard, City Center',
      totalUnits: 156,
      occupiedUnits: 149,
      agent: {
        name: 'Marie Dubois',
        email: 'marie.dubois@email.com',
        phone: '+1-555-0125',
        since: '2019-01-10'
      },
      facilities: ['Gym', 'Parking Garage', 'Rooftop Terrace', 'Concierge', 'Security System'],
      status: 'active'
    }
  ];

  const [residenceData, setResidenceData] = useState(
    mockResidences.find(r => r.id === selectedResidence) || mockResidences[0]
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/10 text-success">Active</Badge>;
      case 'maintenance':
        return <Badge className="bg-warning/10 text-warning">Maintenance</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-600">Inactive</Badge>;
      default:
        return null;
    }
  };

  const handleSave = () => {
    toast({
      title: "Changes Saved",
      description: "Residence information has been updated successfully.",
    });
    setEditMode(false);
  };

  const handleResidenceChange = (residenceId) => {
    setSelectedResidence(residenceId);
    const residence = mockResidences.find(r => r.id === residenceId);
    if (residence) {
      setResidenceData(residence);
    }
    setEditMode(false);
  };

  const totalUnits = mockResidences.reduce((sum, r) => sum + r.totalUnits, 0);
  const totalOccupied = mockResidences.reduce((sum, r) => sum + r.occupiedUnits, 0);
  const occupancyRate = ((totalOccupied / totalUnits) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Residence Setup</h1>
          <p className="mt-1 text-sm text-gray-600">Edit residence information and assign agents to properties.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedResidence} onValueChange={handleResidenceChange}>
            <SelectTrigger className="w-64">
              <Building className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockResidences.map(residence => (
                <SelectItem key={residence.id} value={residence.id}>
                  {residence.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            variant={editMode ? "default" : "outline"} 
            onClick={() => setEditMode(!editMode)}
          >
            <Settings className="mr-2 h-4 w-4" />
            {editMode ? 'Cancel Edit' : 'Edit Info'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Residences</p>
                <p className="text-2xl font-bold text-gray-900">{mockResidences.length}</p>
              </div>
              <Building className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Units</p>
                <p className="text-2xl font-bold text-gray-900">{totalUnits}</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupied Units</p>
                <p className="text-2xl font-bold text-gray-900">{totalOccupied}</p>
              </div>
              <User className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold text-gray-900">{occupancyRate}%</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium">%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Residence Information</TabsTrigger>
          <TabsTrigger value="agent">Agent Assignment</TabsTrigger>
          <TabsTrigger value="facilities">Facilities & Services</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Residence Details</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Basic information about the selected residence</p>
              </div>
              {getStatusBadge(residenceData.status)}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Residence Name</Label>
                    <Input
                      id="name"
                      value={residenceData.name}
                      onChange={(e) => setResidenceData({...residenceData, name: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={residenceData.address}
                      onChange={(e) => setResidenceData({...residenceData, address: e.target.value})}
                      disabled={!editMode}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={residenceData.status} 
                      onValueChange={(value) => 
                        setResidenceData({...residenceData, status: value})
                      }
                      disabled={!editMode}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Under Maintenance</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="totalUnits">Total Units</Label>
                      <Input
                        id="totalUnits"
                        type="number"
                        value={residenceData.totalUnits}
                        onChange={(e) => setResidenceData({...residenceData, totalUnits: parseInt(e.target.value)})}
                        disabled={!editMode}
                      />
                    </div>
                    <div>
                      <Label htmlFor="occupiedUnits">Occupied Units</Label>
                      <Input
                        id="occupiedUnits"
                        type="number"
                        value={residenceData.occupiedUnits}
                        onChange={(e) => setResidenceData({...residenceData, occupiedUnits: parseInt(e.target.value)})}
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Occupancy Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Occupancy Rate:</span>
                        <span className="font-medium">
                          {((residenceData.occupiedUnits / residenceData.totalUnits) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vacant Units:</span>
                        <span className="font-medium">{residenceData.totalUnits - residenceData.occupiedUnits}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ 
                            width: `${(residenceData.occupiedUnits / residenceData.totalUnits) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {editMode && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agent">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Agent</CardTitle>
              <p className="text-sm text-gray-600">Current union agent managing this residence</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="agentName">Agent Name</Label>
                    <Input
                      id="agentName"
                      value={residenceData.agent.name}
                      onChange={(e) => setResidenceData({
                        ...residenceData, 
                        agent: {...residenceData.agent, name: e.target.value}
                      })}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="agentEmail">Email Address</Label>
                    <Input
                      id="agentEmail"
                      type="email"
                      value={residenceData.agent.email}
                      onChange={(e) => setResidenceData({
                        ...residenceData, 
                        agent: {...residenceData.agent, email: e.target.value}
                      })}
                      disabled={!editMode}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="agentPhone">Phone Number</Label>
                    <Input
                      id="agentPhone"
                      value={residenceData.agent.phone}
                      onChange={(e) => setResidenceData({
                        ...residenceData, 
                        agent: {...residenceData.agent, phone: e.target.value}
                      })}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="agentSince">Agent Since</Label>
                    <Input
                      id="agentSince"
                      type="date"
                      value={residenceData.agent.since}
                      onChange={(e) => setResidenceData({
                        ...residenceData, 
                        agent: {...residenceData.agent, since: e.target.value}
                      })}
                      disabled={!editMode}
                    />
                  </div>
                </div>
              </div>
              {editMode && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                    <Save className="mr-2 h-4 w-4" />
                    Update Agent Info
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities">
          <Card>
            <CardHeader>
              <CardTitle>Facilities & Services</CardTitle>
              <p className="text-sm text-gray-600">Available amenities and services at this residence</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {residenceData.facilities.map((facility, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900">{facility}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Add New Facility</h4>
                <div className="flex space-x-2">
                  <Input placeholder="Enter facility name" disabled={!editMode} />
                  <Button variant="outline" disabled={!editMode}>Add</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}