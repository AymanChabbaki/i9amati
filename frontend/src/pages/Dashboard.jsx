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



import AddApartment from '../components/AddApartment';
import UnionAgentSummary from '../components/UnionAgentSummary';
import { useState } from 'react';



export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const [newOwners, setNewOwners] = useState([]);


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

  {/* Add Apartment (for agents) */}
  {(user?.role === 'agent' || user?.role === 'union_agent') && (
        <div className="mb-8">
          <AddApartment onApartmentAdded={data => setNewOwners(data.owners || [])} />
          <UnionAgentSummary newOwners={newOwners} />
        </div>
      )}

      {/* Upcoming Events - full width */}
      <div className="mb-8">
        <UpcomingEvents />
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="space-y-6">
          <ActiveVoting />
          <RecentPayments />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <CommunityFeed />
        </div>
      </div>
    </div>
  );
}
