'use client';
import { cn } from '@/lib/utils';
import { getStatusColor } from '@/lib/utils';
import { Loader2, ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import React from 'react';

// ── Loading spinner ────────────────────────────────────────────────────────────
export function Spinner({ size = 20, className }: { size?: number; className?: string }) {
  return <Loader2 size={size} className={cn('animate-spin text-gold-600', className)} />;
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-3">
        <Spinner size={32} />
        <span className="text-stone-400 text-sm">Loading…</span>
      </div>
    </div>
  );
}

// ── Status badge ───────────────────────────────────────────────────────────────
export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn('badge', getStatusColor(status))}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

// ── KPI tile ───────────────────────────────────────────────────────────────────
interface KpiTileProps {
  title:   string;
  value:   string | number;
  icon:    React.ReactNode;
  change?: number;
  changeLabel?: string;
  accent?: string;
}

export function KpiTile({ title, value, icon, change, changeLabel, accent = 'bg-gold-50 text-gold-600' }: KpiTileProps) {
  const isPositive = change !== undefined && change >= 0;
  return (
    <div className="kpi-tile">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-stone-500 text-sm">{title}</p>
          <p className="font-display text-3xl text-stone-900 mt-1">{value}</p>
        </div>
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', accent)}>
          {icon}
        </div>
      </div>
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 text-xs', isPositive ? 'text-green-600' : 'text-red-500')}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Math.abs(change)}% {changeLabel ?? (isPositive ? 'increase' : 'decrease')}</span>
        </div>
      )}
    </div>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────────
interface PaginationProps {
  page:       number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-stone-500 text-sm">
        Page {page + 1} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          className="p-2 rounded-lg hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const p = Math.max(0, Math.min(page - 2, totalPages - 5)) + i;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                p === page ? 'bg-gold-600 text-white' : 'hover:bg-stone-100 text-stone-600'
              )}
            >
              {p + 1}
            </button>
          );
        })}
        <button
          disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          className="p-2 rounded-lg hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="mb-4 text-stone-300">{icon}</div>}
      <h3 className="font-display text-xl text-stone-700 mb-2">{title}</h3>
      {description && <p className="text-stone-400 text-sm max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h3 className="font-display text-xl text-stone-900">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-colors">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ── Page header ────────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, actions }: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="font-display text-2xl text-stone-900">{title}</h1>
        {subtitle && <p className="text-stone-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}

// ── Search + filter bar ────────────────────────────────────────────────────────
export function SearchBar({ value, onChange, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder ?? 'Search…'}
      className="input max-w-xs"
    />
  );
}
