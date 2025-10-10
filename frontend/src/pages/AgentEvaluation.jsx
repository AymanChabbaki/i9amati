import { TrendingUp, TrendingDown, Star, Users, Calendar, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AgentEvaluation() {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedAgent, setSelectedAgent] = useState('all');

  const mockAgents = [
    {
      id: '1',
      name: 'Sarah Johnson',
      residence: 'Oceanview Residences',
      experience: '8 years',
      rating: 4.7,
      performance: {
        financialManagement: 92,
        communicationSkills: 88,
        problemSolving: 85,
        efficiency: 90
      },
      stats: {
        unitsManaged: 124,
        collectionRate: 96,
        complaintResolution: 89,
        tenantSatisfaction: 91
      },
      recentActivities: [
        { date: '2024-12-01', activity: 'Monthly financial report submitted', status: 'completed' },
        { date: '2024-11-30', activity: 'Resolved elevator maintenance issue', status: 'completed' },
        { date: '2024-11-29', activity: 'Annual budget review meeting', status: 'pending' }
      ]
    },
    {
      id: '2',
      name: 'Ahmed Benali',
      residence: 'Palm Gardens Complex',
      experience: '5 years',
      rating: 4.3,
      performance: {
        financialManagement: 87,
        communicationSkills: 92,
        problemSolving: 88,
        efficiency: 85
      },
      stats: {
        unitsManaged: 98,
        collectionRate: 93,
        complaintResolution: 94,
        tenantSatisfaction: 89
      },
      recentActivities: [
        { date: '2024-12-01', activity: 'Security system upgrade coordination', status: 'completed' },
        { date: '2024-11-28', activity: 'Resident meeting organization', status: 'completed' },
        { date: '2024-11-25', activity: 'Quarterly maintenance review', status: 'overdue' }
      ]
    },
    {
      id: '3',
      name: 'Marie Dubois',
      residence: 'City Heights Towers',
      experience: '12 years',
      rating: 4.9,
      performance: {
        financialManagement: 95,
        communicationSkills: 90,
        problemSolving: 93,
        efficiency: 94
      },
      stats: {
        unitsManaged: 156,
        collectionRate: 98,
        complaintResolution: 96,
        tenantSatisfaction: 95
      },
      recentActivities: [
        { date: '2024-12-01', activity: 'Budget approval and distribution', status: 'completed' },
        { date: '2024-11-30', activity: 'Emergency repair coordination', status: 'completed' },
        { date: '2024-11-29', activity: 'Insurance claim processing', status: 'completed' }
      ]
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/10 text-success">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-error/10 text-error">Overdue</Badge>;
      default:
        return null;
    }
  };

  const getRatingStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const averageRating = mockAgents.reduce((sum, agent) => sum + agent.rating, 0) / mockAgents.length;
  const totalUnits = mockAgents.reduce((sum, agent) => sum + agent.stats.unitsManaged, 0);
  const averageCollectionRate = mockAgents.reduce((sum, agent) => sum + agent.stats.collectionRate, 0) / mockAgents.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Evaluation</h1>
          <p className="mt-1 text-sm text-gray-600">Monitor agent performance with charts and comparison tables.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              {mockAgents.map(agent => (
                <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900">{mockAgents.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Units Managed</p>
                <p className="text-2xl font-bold text-gray-900">{totalUnits}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                <p className="text-2xl font-bold text-gray-900">{averageCollectionRate.toFixed(1)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="comparison">Agent Comparison</TabsTrigger>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockAgents.map((agent) => (
              <Card key={agent.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <p className="text-sm text-gray-600">{agent.residence}</p>
                    </div>
                    {getRatingStars(agent.rating)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Experience</p>
                        <p className="font-medium">{agent.experience}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Units Managed</p>
                        <p className="font-medium">{agent.stats.unitsManaged}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Performance Metrics</h4>
                      {Object.entries(agent.performance).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium">{value}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Collection Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Complaint Resolution
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tenant Satisfaction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Units Managed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockAgents.map((agent) => (
                      <tr key={agent.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                            <div className="text-sm text-gray-500">{agent.residence}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRatingStars(agent.rating)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {agent.stats.collectionRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {agent.stats.complaintResolution}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {agent.stats.tenantSatisfaction}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {agent.stats.unitsManaged}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities">
          <div className="space-y-6">
            {mockAgents.map((agent) => (
              <Card key={agent.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{agent.name} - Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {agent.recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                        {getStatusBadge(activity.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}