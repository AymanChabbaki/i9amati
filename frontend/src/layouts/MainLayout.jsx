import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'wouter';
import TopNavigation from '../components/TopNavigation';
import Sidebar from '../components/Sidebar';

export default function MainLayout({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    setTimeout(() => setLocation('/login'), 0);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 ml-64 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
