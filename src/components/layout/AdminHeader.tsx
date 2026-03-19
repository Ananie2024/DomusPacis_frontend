'use client';
import { Menu, Bell, Search } from 'lucide-react';
import { useUIStore }   from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { getInitials }  from '@/lib/utils';

export function AdminHeader() {
  const { toggleSidebar }  = useUIStore();
  const { user }           = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-stone-100 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            placeholder="Search…"
            className="pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-400 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-stone-100 text-stone-500 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* User avatar */}
        {user && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gold-600 flex items-center justify-center text-white text-xs font-bold">
              {getInitials(user.firstName, user.lastName)}
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-stone-800 leading-none">{user.firstName} {user.lastName}</div>
              <div className="text-xs text-stone-400 mt-0.5">{user.role}</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
