import { AlertTriangle, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockComplaints } from '../data/mockData';

export default function Complaints() {
  const { t } = useLanguage();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <Badge variant="destructive">Open</Badge>;
      case 'in-progress':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Resolved</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('nav.complaints')}</h1>
          <p className="mt-1 text-sm text-gray-600">Submit and track your maintenance requests and complaints.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          {t('actions.submitComplaint')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Complaints</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockComplaints.filter(c => c.status === 'open').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-error" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockComplaints.filter(c => c.status === 'in-progress').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                <span className="text-warning font-medium">⏳</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockComplaints.filter(c => c.status === 'resolved').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <span className="text-success font-medium">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockComplaints.map((complaint) => (
              <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{complaint.title}</h3>
                      {getStatusBadge(complaint.status)}
                      {getPriorityBadge(complaint.priority)}
                    </div>
                    <p className="text-gray-600 mb-3">{complaint.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Category: {complaint.category}</span>
                      <span>Submitted: {complaint.submittedAt}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
