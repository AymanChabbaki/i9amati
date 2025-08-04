import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { 
  CreditCard, 
  Vote, 
  AlertTriangle, 
  FileText, 
  DoorOpen, 
  Users,
  Calendar,
  BarChart3,
  Settings,
  Building
} from 'lucide-react';

export default function QuickActions() {
  const { user } = useAuth();

  const getActionsForRole = () => {
    if (user?.role === 'owner') {
      return [
        {
          icon: CreditCard,
          label: 'Make Payment',
          description: 'Pay monthly maintenance fee',
          color: 'bg-primary hover:bg-primary/90'
        },
        {
          icon: Vote,
          label: 'Cast Vote',
          description: 'Participate in active voting',
          color: 'bg-success hover:bg-success/90'
        },
        {
          icon: AlertTriangle,
          label: 'Submit Complaint',
          description: 'Report an issue or concern',
          color: 'bg-warning hover:bg-warning/90'
        },
        {
          icon: DoorOpen,
          label: 'Visitor Request',
          description: 'Register a visitor entry',
          color: 'bg-error hover:bg-error/90'
        }
      ];
    }

    if (user?.role === 'agent') {
      return [
        {
          icon: Calendar,
          label: 'Schedule Meeting',
          description: 'Create a new community meeting',
          color: 'bg-primary hover:bg-primary/90'
        },
        {
          icon: CreditCard,
          label: 'Record Payment',
          description: 'Register owner payment',
          color: 'bg-success hover:bg-success/90'
        },
        {
          icon: FileText,
          label: 'Generate Report',
          description: 'Create financial or status report',
          color: 'bg-warning hover:bg-warning/90'
        },
        {
          icon: Users,
          label: 'Send Notice',
          description: 'Notify all residents',
          color: 'bg-error hover:bg-error/90'
        }
      ];
    }

    if (user?.role === 'supervisor') {
      return [
        {
          icon: BarChart3,
          label: 'View Analytics',
          description: 'Check performance metrics',
          color: 'bg-primary hover:bg-primary/90'
        },
        {
          icon: Users,
          label: 'Review Agents',
          description: 'Evaluate agent performance',
          color: 'bg-success hover:bg-success/90'
        },
        {
          icon: Building,
          label: 'Add Residence',
          description: 'Set up new property',
          color: 'bg-warning hover:bg-warning/90'
        },
        {
          icon: Settings,
          label: 'System Config',
          description: 'Configure platform settings',
          color: 'bg-error hover:bg-error/90'
        }
      ];
    }

    return [];
  };

  const actions = getActionsForRole();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className={`justify-start h-auto p-4 ${action.color} text-white border-0`}
              >
                <div className="flex items-center space-x-3 w-full">
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-sm opacity-90">{action.description}</div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}