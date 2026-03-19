'use client';
import { useQuery } from '@tanstack/react-query';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  CalendarDays, Users, DollarSign, Package,
  TrendingUp, CheckCircle, Clock, AlertTriangle,
} from 'lucide-react';
import { analyticsApi } from '@/lib/api/analyticsApi';
import { KpiTile, PageLoader, PageHeader } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';

const MOCK_REVENUE: { month: string; revenue: number; expenses: number }[] = [
  { month: 'Jul', revenue: 4200000, expenses: 2100000 },
  { month: 'Aug', revenue: 5800000, expenses: 2400000 },
  { month: 'Sep', revenue: 4900000, expenses: 2200000 },
  { month: 'Oct', revenue: 6700000, expenses: 2800000 },
  { month: 'Nov', revenue: 5200000, expenses: 2300000 },
  { month: 'Dec', revenue: 8100000, expenses: 3100000 },
  { month: 'Jan', revenue: 3900000, expenses: 2000000 },
  { month: 'Feb', revenue: 4600000, expenses: 2100000 },
  { month: 'Mar', revenue: 5100000, expenses: 2250000 },
];

const MOCK_SERVICES = [
  { name: 'Rooms',       value: 42, color: '#d4a017' },
  { name: 'Conferences', value: 28, color: '#7e1b38' },
  { name: 'Weddings',    value: 18, color: '#e87575' },
  { name: 'Retreats',    value: 12, color: '#6ba3be' },
];

const MOCK_ACTIVITY = [
  { id: 1, type: 'Booking Confirmed', desc: 'Emmanuel Nkurunziza — Suite × 3 nights', time: '10 min ago', color: 'text-green-600' },
  { id: 2, type: 'Payment Received',  desc: '450,000 RWF — Invoice #INV-2024-0318', time: '34 min ago', color: 'text-blue-600' },
  { id: 3, type: 'New Customer',      desc: 'Diane Hakizimana registered', time: '1 hr ago',  color: 'text-gold-600' },
  { id: 4, type: 'Low Stock Alert',   desc: 'Mineral Water below reorder level', time: '2 hr ago',  color: 'text-red-600' },
  { id: 5, type: 'Booking Pending',   desc: 'Conference Hall — TechRwanda NGO', time: '3 hr ago',  color: 'text-amber-600' },
];

export default function DashboardPage() {
  const { data: kpis, isLoading } = useQuery({
    queryKey: ['dashboard-kpis'],
    queryFn: () => analyticsApi.getOverviewKpis(),
    // fallback to mock data on API error
    retry: false,
  });

  const display = kpis ?? {
    todayCheckIns:    4,
    todayCheckOuts:   3,
    pendingBookings:  12,
    confirmedBookings: 28,
    monthlyRevenue:   5100000,
    monthlyExpenses:  2250000,
    lowStockItems:    3,
    totalCustomers:   847,
    occupancyRate:    72,
    revenueGrowth:    10.8,
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back — ${formatDate(new Date().toISOString(), 'EEEE, MMMM d yyyy')}`}
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile
          title="Monthly Revenue"
          value={formatCurrency(display.monthlyRevenue)}
          icon={<DollarSign size={18} />}
          change={display.revenueGrowth}
          changeLabel="vs last month"
          accent="bg-gold-50 text-gold-600"
        />
        <KpiTile
          title="Confirmed Bookings"
          value={display.confirmedBookings}
          icon={<CheckCircle size={18} />}
          accent="bg-green-50 text-green-600"
        />
        <KpiTile
          title="Pending Bookings"
          value={display.pendingBookings}
          icon={<Clock size={18} />}
          accent="bg-amber-50 text-amber-600"
        />
        <KpiTile
          title="Total Customers"
          value={display.totalCustomers.toLocaleString()}
          icon={<Users size={18} />}
          change={5.2}
          accent="bg-blue-50 text-blue-600"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile
          title="Occupancy Rate"
          value={`${display.occupancyRate}%`}
          icon={<CalendarDays size={18} />}
          accent="bg-purple-50 text-purple-600"
        />
        <KpiTile
          title="Today's Check-ins"
          value={display.todayCheckIns}
          icon={<TrendingUp size={18} />}
          accent="bg-teal-50 text-teal-600"
        />
        <KpiTile
          title="Monthly Expenses"
          value={formatCurrency(display.monthlyExpenses)}
          icon={<DollarSign size={18} />}
          accent="bg-rose-50 text-rose-600"
        />
        <KpiTile
          title="Low Stock Alerts"
          value={display.lowStockItems}
          icon={<AlertTriangle size={18} />}
          accent="bg-red-50 text-red-600"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 card">
          <h3 className="font-display text-lg text-stone-900 mb-5">Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={MOCK_REVENUE} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#d4a017" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#d4a017" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#7e1b38" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#7e1b38" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `${(v/1e6).toFixed(1)}M`} tick={{ fontSize: 10, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 8, border: '1px solid #e7e5e4', fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue"  stroke="#d4a017" strokeWidth={2} fill="url(#rev)" name="Revenue" />
              <Area type="monotone" dataKey="expenses" stroke="#7e1b38" strokeWidth={2} fill="url(#exp)" name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service popularity */}
        <div className="card">
          <h3 className="font-display text-lg text-stone-900 mb-5">Service Popularity</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={MOCK_SERVICES} cx="50%" cy="50%" innerRadius={50} outerRadius={78} dataKey="value" paddingAngle={3}>
                {MOCK_SERVICES.map((s, i) => (
                  <Cell key={i} fill={s.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {MOCK_SERVICES.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-stone-600">{s.name}</span>
                </div>
                <span className="font-medium text-stone-800">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly bookings bar */}
        <div className="card">
          <h3 className="font-display text-lg text-stone-900 mb-5">Monthly Bookings</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MOCK_REVENUE} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#a8a29e' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1e6).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="revenue" fill="#d4a017" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity feed */}
        <div className="card">
          <h3 className="font-display text-lg text-stone-900 mb-5">Recent Activity</h3>
          <div className="space-y-4">
            {MOCK_ACTIVITY.map((a) => (
              <div key={a.id} className="flex items-start gap-3 text-sm">
                <div className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.color.replace('text-', 'bg-')}`} />
                <div className="flex-1 min-w-0">
                  <div className={`font-medium ${a.color}`}>{a.type}</div>
                  <div className="text-stone-500 truncate">{a.desc}</div>
                </div>
                <span className="text-stone-400 text-xs flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
