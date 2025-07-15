'use client';

import { useMemo, useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarNav } from '@/components/Common/sidebar-nav';
import { SmoothTransition } from '@/components/ui/smooth-transition';
import { Copyright } from '@/components/copyRight';
import { useMediaQuery } from '@/hooks/use-mobile';
import { User } from '@/types/user';

interface DashboardLayoutProps {
  children: React.ReactNode;
  serverUser?: User | null;  
}

export default function DashboardLayout({
  children,
  serverUser 
}: DashboardLayoutProps) {
  const { user: clientUser, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const user = serverUser || clientUser;

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const activeMenu = useMemo(() => {
    if (!pathname) return 'Dashboard';
    const currentPath = pathname.split('/dashboard/')[1]?.split('/')[0] || '';
    return currentPath ? currentPath.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') : 'Dashboard';
  }, [pathname]);

  if (isLoading || (!user && !serverUser)) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0d0d0d]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-gray-200">
      <SidebarNav 
        user={user} 
        isMobile={isMobile} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        logout={logout}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#1a1a1a] p-4 border-b border-[#333] flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mr-4 p-1 rounded-md hover:bg-[#333]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <h1 className="text-xl font-semibold text-white">{activeMenu}</h1>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-6 bg-[#0d0d0d]">
          <SmoothTransition>
            {children}
          </SmoothTransition>
          <Copyright />
        </div>
      </main>
    </div>
  );
}