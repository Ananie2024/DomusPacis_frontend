'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { financeApi } from '@/lib/api/financeApi';
import { formatCurrency, downloadBlob } from '@/lib/utils';
import { PageHeader, PageLoader, StatusBadge, KpiTile } from '@/components/ui';
import { Receipt, Download, AlertTriangle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const MOCK_SUMMARIES = [
  { period: 'Q1 2025', vatCollected: 1850000, withholdingTax: 420000, totalTaxLiability: 2270000, filingDeadline: '2025-04-30', status: 'FILED'   },
  { period: 'Q4 2024', vatCollected: 2340000, withholdingTax: 580000, totalTaxLiability: 2920000, filingDeadline: '2025-01-31', status: 'PAID'    },
  { period: 'Q3 2024', vatCollected: 1920000, withholdingTax: 450000, totalTaxLiability: 2370000, filingDeadline: '2024-10-31', status: 'PAID'    },
  { period: 'Q2 2025', vatCollected: 0,       withholdingTax: 0,       totalTaxLiability: 0,       filingDeadline: '2025-07-31', status: 'PENDING' },
];

export default function TaxPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const { data: records, isLoading: recLoading } = useQuery({
    queryKey: ['tax-records', selectedPeriod],
    queryFn: () => financeApi.getTaxRecords({ period: selectedPeriod ?? undefined, size: 20 }),
    enabled: !!selectedPeriod,
  });

  const handleExport = async (period: string) => {
    try {
      const blob = await financeApi.exportTaxReport(period);
      downloadBlob(blob, `Tax-Report-${period}.xlsx`);
    } catch {
      toast.error('Export failed — ensure backend is running');
    }
  };

  const totals = MOCK_SUMMARIES.reduce((acc, s) => ({
    vat:       acc.vat       + s.vatCollected,
    wht:       acc.wht       + s.withholdingTax,
    liability: acc.liability + s.totalTaxLiability,
  }), { vat: 0, wht: 0, liability: 0 });

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader title="Tax & Compliance" subtitle="VAT, withholding tax and Rwanda Revenue Authority reporting" />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <KpiTile title="Total VAT Collected"   value={formatCurrency(totals.vat)}       icon={<Receipt size={18} />} accent="bg-blue-50 text-blue-600" />
        <KpiTile title="Withholding Tax"        value={formatCurrency(totals.wht)}       icon={<Receipt size={18} />} accent="bg-purple-50 text-purple-600" />
        <KpiTile title="Total Tax Liability"    value={formatCurrency(totals.liability)} icon={<AlertTriangle size={18} />} accent="bg-amber-50 text-amber-600" />
      </div>

      {/* Period cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {MOCK_SUMMARIES.map((s) => (
          <div
            key={s.period}
            onClick={() => setSelectedPeriod(s.period === selectedPeriod ? null : s.period)}
            className={cn(
              'card cursor-pointer transition-all duration-200 border-2',
              selectedPeriod === s.period
                ? 'border-gold-400 shadow-gold'
                : 'border-transparent hover:border-stone-200'
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display text-lg text-stone-900">{s.period}</h3>
                <div className="text-stone-400 text-xs">Due: {s.filingDeadline}</div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={s.status} />
                {s.status !== 'PENDING' && (
                  <CheckCircle size={16} className="text-green-500" />
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-stone-400 text-xs mb-0.5">VAT Collected</div>
                <div className="font-semibold text-stone-900">{formatCurrency(s.vatCollected)}</div>
              </div>
              <div>
                <div className="text-stone-400 text-xs mb-0.5">WHT</div>
                <div className="font-semibold text-stone-900">{formatCurrency(s.withholdingTax)}</div>
              </div>
              <div>
                <div className="text-stone-400 text-xs mb-0.5">Total Liability</div>
                <div className="font-semibold text-gold-700">{formatCurrency(s.totalTaxLiability)}</div>
              </div>
            </div>
            {s.status !== 'PENDING' && (
              <button
                onClick={e => { e.stopPropagation(); handleExport(s.period); }}
                className="btn-ghost mt-3 text-xs"
              >
                <Download size={12} /> Export Report
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Tax records detail */}
      {selectedPeriod && (
        <div className="card">
          <h3 className="font-display text-lg text-stone-900 mb-4">Tax Records — {selectedPeriod}</h3>
          {recLoading ? <PageLoader /> : (
            records?.content.length === 0 ? (
              <p className="text-stone-400 text-sm py-6 text-center">No tax records for this period.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr><th>Type</th><th>Rate</th><th>Taxable Amount</th><th>Tax Amount</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {records?.content.map(r => (
                    <tr key={r.id}>
                      <td>{r.taxType}</td>
                      <td>{r.rate}%</td>
                      <td>{formatCurrency(r.taxableAmount)}</td>
                      <td className="font-semibold">{formatCurrency(r.taxAmount)}</td>
                      <td><StatusBadge status={r.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      )}
    </div>
  );
}
