import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock } from 'lucide-react';

export default function UpcomingEvents() {
  const { user } = useAuth();

  const getEventsForRole = () => {
    if (user?.role === 'owner') {
      return [
        {
          id: '1',
          title: 'Annual General Assembly',
          date: '2024-12-15',
          time: '19:00',
          type: 'meeting',
          location: 'Building A - Conference Room'
        },
        {
          id: '2',
          title: 'Elevator Maintenance',
          date: '2024-12-05',
          time: '09:00',
          type: 'maintenance',
          location: 'Building B - Elevator'
        },
        {
          id: '3',
          title: 'Security System Update',
          date: '2024-12-08',
          time: '14:00',
          type: 'maintenance',
          location: 'All Buildings'
        }
      ];
    }

    if (user?.role === 'agent') {
      return [
        {
          id: '1',
          title: 'Board Meeting Preparation',
          date: '2024-12-03',
          time: '16:00',
          type: 'meeting',
          location: 'Office'
        },
        {
          id: '2',
          title: 'Quarterly Financial Review',
          date: '2024-12-10',
          time: '10:00',
          type: 'meeting',
          location: 'Conference Room'
        },
        {
          id: '3',
          title: 'Unit Inspection - 7A',
          date: '2024-12-07',
          time: '15:30',
          type: 'inspection',
          location: 'Unit 7A'
        }
      ];
    }

    if (user?.role === 'supervisor') {
      return [
        {
          id: '1',
          title: 'Agent Performance Review',
          date: '2024-12-04',
          time: '11:00',
          type: 'review',
          location: 'Head Office'
        },
        {
          id: '2',
          title: 'Property Management Conference',
          date: '2024-12-12',
          time: '09:00',
          type: 'conference',
          location: 'Convention Center'
        },
        {
          id: '3',
          title: 'New Residence Setup',
          date: '2024-12-18',
          time: '14:00',
          type: 'setup',
          location: 'Sunset Gardens'
        }
      ];
    }

    return [];
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'meeting':
        return <Badge className="bg-primary/10 text-primary">Meeting</Badge>;
      case 'maintenance':
        return <Badge className="bg-warning/10 text-warning">Maintenance</Badge>;
      case 'inspection':
        return <Badge className="bg-success/10 text-success">Inspection</Badge>;
      case 'review':
        return <Badge className="bg-error/10 text-error">Review</Badge>;
      case 'conference':
        return <Badge className="bg-purple-100 text-purple-700">Conference</Badge>;
      case 'setup':
        return <Badge className="bg-blue-100 text-blue-700">Setup</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-600">Event</Badge>;
    }
  };

  const events = getEventsForRole();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Upcoming Events</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{event.title}</h4>
                {getTypeBadge(event.type)}
              </div>
              <div className="space-y-1 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="text-gray-600">
                  📍 {event.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}