import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function AccountingOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accounting — Overview</h1>
        <p className="mt-1 text-sm text-gray-600">ملخص عام للحسابات.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">This is an overview placeholder using the same card styles.</p>
        </CardContent>
      </Card>
    </div>
  )
}
