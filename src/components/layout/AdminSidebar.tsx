'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, CalendarDays, Users, UserCog,
  Package, DollarSign, Receipt, BarChart3,
  ChevronLeft, ChevronRight, LogOut, ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';

const NAV = [
  { label: 'Dashboard',   href: '/dashboard',  icon: LayoutDashboard },
  { label: 'Bookings',    href: '/bookings',   icon: CalendarDays    },
  { label: 'Customers',   href: '/customers',  icon: Users           },
  { label: 'Staff',       href: '/staff',      icon: UserCog         },
  { label: 'Users',       href: '/users',      icon: ShieldCheck     },
  { label: 'Inventory',   href: '/inventory',  icon: Package         },
  { label: 'Finance',     href: '/finance',    icon: DollarSign      },
  { label: 'Tax',         href: '/tax',        icon: Receipt         },
  { label: 'Analytics',   href: '/analytics',  icon: BarChart3       },
];

export function AdminSidebar() {
  const pathname    = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user, clearAuth } = useAuthStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-stone-950 border-r border-stone-800 z-40',
        'flex flex-col transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-16',
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-5 border-b border-stone-800',
        !sidebarOpen && 'justify-center px-0',
      )}>
        <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          ✝
        </div>
        {sidebarOpen && (
          <div className="min-w-0">
            <div className="font-display text-white text-sm font-semibold truncate">Domus Pacis</div>
            <div className="text-gold-500 text-[9px] uppercase tracking-widest">Admin Portal</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto scrollbar-thin">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              title={!sidebarOpen ? label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                sidebarOpen ? '' : 'justify-center',
                active
                  ? 'bg-gold-500/15 text-gold-400'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-100',
              )}
            >
              <Icon size={17} className="flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={cn('border-t border-stone-800 p-3 space-y-1', !sidebarOpen && 'flex flex-col items-center')}>
        {sidebarOpen && user && (
          <div className="px-3 py-2 rounded-xl bg-stone-900 mb-2">
            <div className="text-white text-xs font-medium truncate">{user.firstName} {user.lastName}</div>
            <div className="text-stone-500 text-[10px] truncate">{user.role}</div>
          </div>
        )}
        <button
          onClick={clearAuth}
          title="Log Out"
          className={cn(
            'flex items-center gap-2 px-3 py-2.5 rounded-xl text-stone-500 hover:bg-stone-800 hover:text-red-400 transition-all text-sm w-full',
            !sidebarOpen && 'justify-center',
          )}
        >
          <LogOut size={16} />
          {sidebarOpen && <span>Log Out</span>}
        </button>
        <button
          onClick={toggleSidebar}
          title={sidebarOpen ? 'Collapse' : 'Expand'}
          className={cn(
            'hidden lg:flex items-center gap-2 px-3 py-2.5 rounded-xl text-stone-500 hover:bg-stone-800 hover:text-white transition-all text-sm w-full',
            !sidebarOpen && 'justify-center',
          )}
        >
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          {sidebarOpen && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
