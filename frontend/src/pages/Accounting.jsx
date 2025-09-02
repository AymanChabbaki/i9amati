import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Plus, Edit, Trash, Upload } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const STORAGE_KEYS = {
  JOURNAL: 'accounting_journal_v1',
  ANNEXES: 'accounting_annexes_v1'
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(amount);
}

export default function Accounting() {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState('2024');
  const nextYear = String(Number(selectedYear || '0') + 1);

  // Journal entries
  const [journal, setJournal] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // Annexes (1..12)
  const [annexes, setAnnexes] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ANNEXES);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ date: '', description: '', debit: '', credit: '', amount: '' });

  

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNEXES, JSON.stringify(annexes));
  }, [annexes]);

  const totals = useMemo(() => {
    const income = journal.filter(e => e.amount > 0).reduce((s, e) => s + Number(e.amount || 0), 0);
    const expenses = journal.filter(e => e.amount < 0).reduce((s, e) => s + Math.abs(Number(e.amount || 0)), 0);
    const net = income - expenses;
    return { income, expenses, net };
  }, [journal]);

  // Ledger simple running balance (Main ledger)
  const ledger = useMemo(() => {
    let balance = 0;
    return journal.map((entry) => {
      const debit = Number(entry.amount) || 0;
      // treat debit as positive effect on balance for simplicity
      balance = balance + debit;
      return { ...entry, runningBalance: balance };
    });
  }, [journal]);

  // Annex names
  const ANNEX_LIST = [
    'Budget', 'Reserves', 'Loans', 'Equipment', 'Off-Budget Works', 'Contributions', 'Payments', 'Schedule', 'Fixed Assets', 'Depreciation', 'Cash Flow', 'Misc'
  ];

  // Annex selection and per-annex form state
  const [currentAnnex, setCurrentAnnex] = useState(null);
  const [annexForm, setAnnexForm] = useState({ title: '', value: '', notes: '' });
  const [annexEditing, setAnnexEditing] = useState(null);
  // ledger view selector: journal, ledger, inventory
  const [ledgerView, setLedgerView] = useState('ledger');

  // Annex 3 modal (financial situation & treasury)
  const [showAnnex3Modal, setShowAnnex3Modal] = useState(false);
    useEffect(() => {
  if (showAnnex3Modal) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
  // Cleanup on unmount
  return () => {
    document.body.classList.remove('modal-open');
  };
}, [showAnnex3Modal]);

  const defaultAnnex3 = {
    // Equity (رؤوس الأموال الذاتية)
    equity_111: '',
    equity_119: '',
    equity_151: '',
    // Liabilities (الديون)
    liab_441: '',
    liab_442: '',
    liab_443: '',
    liab_444: '',
    liab_445: '',
    liab_448: '',
    // Receivables (الدائنيات)
    recv_341: '',
    recv_342: '',
    recv_345: '',
    recv_348: '',
    recv_349: '',
    recv_394: '',
    // Treasury (الخزينة)
    treasury_assets: '',
    treasury_liabilities: ''
  };
  const [annex3Data, setAnnex3Data] = useState(() => {
    try {
      const stored = annexes['financial_3'];
      return stored ? stored : defaultAnnex3;
    } catch (e) {
      return defaultAnnex3;
    }
  });

  // Annex 4 - Management account (حساب التسيير العام)
  const defaultAnnex4 = {
    module: 'حساب التسيير العام',
    description: 'إدخال العائدات والتكاليف الجارية للسنة المختتمة (ن) والميزانية (ن+1)، مع حساب المجموع والفائض أو العجز.',
    revenues: {
      '7111': { label: 'مؤن عن عمليات جارية', n: '', n1: '' },
      '7112': { label: 'مؤن عن أشغال', n: '', n1: '' },
      '7113': { label: 'تسبيقات', n: '', n1: '' },
      '7121': { label: 'اقتراضات', n: '', n1: '' },
      '7122': { label: 'إعانات', n: '', n1: '' },
      '7123': { label: 'تعويضات التأمين', n: '', n1: '' },
      '7124': { label: 'عائدات أخرى', n: '', n1: '' },
      '7125': { label: 'عائدات مالية', n: '', n1: '' }
    },
    expenses: {
      '6111': { label: 'ماء (العداد العام)', n: '', n1: '' },
      '6112': { label: 'كهرباء', n: '', n1: '' },
      '6113': { label: 'تدفئة وطاقة ومحروقات', n: '', n1: '' },
      '6114': { label: 'مشتريات مواد الصيانة وتجهيزات بسيطة', n: '', n1: '' },
      '6115': { label: 'معدات بسيطة', n: '', n1: '' },
      '6116': { label: 'لوازم', n: '', n1: '' },
      '6121': { label: 'تسديد الاقتراضات', n: '', n1: '' },
      '6131': { label: 'تنظيف المحلات', n: '', n1: '' },
      '6132': { label: 'كراءات عقارية', n: '', n1: '' },
      '6133': { label: 'أشغال صيانة كبرى', n: '', n1: '' },
      '6134': { label: 'أتعاب مهنية وخدمات خبرة', n: '', n1: '' },
      '6135': { label: 'نقل وتنقلات', n: '', n1: '' },
      '6136': { label: 'اتصالات (هاتف، أنترنت...)', n: '', n1: '' },
      '6137': { label: 'مصاريف بريدية', n: '', n1: '' },
      '6138': { label: 'تكاليف أخرى خارجية', n: '', n1: '' },
      '6141': { label: 'مصاريف تأمين', n: '', n1: '' },
      '6142': { label: 'رسوم وضرائب', n: '', n1: '' },
      '6143': { label: 'مصاريف قضائية', n: '', n1: '' }
    },
    notes: ''
  };

  const [annex4Data, setAnnex4Data] = useState(() => {
    try {
      return annexes['management_4'] || defaultAnnex4;
    } catch (e) {
      return defaultAnnex4;
    }
  });

  useEffect(() => {
    if (annexes['management_4']) setAnnex4Data(annexes['management_4']);
  }, [annexes]);

  const [showAnnex4Modal, setShowAnnex4Modal] = useState(false);

  useEffect(() => {
    if (showAnnex4Modal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showAnnex4Modal]);

  // Annex 1 (Budget) and Annex 2 (Reserves) modals
  const [showAnnex1Modal, setShowAnnex1Modal] = useState(false);
  const [showAnnex2Modal, setShowAnnex2Modal] = useState(false);

  useEffect(() => {
    if (showAnnex1Modal || showAnnex2Modal) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [showAnnex1Modal, showAnnex2Modal]);

  const annex4Totals = useMemo(() => {
    const n = v => Number(String(v || '').replace(/,/g, '')) || 0;
    const sumObj = (obj, key) => Object.values(obj || {}).reduce((s, it) => s + n(it[key]), 0);
    const total_revenues_n = sumObj(annex4Data.revenues, 'n');
    const total_revenues_n1 = sumObj(annex4Data.revenues, 'n1');
    const total_expenses_n = sumObj(annex4Data.expenses, 'n');
    const total_expenses_n1 = sumObj(annex4Data.expenses, 'n1');
    return {
      total_revenues_n,
      total_revenues_n1,
      total_expenses_n,
      total_expenses_n1,
      surplus_n: total_revenues_n - total_expenses_n,
      surplus_n1: total_revenues_n1 - total_expenses_n1
    };
  }, [annex4Data]);

  // Export helpers for Excel and PDF (best-effort fallbacks)
  // These avoid bundler errors when optional packages are not installed.

  async function exportExcel(data, filename = 'annex4.xlsx') {
    // Try dynamic import of xlsx; fall back to CSV if not available.
    try {
  const mod = await eval('import("xlsx")');
  const XLSX = mod.default || mod;
      const wsData = [];
      wsData.push(['Code', 'Item', 'ن (السنة المختتمة)', 'ن+1 (المتوقعة)', 'Type']);
      Object.entries(data.revenues || {}).forEach(([code, it]) => wsData.push([code, it.label, Number(it.n || 0), Number(it.n1 || 0), 'Revenue']));
      Object.entries(data.expenses || {}).forEach(([code, it]) => wsData.push([code, it.label, Number(it.n || 0), Number(it.n1 || 0), 'Expense']));
      wsData.push([]);
      wsData.push(['', 'Total Revenues', annex4Totals.total_revenues_n, annex4Totals.total_revenues_n1]);
      wsData.push(['', 'Total Expenses', annex4Totals.total_expenses_n, annex4Totals.total_expenses_n1]);
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Annex4');
      XLSX.writeFile(wb, filename);
    } catch (err) {
      // fallback to CSV
      const rows = [];
      rows.push(['Code', 'Item', 'ن (السنة المختتمة)', 'ن+1 (المتوقعة)', 'Type']);
      Object.entries(data.revenues || {}).forEach(([code, it]) => rows.push([code, it.label, Number(it.n || 0), Number(it.n1 || 0), 'Revenue']));
      Object.entries(data.expenses || {}).forEach(([code, it]) => rows.push([code, it.label, Number(it.n || 0), Number(it.n1 || 0), 'Expense']));
      rows.push([]);
      rows.push(['', 'Total Revenues', annex4Totals.total_revenues_n, annex4Totals.total_revenues_n1]);
      rows.push(['', 'Total Expenses', annex4Totals.total_expenses_n, annex4Totals.total_expenses_n1]);
      const csv = rows.map(r => r.map(c => `"${String(c ?? '').replace(/"/g, '""') }"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.replace(/\.xlsx$/, '.csv');
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  async function exportPDF(data, filename = 'annex4.pdf') {
    try {
  const jsPDF = (await eval('import("jspdf")')).default;
  const autoTable = (await eval('import("jspdf-autotable")')).default;
      const doc = new jsPDF({ unit: 'pt' });
      doc.setFontSize(12);
      doc.text(data.module || 'Annex 4', 40, 40);
      const rows = [];
      Object.entries(data.revenues || {}).forEach(([code, it]) => rows.push([code, it.label, it.n || 0, it.n1 || 0, 'Revenue']));
      Object.entries(data.expenses || {}).forEach(([code, it]) => rows.push([code, it.label, it.n || 0, it.n1 || 0, 'Expense']));
      autoTable(doc, { head: [['Code', 'Item', 'ن', 'ن+1', 'Type']], body: rows, startY: 70 });
      doc.save(filename);
    } catch (err) {
      exportJSON(data, filename.replace(/\.pdf$/, '.json'));
    }
  }

  // Portal helper: render children into document.body so backdrop covers full viewport
  function PortalModal({ children }) {
    if (typeof document === 'undefined') return null;
    return createPortal(children, document.body);
  }

  useEffect(() => {
    // keep annex3Data in sync if annexes were loaded/changed externally
    if (annexes['financial_3']) setAnnex3Data(annexes['financial_3']);
  }, [annexes]);

  const annex3Totals = useMemo(() => {
    const n = v => Number(String(v || '').replace(/,/g, '')) || 0;
    const sum = arr => arr.reduce((s, x) => s + n(x), 0);
    const equity = sum([annex3Data.equity_111, annex3Data.equity_119, annex3Data.equity_151]);
    const liab = sum([annex3Data.liab_441, annex3Data.liab_442, annex3Data.liab_443, annex3Data.liab_444, annex3Data.liab_445, annex3Data.liab_448]);
    const recv = sum([annex3Data.recv_341, annex3Data.recv_342, annex3Data.recv_345, annex3Data.recv_348, annex3Data.recv_349, annex3Data.recv_394]);
    return { equity, liab, recv };
  }, [annex3Data]);

  // Helpers
  function addOrUpdateEntry(e) {
    e.preventDefault();
    const amount = Number(form.amount) || 0;
    if (!form.date || !form.description || !form.debit || !form.credit || !amount) return;

    if (editingId) {
      setJournal((prev) => prev.map((it) => it.id === editingId ? { ...it, ...form, amount } : it));
      setEditingId(null);
    } else {
      setJournal((prev) => [{ id: uid(), ...form, amount, attachmentName: form.attachmentName || '', signature: btoa(form.description + form.date + amount).slice(0, 12) }, ...prev]);
    }

    setForm({ date: '', description: '', debit: '', credit: '', amount: '' });
  }

  function editEntry(entry) {
    setEditingId(entry.id);
    setForm({ date: entry.date, description: entry.description, debit: entry.debit, credit: entry.credit, amount: entry.amount });
  }

  function deleteEntry(id) {
    setJournal((prev) => prev.filter(e => e.id !== id));
  }

  function exportJSON(data, filename = 'accounting.json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportCSV(rows, filename = 'export.csv') {
    if (!rows || rows.length === 0) return;
    const keys = Object.keys(rows[0]);
    const csv = [keys.join(',')].concat(rows.map(r => keys.map(k => `"${String(r[k] ?? '').replace(/"/g, '""')}"`).join(','))).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJSONFile(file, target = 'journal') {
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (target === 'journal') {
          const normalized = Array.isArray(data) ? data : (data.journal || []);
          setJournal(normalized.map(d => ({ id: d.id || uid(), ...d })));
        } else {
          setAnnexes(data);
        }
      } catch (err) {
        // ignore bad file
      }
    };
    reader.readAsText(file);
  }

  function handleFileUpload(ev, target) {
    const f = ev.target.files?.[0];
    if (!f) return;
    importJSONFile(f, target);
    ev.target.value = '';
  }

  return (
    <div dir="rtl" className="space-y-6 pb-32" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounting</h1>
          <p className="mt-1 text-sm text-gray-600">سجلات مالية، موازنات وتقارير سنوية.</p>
        </div>
        <div className="flex items-center space-x-4 ltr:space-x-reverse">
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
          <Button variant="outline" onClick={() => exportJSON({ journal, annexes }, `accounting_${selectedYear}.json`)}>
            <Download className="mr-2 h-4 w-4" />
            تصدير (JSON)
          </Button>
          <Button variant="outline" onClick={() => exportCSV(journal, `journal_${selectedYear}.csv`)}>
            <Download className="mr-2 h-4 w-4" />
            تصدير (CSV)
          </Button>
          <label className="inline-flex items-center cursor-pointer">
            <input type="file" accept="application/json" onChange={(e) => handleFileUpload(e, 'journal')} className="hidden" />
            <Button variant="ghost"><Upload className="h-4 w-4" /></Button>
          </label>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الرصيد الكلي</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(totals.income - totals.expenses)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المساهمات</p>
                <p className="text-2xl font-bold text-success">{formatCurrency(totals.income)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المصاريف</p>
                <p className="text-2xl font-bold text-error">{formatCurrency(totals.expenses)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-error" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قيمة المعدات</p>
                <p className="text-2xl font-bold text-gray-900">€12,400</p>
              </div>
              <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                <span className="text-warning font-medium">€</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Entry Form + Journal Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'تعديل قيد' : 'إضافة قيد جديد'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addOrUpdateEntry} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input type="date" value={form.date} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))} />
                <Input placeholder="الوصف" value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input placeholder="مدين" value={form.debit} onChange={(e) => setForm(f => ({ ...f, debit: e.target.value }))} />
                <Input placeholder="دائن" value={form.credit} onChange={(e) => setForm(f => ({ ...f, credit: e.target.value }))} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input placeholder="المبلغ" type="number" value={form.amount} onChange={(e) => setForm(f => ({ ...f, amount: e.target.value }))} />
                <Input placeholder="مرفق - اسم الملف" value={form.attachmentName || ''} onChange={(e) => setForm(f => ({ ...f, attachmentName: e.target.value }))} />
              </div>

              <div className="flex items-center space-x-2 ltr:space-x-reverse">
                <Button type="submit"><Plus className="mr-2 h-4 w-4" />{editingId ? 'حفظ' : 'إضافة'}</Button>
                {editingId && <Button variant="ghost" onClick={() => { setEditingId(null); setForm({ date: '', description: '', debit: '', credit: '', amount: '' }); }}>إلغاء</Button>}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>قيود اليومية</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>مدين</TableHead>
                    <TableHead>دائن</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>مرفق</TableHead>
                    <TableHead>توقيع</TableHead>
                    <TableHead>إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journal.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>{entry.debit}</TableCell>
                      <TableCell>{entry.credit}</TableCell>
                      <TableCell className={`${entry.amount >= 0 ? 'text-success' : 'text-error'} font-medium`}>{formatCurrency(entry.amount)}</TableCell>
                      <TableCell>{entry.attachmentName || '-'}</TableCell>
                      <TableCell><Badge>{entry.signature}</Badge></TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 ltr:space-x-reverse">
                          <Button variant="ghost" size="sm" onClick={() => editEntry(entry)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteEntry(entry.id)}><Trash className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ledger + Annexes */}
      <Tabs defaultValue="ledger" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ledger">دفتر الأستاذ</TabsTrigger>
          <TabsTrigger value="annexes">الملحقات</TabsTrigger>
          <TabsTrigger value="reports">تقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="ledger">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <div>
                  <CardTitle>دفاتر المحاسبة</CardTitle>
                  <p className="text-sm text-gray-600">اختر نوع الدفتر لعرضه.</p>
                </div>
                <div className="flex items-center space-x-2 ltr:space-x-reverse">
                  <Select value={ledgerView} onValueChange={setLedgerView}>
                    <SelectTrigger className="w-56">
                      <SelectValue placeholder="اختر دفتر" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="journal">📖 دفتر اليومية</SelectItem>
                      <SelectItem value="ledger">📘 دفتر الأستاذ</SelectItem>
                      <SelectItem value="inventory">🗒️ دفتر الجرد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {ledgerView === 'journal' && (
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الوصف</TableHead>
                        <TableHead>مدين</TableHead>
                        <TableHead>دائن</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>توقيع</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {journal.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.date}</TableCell>
                          <TableCell>{entry.description}</TableCell>
                          <TableCell>{entry.debit}</TableCell>
                          <TableCell>{entry.credit}</TableCell>
                          <TableCell className={`${entry.amount >= 0 ? 'text-success' : 'text-error'} font-medium`}>{formatCurrency(entry.amount)}</TableCell>
                          <TableCell><Badge>{entry.signature}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {ledgerView === 'ledger' && (
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الوصف</TableHead>
                        <TableHead>المدين</TableHead>
                        <TableHead>الدائن</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>الرصيد</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ledger.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.debit}</TableCell>
                          <TableCell>{row.credit}</TableCell>
                          <TableCell className={`${row.amount >= 0 ? 'text-success' : 'text-error'} font-medium`}>{formatCurrency(row.amount)}</TableCell>
                          <TableCell className="font-medium">{formatCurrency(row.runningBalance)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {ledgerView === 'inventory' && (
                <div className="p-4">
                  <p className="text-sm text-gray-600">دفتر الجرد غير متاح حالياً. المتوفر حالياً: 📘 دفتر الأستاذ.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="annexes">
          <Card>
            <CardHeader>
              <CardTitle>قائمة الملحقات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="space-x-2 ltr:space-x-reverse">
                  <Button variant="outline" onClick={() => currentAnnex ? exportJSON(annexes[currentAnnex] || [], `annex_${currentAnnex}_${selectedYear}.json`) : exportJSON(annexes, `annexes_${selectedYear}.json`)}><Download className="mr-2 h-4 w-4" />{currentAnnex ? 'تصدير الملحق' : 'تصدير الملحقات'}</Button>
                  <Button variant="outline" onClick={() => currentAnnex ? exportCSV(annexes[currentAnnex] || [], `annex_${currentAnnex}_${selectedYear}.csv`) : exportCSV(Object.values(annexes).flat(), `annexes_${selectedYear}.csv`)}><Download className="mr-2 h-4 w-4" />تصدير (CSV)</Button>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="file" accept="application/json" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      try {
                        const data = JSON.parse(ev.target.result);
                        if (currentAnnex) {
                          const arr = Array.isArray(data) ? data : (data[currentAnnex] || data.items || []);
                          setAnnexes(a => ({ ...a, [currentAnnex]: (a[currentAnnex] || []).concat(arr.map(d => ({ id: d.id || uid(), title: d.title, value: d.value, notes: d.notes })))}));
                        } else {
                          setAnnexes(data);
                        }
                      } catch (err) {
                        // ignore
                      }
                    };
                    reader.readAsText(f);
                    e.target.value = '';
                  }} className="hidden" />
                  <Button variant="ghost"><Upload className="h-4 w-4" /></Button>
                </label>
              </div>

              <div className="mb-4">
                <h3 className="text-base font-medium mb-2">ملحقات - جدول (يمكن الاستيراد / التصدير)</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                  {ANNEX_LIST.map((name, idx) => (
                    <button key={name} onClick={() => {
                      const key = String(idx);
                      if (idx === 0) {
                        if (!annexes['0']) setAnnexes(a => ({ ...a, '0': annexes['0'] || { items: [], title: 'Budget' } }));
                        setShowAnnex1Modal(true);
                        return;
                      }
                      if (idx === 1) {
                        if (!annexes['1']) setAnnexes(a => ({ ...a, '1': annexes['1'] || { items: [], title: 'Reserves' } }));
                        setShowAnnex2Modal(true);
                        return;
                      }
                      if (idx === 2) {
                        if (!annexes['financial_3']) setAnnexes(a => ({ ...a, financial_3: annexes['financial_3'] || defaultAnnex3 }));
                        setShowAnnex3Modal(true);
                        return;
                      }
                      if (idx === 3) {
                        if (!annexes['management_4']) setAnnexes(a => ({ ...a, management_4: annexes['management_4'] || defaultAnnex4 }));
                        setShowAnnex4Modal(true);
                        return;
                      }
                      if (!annexes[key]) setAnnexes(a => ({ ...a, [key]: [] }));
                      setCurrentAnnex(key);
                      setAnnexForm({ title: '', value: '', notes: '' });
                      setAnnexEditing(null);
                    }} className={(String(currentAnnex) === String(idx) ? 'bg-primary/10 text-primary' : 'bg-white') + ' w-full text-right p-3 rounded-lg shadow-sm border hover:shadow-md transition'}>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{idx + 1}. {name}</div>
                        <div className="text-xs text-gray-400">فتح</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* per-annex content area (same as before) */}
                {currentAnnex == null ? (
                  <div className="px-6 py-4 text-sm text-gray-500">اختر ملحقاً من القائمة لرؤية التفاصيل وإدارتها.</div>
                ) : (
                  <div>
                    <div className="mb-3">
                      <h3 className="text-lg font-medium text-gray-900">ملحق: {ANNEX_LIST[Number(currentAnnex)]}</h3>
                      <p className="text-sm text-gray-600">إدارة عناصر الملحق: إضافة، تعديل، حذف، استيراد وتصدير.</p>
                    </div>

                    {/* per-annex form */}
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const key = String(currentAnnex);
                      const value = Number(annexForm.value) || 0;
                      if (!annexForm.title) return;
                      if (annexEditing) {
                        setAnnexes(prev => ({ ...prev, [key]: (prev[key] || []).map(it => it.id === annexEditing ? { ...it, title: annexForm.title, value, notes: annexForm.notes } : it) }));
                        setAnnexEditing(null);
                      } else {
                        const item = { id: uid(), title: annexForm.title, value, notes: annexForm.notes };
                        setAnnexes(prev => ({ ...prev, [key]: [item, ...(prev[key] || [])] }));
                      }
                      setAnnexForm({ title: '', value: '', notes: '' });
                    }} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                      <Input placeholder="العنوان" value={annexForm.title} onChange={(e) => setAnnexForm(f => ({ ...f, title: e.target.value }))} />
                      <Input placeholder="القيمة" type="number" value={annexForm.value} onChange={(e) => setAnnexForm(f => ({ ...f, value: e.target.value }))} />
                      <Input placeholder="ملاحظات" value={annexForm.notes} onChange={(e) => setAnnexForm(f => ({ ...f, notes: e.target.value }))} />
                      <div className="md:col-span-3">
                        <div className="flex items-center space-x-2 ltr:space-x-reverse">
                          <Button type="submit">{annexEditing ? 'حفظ' : 'إضافة عنصر'}</Button>
                          {annexEditing && <Button variant="ghost" onClick={() => { setAnnexEditing(null); setAnnexForm({ title: '', value: '', notes: '' }); }}>إلغاء</Button>}
                        </div>
                      </div>
                    </form>

                    {/* per-annex table (kept as-is) */}
                    <div className="flex-1 overflow-auto">
                      <div className="grid grid-cols-1 gap-6">
                        {/* Revenues grouped by their logical titles */}
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-medium">العائدات الجارية (Revenues)</h3>
                            <div className="text-sm text-gray-600">ن / ن+1</div>
                          </div>
                          <div className="grid grid-cols-12 gap-2 items-center text-sm text-right">
                            <div className="col-span-6 font-medium">بند</div>
                            <div className="col-span-3 font-medium">ن</div>
                            <div className="col-span-3 font-medium">ن+1</div>
                          </div>
                          <div className="mt-2 space-y-2">
                            {Object.entries(annex4Data.revenues).map(([code, item]) => (
                              <div key={code} className="grid grid-cols-12 gap-2 items-center">
                                <div className="col-span-6 text-sm text-right">{code} — {item.label}</div>
                                <div className="col-span-3"><Input type="number" placeholder="ن" value={item.n} onChange={(e) => setAnnex4Data(d => ({ ...d, revenues: { ...d.revenues, [code]: { ...d.revenues[code], n: e.target.value } } }))} /></div>
                                <div className="col-span-3"><Input type="number" placeholder="ن+1" value={item.n1} onChange={(e) => setAnnex4Data(d => ({ ...d, revenues: { ...d.revenues, [code]: { ...d.revenues[code], n1: e.target.value } } }))} /></div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Expenses grouped */}
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-medium">التكاليف الجارية (Expenses)</h3>
                            <div className="text-sm text-gray-600">ن / ن+1</div>
                          </div>
                          <div className="grid grid-cols-12 gap-2 items-center text-sm text-right">
                            <div className="col-span-6 font-medium">بند</div>
                            <div className="col-span-3 font-medium">ن</div>
                            <div className="col-span-3 font-medium">ن+1</div>
                          </div>
                          <div className="mt-2 space-y-2">
                            {Object.entries(annex4Data.expenses).map(([code, item]) => (
                              <div key={code} className="grid grid-cols-12 gap-2 items-center">
                                <div className="col-span-6 text-sm text-right">{code} — {item.label}</div>
                                <div className="col-span-3"><Input type="number" placeholder="ن" value={item.n} onChange={(e) => setAnnex4Data(d => ({ ...d, expenses: { ...d.expenses, [code]: { ...d.expenses[code], n: e.target.value } } }))} /></div>
                                <div className="col-span-3"><Input type="number" placeholder="ن+1" value={item.n1} onChange={(e) => setAnnex4Data(d => ({ ...d, expenses: { ...d.expenses, [code]: { ...d.expenses[code], n1: e.target.value } } }))} /></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>توليد الجداول وملخصات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => exportCSV(journal, `journal_full_${selectedYear}.csv`)}>تصدير القيود إلى CSV</Button>
                <Button onClick={() => exportJSON({ journal }, `journal_${selectedYear}.json`)}>تصدير القيود إلى JSON</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

  {/* Annex 3 Modal - front layer (improved styling) */}
     {showAnnex3Modal && (
       <PortalModal>
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowAnnex3Modal(false)}>
          <div
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-white border rounded-2xl shadow-2xl flex flex-col"
             dir="rtl"
             onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
           >
      {/* Modal Header */}
      <div className="flex items-start justify-between flex-shrink-0 p-5 border-b gap-4">
        <div>
          <h2 className="text-xl font-semibold">ملحق 3 — الوضعية المالية والخزينة</h2>
          <p className="mt-1 text-sm text-gray-500">أدخل القيم الرقمية لكل حساب. المجموعات تُحسب آلياً.</p>
        </div>
        <div className="flex items-center space-x-2 ltr:space-x-reverse">
          <select
            className="px-3 py-1 text-sm border rounded"
            onChange={(e) => {
              const v = e.target.value;
              if (v === 'empty') setAnnex3Data(defaultAnnex3);
              if (v === 'sample') setAnnex3Data({
                equity_111: 12000, equity_119: 3000, equity_151: 500,
                liab_441: 2000, liab_442: 1500, liab_443: 0, liab_444: 0, liab_445: 0, liab_448: 250,
                recv_341: 500, recv_342: 0, recv_345: 0, recv_348: 0, recv_349: 0, recv_394: 0,
                treasury_assets: 800, treasury_liabilities: 100
              });
              e.target.value = 'default';
            }}
          >
            <option value="default">القوالب</option>
            <option value="empty">فارغ</option>
            <option value="sample">نموذج افتراضي</option>
          </select>
          <Button variant="ghost" onClick={() => setShowAnnex3Modal(false)}>إغلاق</Button>
        </div>
      </div>

      {/* Modal Body - Scrollable Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Equity Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">رؤوس الأموال الذاتية (I)</h3>
              <div className="text-sm font-medium text-gray-600">{formatCurrency(annex3Totals.equity)}</div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label className="text-xs text-gray-600">111 — مال احتياطي</label>
              <Input
                type="number"
                value={annex3Data.equity_111}
                onChange={(e) => setAnnex3Data(d => ({ ...d, equity_111: e.target.value }))}
              />
              <label className="text-xs text-gray-600">119 — نتيجة</label>
              <Input
                type="number"
                value={annex3Data.equity_119}
                onChange={(e) => setAnnex3Data(d => ({ ...d, equity_119: e.target.value }))}
              />
              <label className="text-xs text-gray-600">151 — المؤن</label>
              <Input
                type="number"
                value={annex3Data.equity_151}
                onChange={(e) => setAnnex3Data(d => ({ ...d, equity_151: e.target.value }))}
              />
            </div>
          </div>

          {/* Liabilities Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">الديون (II)</h3>
              <div className="text-sm font-medium text-gray-600">{formatCurrency(annex3Totals.liab)}</div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label className="text-xs text-gray-600">441 — موردون</label>
              <Input
                type="number"
                value={annex3Data.liab_441}
                onChange={(e) => setAnnex3Data(d => ({ ...d, liab_441: e.target.value }))}
              />
              <label className="text-xs text-gray-600">442 — جماعة الملاك المشتركين دائنين</label>
              <Input
                type="number"
                value={annex3Data.liab_442}
                onChange={(e) => setAnnex3Data(d => ({ ...d, liab_442: e.target.value }))}
              />
              <label className="text-xs text-gray-600">443 — مستخدمون</label>
              <Input
                type="number"
                value={annex3Data.liab_443}
                onChange={(e) => setAnnex3Data(d => ({ ...d, liab_443: e.target.value }))}
              />
              <label className="text-xs text-gray-600">444 — ضمان اجتماعي</label>
              <Input
                type="number"
                value={annex3Data.liab_444}
                onChange={(e) => setAnnex3Data(d => ({ ...d, liab_444: e.target.value }))}
              />
              <label className="text-xs text-gray-600">445 — الدولة وهيئات أخرى</label>
              <Input
                type="number"
                value={annex3Data.liab_445}
                onChange={(e) => setAnnex3Data(d => ({ ...d, liab_445: e.target.value }))}
              />
              <label className="text-xs text-gray-600">448 — دائنون آخرون</label>
              <Input
                type="number"
                value={annex3Data.liab_448}
                onChange={(e) => setAnnex3Data(d => ({ ...d, liab_448: e.target.value }))}
              />
            </div>
          </div>

          {/* Receivables Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">الدائنيات (III)</h3>
              <div className="text-sm font-medium text-gray-600">{formatCurrency(annex3Totals.recv)}</div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label className="text-xs text-gray-600">341 — موردون – مدينون</label>
              <Input
                type="number"
                value={annex3Data.recv_341}
                onChange={(e) => setAnnex3Data(d => ({ ...d, recv_341: e.target.value }))}
              />
              <label className="text-xs text-gray-600">342 — جماعة الملاك المشتركين</label>
              <Input
                type="number"
                value={annex3Data.recv_342}
                onChange={(e) => setAnnex3Data(d => ({ ...d, recv_342: e.target.value }))}
              />
              <label className="text-xs text-gray-600">345 — الدولة و هيئات أخرى</label>
              <Input
                type="number"
                value={annex3Data.recv_345}
                onChange={(e) => setAnnex3Data(d => ({ ...d, recv_345: e.target.value }))}
              />
              <label className="text-xs text-gray-600">348 — مدينون مختلفون</label>
              <Input
                type="number"
                value={annex3Data.recv_348}
                onChange={(e) => setAnnex3Data(d => ({ ...d, recv_348: e.target.value }))}
              />
              <label className="text-xs text-gray-600">349 — حساب التسوية</label>
              <Input
                type="number"
                value={annex3Data.recv_349}
                onChange={(e) => setAnnex3Data(d => ({ ...d, recv_349: e.target.value }))}
              />
              <label className="text-xs text-gray-600">394 — مؤن عن التدني</label>
              <Input
                type="number"
                value={annex3Data.recv_394}
                onChange={(e) => setAnnex3Data(d => ({ ...d, recv_394: e.target.value }))}
              />
            </div>
          </div>

          {/* Treasury Section - Spans 2 columns on md+ */}
          <div className="space-y-3 md:col-span-2">
            <h3 className="text-sm font-medium">الخزينة</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs text-gray-600">خزينة بالأصول</label>
                <Input
                  type="number"
                  value={annex3Data.treasury_assets}
                  onChange={(e) => setAnnex3Data(d => ({ ...d, treasury_assets: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">خزينة بالخصوم</label>
                <Input
                  type="number"
                  value={annex3Data.treasury_liabilities}
                  onChange={(e) => setAnnex3Data(d => ({ ...d, treasury_liabilities: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="flex items-center justify-between flex-shrink-0 p-5 border-t gap-4">
        <div className="flex items-center gap-3">
          <Button onClick={() => {
            setAnnexes(prev => ({ ...prev, financial_3: annex3Data }));
            setShowAnnex3Modal(false);
          }}>حفظ</Button>
          <Button variant="outline" onClick={() => setAnnex3Data(defaultAnnex3)}>مسح</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => exportJSON(annex3Data, `annex3_financial_${selectedYear}.json`)}>تصدير JSON</Button>
          <Button variant="ghost" onClick={() => exportCSV([annex3Data], `annex3_financial_${selectedYear}.csv`)}>تصدير CSV</Button>
        </div>
      </div>
    </div>
  </div>
  </PortalModal>
)}

      {/* Annex 1 Modal - Budget */}
     {showAnnex1Modal && (
       <PortalModal>
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowAnnex1Modal(false)}>
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-white border rounded-2xl shadow-2xl flex flex-col p-6" dir="rtl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between flex-shrink-0 mb-4">
              <div>
                <h2 className="text-xl font-semibold">الميزانية (Budget)</h2>
                <p className="mt-1 text-sm text-gray-500">أضف أو حرر بنود الميزانية.</p>
              </div>
              <div className="flex items-center space-x-2 ltr:space-x-reverse">
                <Button variant="ghost" onClick={() => setShowAnnex1Modal(false)}>إغلاق</Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="space-y-3">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const data = annexes['0'] || { items: [], title: 'Budget' };
                  const formEl = e.target;
                  const title = formEl.title?.value || 'Untitled';
                  const value = Number(formEl.value?.value) || 0;
                  const notes = formEl.notes?.value || '';
                  const item = { id: uid(), title, value, notes };
                  setAnnexes(prev => ({ ...prev, '0': { ...(prev['0'] || { items: [], title: 'Budget' }), items: [item, ...((prev['0'] || { items: [] }).items || [])] } }));
                  formEl.reset();
                }} className="grid grid-cols-1 gap-2 mb-3">
                  <Input name="title" placeholder="عنوان البند" />
                  <Input name="value" placeholder="القيمة" type="number" />
                  <Input name="notes" placeholder="ملاحظات" />
                  <div className="flex items-center gap-2">
                    <Button type="submit">إضافة بند</Button>
                    <Button variant="outline" onClick={() => { setAnnexes(prev => ({ ...prev, '0': { ...(prev['0'] || { items: [], title: 'Budget' }), items: [] } })); }}>مسح الكل</Button>
                  </div>
                </form>

                <div>
                  <h3 className="text-sm font-medium mb-2">بنود الميزانية</h3>
                  <div className="space-y-2">
                    {(annexes['0']?.items || []).map(it => (
                      <div key={it.id} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <div className="text-sm font-medium">{it.title}</div>
                          <div className="text-xs text-gray-500">{it.notes}</div>
                        </div>
                        <div className="text-sm font-medium">{formatCurrency(it.value)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end flex-shrink-0 mt-4">
              <Button onClick={() => { setShowAnnex1Modal(false); }}>إغلاق</Button>
            </div>
          </div>
        </div>
      </PortalModal>
     )}

      {/* Annex 2 Modal - Reserves */}
     {showAnnex2Modal && (
       <PortalModal>
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowAnnex2Modal(false)}>
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-white border rounded-2xl shadow-2xl flex flex-col p-6" dir="rtl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between flex-shrink-0 mb-4">
              <div>
                <h2 className="text-xl font-semibold">الاحتياطيات (Reserves)</h2>
                <p className="mt-1 text-sm text-gray-500">إدارة حساب الاحتياطيات وإضافة البنود.</p>
              </div>
              <div className="flex items-center space-x-2 ltr:space-x-reverse">
                <Button variant="ghost" onClick={() => setShowAnnex2Modal(false)}>إغلاق</Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="space-y-3">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const data = annexes['1'] || { items: [], title: 'Reserves' };
                  const formEl = e.target;
                  const title = formEl.title?.value || 'Untitled';
                  const value = Number(formEl.value?.value) || 0;
                  const notes = formEl.notes?.value || '';
                  const item = { id: uid(), title, value, notes };
                  setAnnexes(prev => ({ ...prev, '1': { ...(prev['1'] || { items: [], title: 'Reserves' }), items: [item, ...((prev['1'] || { items: [] }).items || [])] } }));
                  formEl.reset();
                }} className="grid grid-cols-1 gap-2 mb-3">
                  <Input name="title" placeholder="عنوان البند" />
                  <Input name="value" placeholder="القيمة" type="number" />
                  <Input name="notes" placeholder="ملاحظات" />
                  <div className="flex items-center gap-2">
                    <Button type="submit">إضافة بند</Button>
                    <Button variant="outline" onClick={() => { setAnnexes(prev => ({ ...prev, '1': { ...(prev['1'] || { items: [], title: 'Reserves' }), items: [] } })); }}>مسح الكل</Button>
                  </div>
                </form>

                <div>
                  <h3 className="text-sm font-medium mb-2">بنود الاحتياطيات</h3>
                  <div className="space-y-2">
                    {(annexes['1']?.items || []).map(it => (
                      <div key={it.id} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <div className="text-sm font-medium">{it.title}</div>
                          <div className="text-xs text-gray-500">{it.notes}</div>
                        </div>
                        <div className="text-sm font-medium">{formatCurrency(it.value)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end flex-shrink-0 mt-4">
              <Button onClick={() => { setShowAnnex2Modal(false); }}>إغلاق</Button>
            </div>
          </div>
        </div>
      </PortalModal>
     )}

      {/* Annex 4 Modal - Management account (حساب التسيير العام) */}
     {showAnnex4Modal && (
       <PortalModal>
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowAnnex4Modal(false)}>
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white border rounded-2xl shadow-2xl flex flex-col p-6" dir="rtl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between flex-shrink-0 mb-4">
              <div>
                <h2 className="text-xl font-semibold">حساب التسيير العام</h2>
                <p className="mt-1 text-sm text-gray-500">أدخل جميع العائدات والتكاليف الجارية للسنة الحالية والقادمة. كل القيم يتم حسابها تلقائيًا.</p>
              </div>
              <div className="flex items-center space-x-2 ltr:space-x-reverse">
                <span title="كل القيم يتم حسابها تلقائياً، لا داعي للقلق بشأن الرموز الحسابية." className="text-sm text-gray-400 mr-2">ℹ</span>
                <Button variant="ghost" onClick={() => setShowAnnex4Modal(false)}>إغلاق</Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <Accordion type="single" collapsible defaultValue="rev">
                <AccordionItem value="rev">
                  <AccordionTrigger>العائدات الجارية</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">طلب الأموال (711)</h4>
                        <div className="grid grid-cols-1 gap-2 mt-2">
                          {['7111','7112','7113'].map(code => {
                            const it = annex4Data.revenues[code];
                            if(!it) return null;
                            return (
                              <div key={code} className="grid grid-cols-12 gap-2 items-center">
                                <div className="col-span-6 text-sm text-right">{it.label}</div>
                                <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={it.n} onChange={(e) => setAnnex4Data(d => ({ ...d, revenues: { ...d.revenues, [code]: { ...d.revenues[code], n: e.target.value } } }))} /></div>
                                <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={it.n1} onChange={(e) => setAnnex4Data(d => ({ ...d, revenues: { ...d.revenues, [code]: { ...d.revenues[code], n1: e.target.value } } }))} /></div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium">عائدات أخرى (712)</h4>
                        <div className="grid grid-cols-1 gap-2 mt-2">
                          {['7121','7122','7123','7124','7125'].map(code => {
                            const it = annex4Data.revenues[code];
                            if(!it) return null;
                            return (
                              <div key={code} className="grid grid-cols-12 gap-2 items-center">
                                <div className="col-span-6 text-sm text-right">{it.label}</div>
                                <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={it.n} onChange={(e) => setAnnex4Data(d => ({ ...d, revenues: { ...d.revenues, [code]: { ...d.revenues[code], n: e.target.value } } }))} /></div>
                                <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={it.n1} onChange={(e) => setAnnex4Data(d => ({ ...d, revenues: { ...d.revenues, [code]: { ...d.revenues[code], n1: e.target.value } } }))} /></div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="exp">
                  <AccordionTrigger>التكاليف الجارية</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">شراء مواد ولوازم (611)</h4>
                        <div className="grid grid-cols-1 gap-2 mt-2">
                          {['6111','6112','6113','6114','6115','6116'].map(code => {
                            const it = annex4Data.expenses[code];
                            if(!it) return null;
                            return (
                              <div key={code} className="grid grid-cols-12 gap-2 items-center">
                                <div className="col-span-6 text-sm text-right">{it.label}</div>
                                <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={it.n} onChange={(e) => setAnnex4Data(d => ({ ...d, expenses: { ...d.expenses, [code]: { ...d.expenses[code], n: e.target.value } } }))} /></div>
                                <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={it.n1} onChange={(e) => setAnnex4Data(d => ({ ...d, expenses: { ...d.expenses, [code]: { ...d.expenses[code], n1: e.target.value } } }))} /></div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium">تكاليف أخرى (612)</h4>
                        <div className="grid grid-cols-12 gap-2 items-center mt-2">
                          <div className="col-span-6 text-sm text-right">{annex4Data.expenses['6121']?.label || 'تسديد الاقتراضات'}</div>
                          <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={annex4Data.expenses['6121']?.n} onChange={(e) => setAnnex4Data(d => ({ ...d, expenses: { ...d.expenses, ['6121']: { ...d.expenses['6121'], n: e.target.value } } }))} /></div>
                          <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={annex4Data.expenses['6121']?.n1} onChange={(e) => setAnnex4Data(d => ({ ...d, expenses: { ...d.expenses, ['6121']: { ...d.expenses['6121'], n1: e.target.value } } }))} /></div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium">شراء الخدمات الخارجية (613/614)</h4>
                        <div className="grid grid-cols-1 gap-2 mt-2">
                          {['6131','6132','6133','6134','6135','6136','6137','6138','6141','6142','6143'].map(code => {
                            const it = annex4Data.expenses[code];
                            if(!it) return null;
                            return (
                              <div key={code} className="grid grid-cols-12 gap-2 items-center">
                                <div className="col-span-6 text-sm text-right">{it.label}</div>
                                <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={it.n} onChange={(e) => setAnnex4Data(d => ({ ...d, expenses: { ...d.expenses, [code]: { ...d.expenses[code], n: e.target.value } } }))} /></div>
                                <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={it.n1} onChange={(e) => setAnnex4Data(d => ({ ...d, expenses: { ...d.expenses, [code]: { ...d.expenses[code], n1: e.target.value } } }))} /></div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="extra">
                  <AccordionTrigger>مصاريف إضافية</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-2">
                      {['6141','6142','6143'].map(code => {
                        const it = annex4Data.expenses[code];
                        if(!it) return null;
                        return (
                          <div key={code} className="grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-6 text-sm text-right">{it.label}</div>
                            <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={it.n} onChange={(e) => setAnnex4Data(d => ({ ...d, expenses: { ...d.expenses, [code]: { ...d.expenses[code], n: e.target.value } } }))} /></div>
                            <div className="col-span-3"><Input type="number" placeholder="أدخل المبلغ هنا" value={it.n1} onChange={(e) => setAnnex4Data(d => ({ ...d, expenses: { ...d.expenses, [code]: { ...d.expenses[code], n1: e.target.value } } }))} /></div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="notes">
                  <AccordionTrigger>الملاحظات &amp; تصدير</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm">ملاحظات إضافية</label>
                        <textarea className="w-full mt-2 p-2 border rounded" rows={4} value={annex4Data.notes} onChange={(e) => setAnnex4Data(d => ({ ...d, notes: e.target.value }))} placeholder="أدخل ملاحظات هنا" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button onClick={() => { setAnnexes(prev => ({ ...prev, management_4: annex4Data })); setShowAnnex4Modal(false); }}>حفظ</Button>
                        <Button variant="outline" onClick={() => setAnnex4Data(defaultAnnex4)}>مسح</Button>
                        <div className="flex-1" />
                        <Button onClick={() => exportExcel(annex4Data, `annex4_management_${selectedYear}.xlsx`)}><Download className="mr-2 h-4 w-4" />تصدير Excel</Button>
                        <Button onClick={() => exportPDF(annex4Data, `annex4_management_${selectedYear}.pdf`)}><Download className="mr-2 h-4 w-4" />تصدير PDF</Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded">
                  <div className="text-sm text-gray-600">إجمالي العائدات ({selectedYear})</div>
                  <div className="text-lg font-bold">{formatCurrency(annex4Totals.total_revenues_n)}</div>
                  <div className="text-sm text-gray-500 mt-1">{nextYear}: {formatCurrency(annex4Totals.total_revenues_n1)}</div>
                </div>
                <div className="p-4 border rounded">
                  <div className="text-sm text-gray-600">إجمالي التكاليف ({selectedYear})</div>
                  <div className="text-lg font-bold">{formatCurrency(annex4Totals.total_expenses_n)}</div>
                  <div className="text-sm text-gray-500 mt-1">{nextYear}: {formatCurrency(annex4Totals.total_expenses_n1)}</div>
                </div>
                <div className="p-4 border rounded">
                  <div className="text-sm text-gray-600">الفائض/العجز ({selectedYear})</div>
                  <div className="text-lg font-bold">{formatCurrency(annex4Totals.surplus_n)}</div>
                  <div className="text-sm text-gray-500 mt-1">{nextYear}: {formatCurrency(annex4Totals.surplus_n1)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PortalModal>
     )}
    </div>
  );
}