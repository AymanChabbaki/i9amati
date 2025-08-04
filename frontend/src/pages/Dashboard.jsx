import { RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import QuickStats from '../components/QuickStats';
import RecentPayments from '../components/RecentPayments';
import UpcomingEvents from '../components/UpcomingEvents';
import ActiveVoting from '../components/ActiveVoting';
import CommunityFeed from '../components/CommunityFeed';
import QuickActions from '../components/QuickActions';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "Refreshed",
      description: t('dashboard.refresh'),
    });
  };

  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('dashboard.welcome', { name: user?.name?.split(' ')[0] || 'User' })}
            </h1>
            <p className="mt-1 text-sm text-gray-600">{t('dashboard.subtitle')}</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              {t('dashboard.refresh')}
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RecentPayments />
        </div>
        <div>
          <UpcomingEvents />
        </div>
      </div>

      {/* Active Voting */}
      <ActiveVoting />

      {/* Community and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommunityFeed />
        <QuickActions />
      </div>
    </div>
  );
}
