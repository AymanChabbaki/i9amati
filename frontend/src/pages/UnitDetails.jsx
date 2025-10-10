import { Building, Home, Percent } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UnitDetails() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('nav.unitDetails')}</h1>
        <p className="mt-1 text-sm text-gray-600">View your unit information and ownership details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Unit Number</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{user?.unit || 'A101'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Percent className="h-5 w-5" />
              <span>Ownership Share</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{user?.ownershipShare || 12.5}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Building</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">Complex A</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Unit Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Property Information</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Type:</dt>
                  <dd className="text-sm text-gray-900">Residential Apartment</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Floor:</dt>
                  <dd className="text-sm text-gray-900">3rd Floor</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Area:</dt>
                  <dd className="text-sm text-gray-900">85 m²</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Bedrooms:</dt>
                  <dd className="text-sm text-gray-900">2</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Bathrooms:</dt>
                  <dd className="text-sm text-gray-900">1</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Financial Information</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Monthly Charges:</dt>
                  <dd className="text-sm text-gray-900">€320.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Property Value:</dt>
                  <dd className="text-sm text-gray-900">€285,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Last Assessment:</dt>
                  <dd className="text-sm text-gray-900">Jan 2024</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Insurance:</dt>
                  <dd className="text-sm text-gray-900">Active</dd>
                </div>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
