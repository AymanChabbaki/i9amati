import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function AccountingPayments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accounting — Payments</h1>
        <p className="mt-1 text-sm text-gray-600">تسجيل ومتابعة الدفعات.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">Payments table and controls will go here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
