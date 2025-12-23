import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ERPSidebar } from './ERPSidebar';
import { ERPTopbar } from './ERPTopbar';

interface ERPLayoutProps {
  children: ReactNode;
}

export function ERPLayout({ children }: ERPLayoutProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ERPSidebar />
      <ERPTopbar />
      <main className="ml-64 pt-16 p-6 min-h-screen transition-all duration-300">
        <div className="animate-fade-in">{children}</div>
      </main>
    </div>
  );
}
