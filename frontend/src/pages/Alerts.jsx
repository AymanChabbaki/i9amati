import { AlertTriangle, CheckCircle, Info, XCircle, Bell, Filter } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Alerts() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const mockAlerts = [
    {
      id: '1',
      title: 'Elevator Maintenance Required',
      message: 'Elevator B needs scheduled maintenance. Service appointment required within 48 hours.',
      category: 'maintenance',
      priority: 'high',
      timestamp: '2024-12-01 09:30',
      isRead: false,
      actionRequired: true
    },
    {
      id: '2',
      title: 'Overdue Payment Alert',
      message: 'Unit 3B has overdue maintenance fees. Follow-up required.',
      category: 'financial',
      priority: 'medium',
      timestamp: '2024-12-01 08:15',
      isRead: false,
      actionRequired: true
    },
    {
      id: '3',
      title: 'Security System Update',
      message: 'Security camera firmware update completed successfully.',
      category: 'security',
      priority: 'low',
      timestamp: '2024-11-30 22:45',
      isRead: true,
      actionRequired: false
    },
    {
      id: '4',
      title: 'Meeting Reminder',
      message: 'Annual General Assembly scheduled for December 15th at 7:00 PM.',
      category: 'administrative',
      priority: 'medium',
      timestamp: '2024-11-30 16:00',
      isRead: true,
      actionRequired: false
    },
    {
      id: '5',
      title: 'Water System Emergency',
      message: 'Main water valve failure detected. Emergency repair initiated.',
      category: 'emergency',
      priority: 'critical',
      timestamp: '2024-11-29 14:30',
      isRead: true,
      actionRequired: false
    }
  ];

  const getAlertIcon = (category, priority) => {
    if (priority === 'critical') {
      return <XCircle className="h-5 w-5 text-error" />;
    }
    switch (category) {
      case 'emergency':
        return <AlertTriangle className="h-5 w-5 text-error" />;
      case 'maintenance':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'financial':
        return <Info className="h-5 w-5 text-primary" />;
      case 'security':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'administrative':
        return <Bell className="h-5 w-5 text-gray-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-error/10 text-error">Critical</Badge>;
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

  const filteredAlerts = mockAlerts.filter(alert => {
    if (filter !== 'all' && alert.category !== filter) return false;
    if (priorityFilter !== 'all' && alert.priority !== priorityFilter) return false;
    return true;
  });

  const unreadCount = mockAlerts.filter(alert => !alert.isRead).length;
  const actionRequiredCount = mockAlerts.filter(alert => alert.actionRequired).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h1>
          <p className="mt-1 text-sm text-gray-600">Manage system alerts and notifications by category.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="administrative">Administrative</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{mockAlerts.length}</p>
              </div>
              <Bell className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-warning">{unreadCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Action Required</p>
                <p className="text-2xl font-bold text-error">{actionRequiredCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-error" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-success">7</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`border border-gray-200 rounded-lg p-4 ${
                  !alert.isRead ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getAlertIcon(alert.category, alert.priority)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-lg font-medium ${
                          !alert.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {alert.title}
                        </h3>
                        {getPriorityBadge(alert.priority)}
                        {alert.actionRequired && (
                          <Badge className="bg-warning/10 text-warning">Action Required</Badge>
                        )}
                        {!alert.isRead && (
                          <Badge className="bg-primary/10 text-primary">New</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="capitalize">{alert.category}</span>
                        <span>•</span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {!alert.isRead && (
                      <Button variant="outline" size="sm">
                        Mark as Read
                      </Button>
                    )}
                    {alert.actionRequired && (
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Take Action
                      </Button>
                    )}
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
    </div>
  );
}