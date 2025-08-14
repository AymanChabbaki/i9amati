import { Plus, Calendar, Users, Clock, Vote } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function Meetings() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    agenda: '',
    type: '' // 'normal', 'exceptional', 'specialAccountant'
  });

  const mockMeetings = [
    {
      id: '1',
      title: 'Annual General Assembly',
      date: '2024-12-15',
      time: '19:00',
      location: 'Building A - Conference Room',
      agenda: ['Budget Review', 'Maintenance Updates', 'New Security System', 'Parking Policy'],
      attendees: 45,
      status: 'scheduled',
      votingItems: 3
    },
    {
      id: '2',
      title: 'Emergency Maintenance Meeting',
      date: '2024-12-08',
      time: '18:30',
      location: 'Building B - Lobby',
      agenda: ['Elevator Repairs', 'Heating System Issues', 'Emergency Fund'],
      attendees: 23,
      status: 'completed',
      votingItems: 1
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-primary/10 text-primary">Scheduled</Badge>;
      case 'ongoing':
        return <Badge className="bg-warning/10 text-warning">Ongoing</Badge>;
      case 'completed':
        return <Badge className="bg-success/10 text-success">Completed</Badge>;
      default:
        return null;
    }
  };

  const handleCreateMeeting = () => {
    toast({
      title: "Meeting Created",
      description: "New meeting has been scheduled successfully.",
    });
    setIsCreateOpen(false);
    setNewMeeting({
      title: '',
      date: '',
      time: '',
      location: '',
      agenda: '',
      type: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meeting Manager</h1>
          <p className="mt-1 text-sm text-gray-600">Create and manage community meetings and voting sessions.</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Meeting
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-2xl w-full p-10 rounded-2xl bg-white flex flex-col items-center overflow-y-auto"
            style={{ maxWidth: 700, maxHeight: '85vh', minHeight: 0 }}
          >
            <DialogHeader>
              <DialogTitle>Create New Meeting</DialogTitle>
              <p id="meeting-dialog-desc" className="text-sm text-gray-500 mt-1">Fill in the details and select the meeting type.</p>
            </DialogHeader>
            <div className="space-y-6 w-full" aria-describedby="meeting-dialog-desc">
              <div>
                <Label className="font-semibold text-gray-800">Meeting Type</Label>
                <div className="flex flex-wrap gap-4 mt-3">
                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer hover:bg-primary/10 transition">
                    <input
                      type="radio"
                      name="meetingType"
                      checked={newMeeting.type === 'normal'}
                      onChange={() => setNewMeeting({ ...newMeeting, type: 'normal' })}
                      className="accent-primary"
                    />
                    <span className="text-gray-700">Normal</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer hover:bg-primary/10 transition">
                    <input
                      type="radio"
                      name="meetingType"
                      checked={newMeeting.type === 'exceptional'}
                      onChange={() => setNewMeeting({ ...newMeeting, type: 'exceptional' })}
                      className="accent-primary"
                    />
                    <span className="text-gray-700">Exceptional</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer hover:bg-primary/10 transition">
                    <input
                      type="radio"
                      name="meetingType"
                      checked={newMeeting.type === 'specialAccountant'}
                      onChange={() => setNewMeeting({ ...newMeeting, type: 'specialAccountant' })}
                      className="accent-primary"
                    />
                    <span className="text-gray-700">Special Accountant</span>
                  </label>
                </div>
              </div>
              <div>
                <Label htmlFor="title" className="font-semibold text-gray-800">Meeting Title</Label>
                <Input
                  id="title"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                  placeholder="Enter meeting title"
                  className="mt-2 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="date" className="font-semibold text-gray-800">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                    className="mt-2 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="font-semibold text-gray-800">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                    className="mt-2 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location" className="font-semibold text-gray-800">Location</Label>
                <Input
                  id="location"
                  value={newMeeting.location}
                  onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                  placeholder="Meeting location"
                  className="mt-2 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <div>
                <Label htmlFor="agenda" className="font-semibold text-gray-800">Agenda Items (one per line)</Label>
                <Textarea
                  id="agenda"
                  value={newMeeting.agenda}
                  onChange={(e) => setNewMeeting({ ...newMeeting, agenda: e.target.value })}
                  placeholder="Enter agenda items"
                  rows={4}
                  className="mt-2 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
              <Button onClick={handleCreateMeeting} className="w-full mt-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg shadow">
                Create Meeting
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Meetings</p>
                <p className="text-2xl font-bold text-gray-900">{mockMeetings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockMeetings.filter(m => m.status === 'scheduled').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold text-gray-900">58%</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Voting Items</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockMeetings.reduce((sum, m) => sum + m.votingItems, 0)}
                </p>
              </div>
              <Vote className="h-8 w-8 text-error" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMeetings.map((meeting) => (
              <div key={meeting.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
                      {getStatusBadge(meeting.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{meeting.date} at {meeting.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{meeting.attendees} attendees</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Vote className="h-4 w-4" />
                        <span>{meeting.votingItems} voting items</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{meeting.location}</p>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Agenda:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {meeting.agenda.map((item, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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
    </div>
  );
}