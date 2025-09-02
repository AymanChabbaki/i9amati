import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

export default function AccountingInvoices() {
  const sample = [{ id: 1, date: '2024-11-01', number: 'INV-100', amount: 1200, status: 'Paid' }]
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accounting — Invoices</h1>
        <p className="mt-1 text-sm text-gray-600">قائمة الفواتير.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الفاتورة</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sample.map(s => (
                <TableRow key={s.id}>
                  <TableCell>{s.number}</TableCell>
                  <TableCell>{s.date}</TableCell>
                  <TableCell>{s.amount}</TableCell>
                  <TableCell>{s.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
