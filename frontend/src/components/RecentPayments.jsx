import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Calendar } from 'lucide-react';

export default function RecentPayments() {
  const { user } = useAuth();

  const getPaymentsForRole = () => {
    if (user?.role === 'owner') {
      return [
        {
          id: '1',
          description: 'Monthly Maintenance Fee',
          amount: '€245.00',
          date: '2024-11-01',
          status: 'paid',
          type: 'monthly'
        },
        {
          id: '2',
          description: 'Special Assessment - Elevator Repair',
          amount: '€125.50',
          date: '2024-10-15',
          status: 'paid',
          type: 'special'
        },
        {
          id: '3',
          description: 'Monthly Maintenance Fee',
          amount: '€245.00',
          date: '2024-12-01',
          status: 'pending',
          type: 'monthly'
        }
      ];
    }

    if (user?.role === 'agent') {
      return [
        {
          id: '1',
          description: 'Unit 3B - Monthly Payment',
          amount: '€245.00',
          date: '2024-11-30',
          status: 'received',
          type: 'monthly'
        },
        {
          id: '2',
          description: 'Unit 7A - Overdue Payment',
          amount: '€490.00',
          date: '2024-10-01',
          status: 'overdue',
          type: 'monthly'
        },
        {
          id: '3',
          description: 'Unit 12C - Special Assessment',
          amount: '€125.50',
          date: '2024-11-28',
          status: 'received',
          type: 'special'
        }
      ];
    }

    if (user?.role === 'supervisor') {
      return [
        {
          id: '1',
          description: 'Oceanview Residences - Monthly Collection',
          amount: '€30,380.00',
          date: '2024-11-30',
          status: 'complete',
          type: 'collection'
        },
        {
          id: '2',
          description: 'Palm Gardens - Outstanding Balance',
          amount: '€2,450.00',
          date: '2024-11-15',
          status: 'pending',
          type: 'collection'
        },
        {
          id: '3',
          description: 'City Heights - Special Assessment',
          amount: '€19,550.00',
          date: '2024-11-20',
          status: 'complete',
          type: 'special'
        }
      ];
    }

    return [];
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
      case 'received':
      case 'complete':
        return <Badge className="bg-success/10 text-success">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-error/10 text-error">Overdue</Badge>;
      default:
        return null;
    }
  };

  const payments = getPaymentsForRole();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Recent Payments</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{payment.description}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>{payment.date}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-gray-900">{payment.amount}</span>
                {getStatusBadge(payment.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}