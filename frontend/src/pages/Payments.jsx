import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockPayments } from '../data/mockData';

import { useState } from 'react';
export default function Payments() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [frequency, setFrequency] = useState('trimester');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-success/10 text-success hover:bg-success/20">{t('common.paid')}</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">{t('common.pending')}</Badge>;
      case 'overdue':
        return <Badge className="bg-error/10 text-error hover:bg-error/20">{t('common.overdue')}</Badge>;
      default:
        return null;
    }
  };

  const frequencyOptions = [
    { value: '1month', label: t('payments.1month', { defaultValue: '1 Month' }) },
    { value: '2month', label: t('payments.2month', { defaultValue: '2 Months' }) },
    { value: '3month', label: t('payments.3month', { defaultValue: '3 Months' }) },
    { value: '4month', label: t('payments.4month', { defaultValue: '4 Months' }) },
    { value: '5month', label: t('payments.5month', { defaultValue: '5 Months' }) },
    { value: '6month', label: t('payments.6month', { defaultValue: '6 Months' }) },
    { value: 'trimester', label: t('payments.trimester', { defaultValue: 'Trimester' }) },
    { value: 'yearly', label: t('payments.yearly', { defaultValue: 'Yearly' }) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('nav.payments')}</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your payment history and make new payments.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
              className="block w-44 px-4 py-2 text-sm rounded-xl font-medium bg-white text-gray-900 border-2 border-primary focus:border-primary focus:ring-2 focus:ring-primary/30 shadow-lg appearance-none transition duration-150"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
            >
              {frequencyOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-primary text-lg">
              ▼
            </span>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            {t('actions.makePayment', { defaultValue: 'Make Payment' })} ({frequencyOptions.find(opt => opt.value === frequency)?.label})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {user?.role === 'union_agent' || user?.role === 'agent' ? (
          <>
            <Card className="bg-gradient-to-br from-green-50 to-white shadow-md rounded-2xl border border-green-100">
              <CardContent className="p-7 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mb-2 shadow">
                    <span className="text-success text-2xl font-bold">✔</span>
                  </div>
                  <p className="text-sm font-medium text-success">People Paid</p>
                  <p className="text-3xl font-bold text-gray-900">97</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-white shadow-md rounded-2xl border border-red-100">
              <CardContent className="p-7 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-error/10 rounded-full flex items-center justify-center mb-2 shadow">
                    <span className="text-error text-2xl font-bold">✗</span>
                  </div>
                  <p className="text-sm font-medium text-error">Defaulters</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-white shadow-md rounded-2xl border border-blue-100">
              <CardContent className="p-7 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-2 shadow">
                    <span className="text-primary text-2xl font-bold">€</span>
                  </div>
                  <span className="text-3xl font-bold text-primary">
                    {frequency === '1month' && '€320.00'}
                    {frequency === '2month' && '€640.00'}
                    {frequency === '3month' && '€960.00'}
                    {frequency === '4month' && '€1280.00'}
                    {frequency === '5month' && '€1600.00'}
                    {frequency === '6month' && '€1920.00'}
                    {frequency === 'trimester' && '€960.00'}
                    {frequency === 'yearly' && '€3840.00'}
                  </span>
                  <p className="text-sm font-medium text-primary mt-2">{t('payments.amountLabel', { defaultValue: 'Amount' })}</p>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Current Balance */}
            <Card className="bg-gradient-to-br from-green-50 to-white shadow-md rounded-2xl border border-green-100">
              <CardContent className="p-7 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mb-2 shadow">
                    <span className="text-success text-2xl font-bold">✓</span>
                  </div>
                  <p className="text-sm font-medium text-success">{t('payments.currentBalance', { defaultValue: 'Current Balance' })}</p>
                  <p className="text-3xl font-bold text-gray-900">€0.00</p>
                </div>
              </CardContent>
            </Card>

            {/* Next Payment Due */}
            <Card className="bg-gradient-to-br from-yellow-50 to-white shadow-md rounded-2xl border border-yellow-100">
              <CardContent className="p-7 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-warning/10 rounded-full flex items-center justify-center mb-2 shadow">
                    <span className="text-warning text-2xl font-bold">!</span>
                  </div>
                  <p className="text-sm font-medium text-warning">{t('payments.nextDue', { defaultValue: 'Next Payment Due' })}</p>
                  <p className="text-3xl font-bold text-gray-900">Dec 1</p>
                </div>
              </CardContent>
            </Card>

            {/* Amount */}
            <Card className="bg-gradient-to-br from-blue-50 to-white shadow-md rounded-2xl border border-blue-100">
              <CardContent className="p-7 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-2 shadow">
                    <span className="text-primary text-2xl font-bold">€</span>
                  </div>
                  <span className="text-3xl font-bold text-primary">
                    {frequency === '1month' && '€320.00'}
                    {frequency === '2month' && '€640.00'}
                    {frequency === '3month' && '€960.00'}
                    {frequency === 'trimester' && '€960.00'}
                    {frequency === 'yearly' && '€3840.00'}
                  </span>
                  <p className="text-sm font-medium text-primary mt-2">{t('payments.amountLabel', { defaultValue: 'Amount' })}</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {payment.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {payment.currency}{payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm">
                        View Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
