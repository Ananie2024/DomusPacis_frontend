import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'RWF'): string {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string, fmt = 'MMM dd, yyyy'): string {
  try {
    return format(parseISO(dateStr), fmt);
  } catch {
    return dateStr;
  }
}

export function formatDateRelative(dateStr: string): string {
  try {
    return formatDistanceToNow(parseISO(dateStr), { addSuffix: true });
  } catch {
    return dateStr;
  }
}

export function formatDateTime(dateStr: string): string {
  return formatDate(dateStr, 'MMM dd, yyyy HH:mm');
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '…';
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end   = new Date(checkOut);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    PENDING:    'bg-amber-100 text-amber-800 border-amber-200',
    CONFIRMED:  'bg-blue-100 text-blue-800 border-blue-200',
    CHECKED_IN: 'bg-green-100 text-green-800 border-green-200',
    COMPLETED:  'bg-stone-100 text-stone-700 border-stone-200',
    CANCELLED:  'bg-red-100 text-red-800 border-red-200',
    PAID:       'bg-emerald-100 text-emerald-800 border-emerald-200',
    UNPAID:     'bg-red-100 text-red-800 border-red-200',
    PARTIAL:    'bg-orange-100 text-orange-800 border-orange-200',
    ACTIVE:     'bg-green-100 text-green-800 border-green-200',
    INACTIVE:   'bg-stone-100 text-stone-600 border-stone-200',
    FILED:      'bg-blue-100 text-blue-800 border-blue-200',
    OVERDUE:    'bg-red-100 text-red-800 border-red-200',
    PROCESSED:  'bg-purple-100 text-purple-800 border-purple-200',
  };
  return map[status] ?? 'bg-stone-100 text-stone-600 border-stone-200';
}

export function parseApiError(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const resp = (error as { response?: { data?: { message?: string } } }).response;
    return resp?.data?.message || 'An error occurred';
  }
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}
