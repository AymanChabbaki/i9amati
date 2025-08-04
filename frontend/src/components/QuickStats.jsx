import { Card, CardContent } from '@/components/ui/card';
import { Building, CreditCard, AlertTriangle, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function QuickStats() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const getStatsForRole = () => {
    if (user?.role === 'owner') {
      return [
        {
          icon: Building,
          label: 'Unit Share',
          value: '12.5%',
          color: 'text-primary'
        },
        {
          icon: CreditCard,
          label: 'Monthly Payment',
          value: '€245',
          color: 'text-success'
        },
        {
          icon: AlertTriangle,
          label: 'Pending Issues',
          value: '2',
          color: 'text-warning'
        },
        {
          icon: Users,
          label: 'Active Votes',
          value: '3',
          color: 'text-error'
        }
      ];
    }

    if (user?.role === 'agent') {
      return [
        {
          icon: Building,
          label: 'Total Units',
          value: '124',
          color: 'text-primary'
        },
        {
          icon: CreditCard,
          label: 'Collection Rate',
          value: '96%',
          color: 'text-success'
        },
        {
          icon: AlertTriangle,
          label: 'Open Complaints',
          value: '8',
          color: 'text-warning'
        },
        {
          icon: Users,
          label: 'Upcoming Meetings',
          value: '2',
          color: 'text-error'
        }
      ];
    }

    if (user?.role === 'supervisor') {
      return [
        {
          icon: Building,
          label: 'Total Residences',
          value: '3',
          color: 'text-primary'
        },
        {
          icon: Users,
          label: 'Active Agents',
          value: '3',
          color: 'text-success'
        },
        {
          icon: CreditCard,
          label: 'Avg Collection',
          value: '95.7%',
          color: 'text-warning'
        },
        {
          icon: AlertTriangle,
          label: 'Agent Performance',
          value: '4.6/5',
          color: 'text-error'
        }
      ];
    }

    return [];
  };

  const stats = getStatsForRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}