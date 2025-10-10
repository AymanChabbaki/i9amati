import { Card, CardContent } from '@/components/ui/card';
import { Building, CreditCard, AlertTriangle, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function QuickStats() {
  // Always show agent stats as icon-based boxes
  const stats = [
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