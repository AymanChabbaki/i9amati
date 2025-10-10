import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { 
  Home, 
  Building, 
  CreditCard, 
  Vote, 
  AlertTriangle, 
  FileText, 
  Users, 
  DoorOpen, 
  Gavel, 
  Settings,
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { mockStats } from '../data/mockData';

export default function Sidebar() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [location] = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { path: '/dashboard', icon: Home, label: t('nav.dashboard') }
    ];

    if (user?.role === 'property_owner') {
      return [
        ...baseItems,
        { path: '/unit-details', icon: Building, label: t('nav.unitDetails') },
        { 
          path: '/payments', 
          icon: CreditCard, 
          label: t('nav.payments'),
          badge: 2
        },
        { path: '/voting', icon: Vote, label: t('nav.voting') },
        { path: '/complaints', icon: AlertTriangle, label: t('nav.complaints') },
        { path: '/documents', icon: FileText, label: t('nav.documents') },
        { path: '/social', icon: Users, label: t('nav.social') },
        { path: '/visitors', icon: DoorOpen, label: t('nav.visitors') },
        { path: '/legal', icon: Gavel, label: t('nav.legal') }
      ];
    }

  if (user?.role === 'agent' || user?.role === 'union_agent') {
      // Only union_agent sees Manage Apartments, and it's right after Dashboard
      const items = [
        ...baseItems
      ];
      if (user?.role === 'union_agent') {
        items.push({ path: '/manage-apartments', icon: Building, label: 'Manage Apartments' });
      }
      items.push(
        { path: '/payments', icon: CreditCard, label: t('nav.payments') },
        { path: '/meetings', icon: Users, label: 'Meeting Manager' },
        // Accounting parent with submenu children
        { path: '/accounting', icon: FileText, label: 'Accounting', key: 'accounting', children: [
          { path: '/accounting/overview', label: 'Overview' },
          { path: '/accounting/invoices', label: 'Invoices' },
          { path: '/accounting/payments', label: 'Payments' },
          { path: '/accounting/reports', label: 'Reports' },
          { path: '/accounting/new-page', label: 'New Page' }
        ] },
        { path: '/services', icon: Settings, label: 'Service Tracking' },
        { path: '/documents', icon: FileText, label: t('nav.documents') },
        { path: '/alerts', icon: AlertTriangle, label: 'Alerts & Notifications' },
        { path: '/social', icon: Users, label: t('nav.social') }
      );

      // For union_agent role add a Union Agent parent submenu
      if (user?.role === 'union_agent') {
        items.push({ path: '/union', icon: Users, label: 'Union Agent', key: 'unionAgent', children: [
          { path: '/union/members', label: 'Members' },
          { path: '/union/contracts', label: 'Contracts' },
          { path: '/union/new-page', label: 'New Page' }
        ] });
      }
      return items;
    }

    if (user?.role === 'supervisor') {
      return [
        ...baseItems,
        { path: '/agents', icon: User, label: 'Agent Evaluation' },
        { path: '/residences', icon: Building, label: 'Residence Setup' },
        { path: '/social', icon: Users, label: t('nav.social') }
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  // expand state for submenus (persist open for accounting if current route matches)
  const [expanded, setExpanded] = useState(() => ({
    accounting: location.startsWith('/accounting'),
    unionAgent: location.startsWith('/union')
  }));

  useEffect(() => {
    // keep accounting expanded when navigating inside it
    if (location.startsWith('/accounting')) setExpanded(e => ({ ...e, accounting: true }));
    if (location.startsWith('/union')) setExpanded(e => ({ ...e, unionAgent: true }));
  }, [location]);

  return (
    <aside className="w-64 bg-white shadow-sm h-screen fixed left-0 top-16 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        {/* Role Badge */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
              <div className="text-xs text-primary font-medium">{t(`auth.${user?.role}`)}</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path || (location === '/' && item.path === '/dashboard');

            // if item has children render parent with toggle
            if (item.children && item.children.length > 0) {
              const isExpanded = expanded[item.key];
              return (
                <div key={item.path}>
                  <Link href={item.path} onClick={() => setExpanded(e => ({ ...e, [item.key]: !e[item.key] }))} className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-50"
                  )}>
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto bg-warning text-white">{item.badge}</Badge>
                    )}
                  </Link>

                  {isExpanded && (
                    <nav className="mt-2 space-y-1">
                      {item.children.map((child) => {
                        const isChildActive = location === child.path;
                        return (
                          <Link key={child.path} href={child.path} className={cn(
                            "flex items-center pl-8 pr-3 py-2 rounded-md text-sm font-medium transition-colors",
                            isChildActive ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50"
                          )}>
                            {/* keep same icon spacing but no icon for children */}
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </nav>
                  )}
                </div>
              );
            }

            return (
              <Link key={item.path} href={item.path} className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 hover:bg-gray-50"
              )}>
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto bg-warning text-white">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Settings at bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link href="/settings" className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            location === '/settings'
              ? "bg-primary/10 text-primary" 
              : "text-gray-700 hover:bg-gray-50"
          )}>
            <Settings className="h-5 w-5" />
            <span>{t('nav.settings')}</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
