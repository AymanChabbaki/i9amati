import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function AccountingNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accounting — New Page</h1>
        <p className="mt-1 text-sm text-gray-600">صفحة جديدة ضمن ملحقات المحاسبة.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">Placeholder for the new accounting page.</p>
        </CardContent>
      </Card>
    </div>
  )
}
