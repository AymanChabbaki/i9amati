import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function AccountingReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accounting — Reports</h1>
        <p className="mt-1 text-sm text-gray-600">تقارير مالية متنوعة.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">Report generation controls will go here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
