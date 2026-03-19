'use client';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader }  from '@/components/layout/AdminHeader';
import { useUIStore }   from '@/stores/uiStore';
import { cn }           from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-stone-50 flex">
      <AdminSidebar />
      <div className={cn(
        'flex-1 flex flex-col min-w-0 transition-all duration-300',
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
      )}>
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
