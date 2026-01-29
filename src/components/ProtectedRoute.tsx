import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Suspense } from 'react';
import { TrendingUp } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AdminLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-muted animate-pulse" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Loading admin panel...</p>
    </div>
  </div>
);

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Suspense fallback={<AdminLoader />}>
      {children}
    </Suspense>
  );
};

export default ProtectedRoute;
