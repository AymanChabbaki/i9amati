import { DollarSign, TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Accounting() {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState('2024');

  const mockTransactions = [
    {
      id: '1',
      date: '2024-11-30',
      description: 'Monthly Maintenance Fees Collection',
      category: 'Maintenance',
      amount: 24960,
      type: 'income'
    },
    {
      id: '2',
      date: '2024-11-28',
      description: 'Elevator Maintenance Contract',
      category: 'Maintenance',
      amount: -2500,
      type: 'expense'
    },
    {
      id: '3',
      date: '2024-11-25',
      description: 'Security System Upgrade',
      category: 'Security',
      amount: -8500,
      type: 'expense'
    },
    {
      id: '4',
      date: '2024-11-20',
      description: 'Insurance Premium',
      category: 'Insurance',
      amount: -3200,
      type: 'expense'
    },
    {
      id: '5',
      date: '2024-11-15',
      description: 'Landscaping Services',
      category: 'Maintenance',
      amount: -1800,
      type: 'expense'
    }
  ];

  const mockBudget = [
    { category: 'Maintenance', budgeted: 15000, actual: 12300, variance: 2700 },
    { category: 'Security', budgeted: 8000, actual: 8500, variance: -500 },
    { category: 'Insurance', budgeted: 3500, actual: 3200, variance: 300 },
    { category: 'Utilities', budgeted: 5000, actual: 4800, variance: 200 },
    { category: 'Administration', budgeted: 2000, actual: 1900, variance: 100 }
  ];

  const totalIncome = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));

  const netIncome = totalIncome - totalExpenses;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(Math.abs(amount));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounting</h1>
          <p className="mt-1 text-sm text-gray-600">View financial ledgers, budgets, and yearly comparisons.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-success">{formatCurrency(totalIncome)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-error">{formatCurrency(totalExpenses)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-error" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Income</p>
                <p className={`text-2xl font-bold ${netIncome >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatCurrency(netIncome)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reserve Fund</p>
                <p className="text-2xl font-bold text-gray-900">€45,200</p>
              </div>
              <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                <span className="text-warning font-medium">€</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ledger" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ledger">General Ledger</TabsTrigger>
          <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Year Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="ledger">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
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
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {transaction.category}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                          transaction.type === 'income' ? 'text-success' : 'text-error'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {transaction.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual ({selectedYear})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBudget.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{item.category}</h3>
                      <span className={`text-sm font-medium ${
                        item.variance >= 0 ? 'text-success' : 'text-error'
                      }`}>
                        {item.variance >= 0 ? '+' : ''}{formatCurrency(item.variance)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Budgeted</p>
                        <p className="font-medium">{formatCurrency(item.budgeted)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Actual</p>
                        <p className="font-medium">{formatCurrency(item.actual)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Variance</p>
                        <p className={`font-medium ${
                          item.variance >= 0 ? 'text-success' : 'text-error'
                        }`}>
                          {((item.variance / item.budgeted) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.actual <= item.budgeted ? 'bg-success' : 'bg-error'
                          }`}
                          style={{ width: `${Math.min((item.actual / item.budgeted) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Year-over-Year Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Income Comparison</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">2024</span>
                      <span className="font-medium">{formatCurrency(totalIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">2023</span>
                      <span className="font-medium">€287,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">2022</span>
                      <span className="font-medium">€275,230</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Expense Comparison</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">2024</span>
                      <span className="font-medium">{formatCurrency(totalExpenses)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">2023</span>
                      <span className="font-medium">€268,900</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">2022</span>
                      <span className="font-medium">€259,800</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}