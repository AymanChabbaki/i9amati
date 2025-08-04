import { User, Bell, Globe, Shield, CreditCard, Building } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    unit: user?.unit || 'A101'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    votingReminders: true,
    paymentReminders: true,
    communityUpdates: true,
    maintenanceAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'community',
    contactVisibility: 'owners',
    activityVisibility: 'private'
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved.",
    });
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    toast({
      title: "Language Changed",
      description: `Interface language changed to ${newLanguage.toUpperCase()}`,
    });
  };

  const languageOptions = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'fr', label: '🇫🇷 Français' },
    { value: 'ar', label: '🇸🇦 العربية' },
    { value: 'tz', label: '🏔️ Tamazight' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('nav.settings')}</h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'ar' ? 'إدارة إعدادات حسابك وتفضيلاتك' :
           language === 'fr' ? 'Gérez les paramètres de votre compte et vos préférences' :
           language === 'tz' ? 'Sefrek tiseɣsal n umiḍan-nnek d ismenyafen-nnek' :
           'Manage your account settings and preferences'}
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'الملف الشخصي' : language === 'fr' ? 'Profil' : language === 'tz' ? 'Amaɣnu' : 'Profile'}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'الإشعارات' : language === 'fr' ? 'Notifications' : language === 'tz' ? 'Ilɣuyen' : 'Notifications'}
          </TabsTrigger>
          <TabsTrigger value="language">
            <Globe className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'اللغة' : language === 'fr' ? 'Langue' : language === 'tz' ? 'Tutlayt' : 'Language'}
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Shield className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'الخصوصية' : language === 'fr' ? 'Confidentialité' : language === 'tz' ? 'Tabaḍnit' : 'Privacy'}
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'الفواتير' : language === 'fr' ? 'Facturation' : language === 'tz' ? 'Afatures' : 'Billing'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'معلومات الملف الشخصي' : 
                 language === 'fr' ? 'Informations du profil' :
                 language === 'tz' ? 'Talɣutin n umaɣnu' :
                 'Profile Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {language === 'ar' ? 'الاسم الكامل' : language === 'fr' ? 'Nom complet' : language === 'tz' ? 'Isem ačuran' : 'Full Name'}
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'ar' ? 'البريد الإلكتروني' : language === 'fr' ? 'Email' : language === 'tz' ? 'Imayl' : 'Email'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {language === 'ar' ? 'رقم الهاتف' : language === 'fr' ? 'Téléphone' : language === 'tz' ? 'Uṭṭun n tiliɣri' : 'Phone Number'}
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">
                    {language === 'ar' ? 'رقم الوحدة' : language === 'fr' ? 'Numéro d\'unité' : language === 'tz' ? 'Uṭṭun n tanaṣt' : 'Unit Number'}
                  </Label>
                  <Input
                    id="unit"
                    value={profile.unit}
                    onChange={(e) => setProfile({ ...profile, unit: e.target.value })}
                    disabled
                  />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile}>
                  {language === 'ar' ? 'حفظ التغييرات' : language === 'fr' ? 'Sauvegarder' : language === 'tz' ? 'Sekles ibeddilen' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'تفضيلات الإشعارات' : 
                 language === 'fr' ? 'Préférences de notification' :
                 language === 'tz' ? 'Ismenyafen n ilɣuyen' :
                 'Notification Preferences'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === 'ar' ? 'إشعارات البريد الإلكتروني' : 
                       language === 'fr' ? 'Notifications par email' :
                       language === 'tz' ? 'Ilɣuyen s imayl' :
                       'Email Notifications'}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'تلقي الإشعارات عبر البريد الإلكتروني' : 
                       language === 'fr' ? 'Recevoir des notifications par email' :
                       language === 'tz' ? 'Ṭṭef ilɣuyen s imayl' :
                       'Receive notifications via email'}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === 'ar' ? 'رسائل نصية' : 
                       language === 'fr' ? 'SMS' :
                       language === 'tz' ? 'Iznan n uḍris' :
                       'SMS Notifications'}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'تلقي الإشعارات عبر الرسائل النصية' : 
                       language === 'fr' ? 'Recevoir des notifications par SMS' :
                       language === 'tz' ? 'Ṭṭef ilɣuyen s iznan n uḍris' :
                       'Receive notifications via SMS'}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, smsNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === 'ar' ? 'الإشعارات الفورية' : 
                       language === 'fr' ? 'Notifications push' :
                       language === 'tz' ? 'Ilɣuyen n teskart' :
                       'Push Notifications'}
                    </Label>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'تلقي الإشعارات الفورية في المتصفح' : 
                       language === 'fr' ? 'Recevoir des notifications dans le navigateur' :
                       language === 'tz' ? 'Ṭṭef ilɣuyen deg iminig' :
                       'Receive push notifications in browser'}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, pushNotifications: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === 'ar' ? 'تذكيرات التصويت' : 
                       language === 'fr' ? 'Rappels de vote' :
                       language === 'tz' ? 'Ictiwalen n uferz' :
                       'Voting Reminders'}
                    </Label>
                  </div>
                  <Switch
                    checked={notifications.votingReminders}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, votingReminders: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === 'ar' ? 'تذكيرات الدفع' : 
                       language === 'fr' ? 'Rappels de paiement' :
                       language === 'tz' ? 'Ictiwalen n uxlas' :
                       'Payment Reminders'}
                    </Label>
                  </div>
                  <Switch
                    checked={notifications.paymentReminders}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, paymentReminders: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === 'ar' ? 'تحديثات المجتمع' : 
                       language === 'fr' ? 'Mises à jour communautaires' :
                       language === 'tz' ? 'Isemallen n tmetti' :
                       'Community Updates'}
                    </Label>
                  </div>
                  <Switch
                    checked={notifications.communityUpdates}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, communityUpdates: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>
                      {language === 'ar' ? 'تنبيهات الصيانة' : 
                       language === 'fr' ? 'Alertes de maintenance' :
                       language === 'tz' ? 'Ilɣuyen n ussefṛu' :
                       'Maintenance Alerts'}
                    </Label>
                  </div>
                  <Switch
                    checked={notifications.maintenanceAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, maintenanceAlerts: checked })
                    }
                  />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  {language === 'ar' ? 'حفظ التفضيلات' : language === 'fr' ? 'Sauvegarder' : language === 'tz' ? 'Sekles ismenyafen' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إعدادات اللغة' : 
                 language === 'fr' ? 'Paramètres de langue' :
                 language === 'tz' ? 'Tiseɣsal n tutlayt' :
                 'Language Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>
                    {language === 'ar' ? 'لغة الواجهة' : 
                     language === 'fr' ? 'Langue de l\'interface' :
                     language === 'tz' ? 'Tutlayt n ugrudem' :
                     'Interface Language'}
                  </Label>
                  <p className="text-sm text-gray-500 mb-3">
                    {language === 'ar' ? 'اختر لغة واجهة التطبيق' : 
                     language === 'fr' ? 'Choisissez la langue de l\'interface' :
                     language === 'tz' ? 'Fren tutlayt n ugrudem' :
                     'Choose your preferred interface language'}
                  </p>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-blue-900">
                        {language === 'ar' ? 'دعم الكتابة من اليمين إلى اليسار' : 
                         language === 'fr' ? 'Support de l\'écriture droite à gauche' :
                         language === 'tz' ? 'Asefrek n tira seg ufasi ɣer azelmaḍ' :
                         'Right-to-Left Support'}
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        {language === 'ar' ? 'يدعم التطبيق الكتابة من اليمين إلى اليسار للعربية والأمازيغية' : 
                         language === 'fr' ? 'L\'application prend en charge l\'écriture de droite à gauche pour l\'arabe et le tamazight' :
                         language === 'tz' ? 'Asnas-a isefrak tira seg ufasi ɣer azelmaḍ i tɛrabt d tmaziɣt' :
                         'The application supports right-to-left writing for Arabic and Amazigh languages'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إعدادات الخصوصية' : 
                 language === 'fr' ? 'Paramètres de confidentialité' :
                 language === 'tz' ? 'Tiseɣsal n tbaḍnit' :
                 'Privacy Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>
                    {language === 'ar' ? 'مرئية الملف الشخصي' : 
                     language === 'fr' ? 'Visibilité du profil' :
                     language === 'tz' ? 'Tukksa n umaɣnu' :
                     'Profile Visibility'}
                  </Label>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        {language === 'ar' ? 'عام' : language === 'fr' ? 'Public' : language === 'tz' ? 'Azayez' : 'Public'}
                      </SelectItem>
                      <SelectItem value="community">
                        {language === 'ar' ? 'المجتمع فقط' : language === 'fr' ? 'Communauté seulement' : language === 'tz' ? 'Tametti kan' : 'Community Only'}
                      </SelectItem>
                      <SelectItem value="private">
                        {language === 'ar' ? 'خاص' : language === 'fr' ? 'Privé' : language === 'tz' ? 'Uslig' : 'Private'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>
                    {language === 'ar' ? 'مرئية معلومات التواصل' : 
                     language === 'fr' ? 'Visibilité des contacts' :
                     language === 'tz' ? 'Tukksa n telɣutin n unermis' :
                     'Contact Visibility'}
                  </Label>
                  <Select
                    value={privacy.contactVisibility}
                    onValueChange={(value) => setPrivacy({ ...privacy, contactVisibility: value })}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owners">
                        {language === 'ar' ? 'المالكين فقط' : language === 'fr' ? 'Propriétaires seulement' : language === 'tz' ? 'Imseɣza kan' : 'Owners Only'}
                      </SelectItem>
                      <SelectItem value="agents">
                        {language === 'ar' ? 'الوكلاء فقط' : language === 'fr' ? 'Agents seulement' : language === 'tz' ? 'Inegaṛen kan' : 'Agents Only'}
                      </SelectItem>
                      <SelectItem value="private">
                        {language === 'ar' ? 'خاص' : language === 'fr' ? 'Privé' : language === 'tz' ? 'Uslig' : 'Private'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>
                    {language === 'ar' ? 'مرئية النشاط' : 
                     language === 'fr' ? 'Visibilité de l\'activité' :
                     language === 'tz' ? 'Tukksa n urmud' :
                     'Activity Visibility'}
                  </Label>
                  <Select
                    value={privacy.activityVisibility}
                    onValueChange={(value) => setPrivacy({ ...privacy, activityVisibility: value })}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        {language === 'ar' ? 'عام' : language === 'fr' ? 'Public' : language === 'tz' ? 'Azayez' : 'Public'}
                      </SelectItem>
                      <SelectItem value="community">
                        {language === 'ar' ? 'المجتمع فقط' : language === 'fr' ? 'Communauté seulement' : language === 'tz' ? 'Tametti kan' : 'Community Only'}
                      </SelectItem>
                      <SelectItem value="private">
                        {language === 'ar' ? 'خاص' : language === 'fr' ? 'Privé' : language === 'tz' ? 'Uslig' : 'Private'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button onClick={handleSavePrivacy}>
                  {language === 'ar' ? 'حفظ الإعدادات' : language === 'fr' ? 'Sauvegarder' : language === 'tz' ? 'Sekles tiseɣsal' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'معلومات الفواتير' : 
                 language === 'fr' ? 'Informations de facturation' :
                 language === 'tz' ? 'Talɣutin n ufaɛures' :
                 'Billing Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Building className="h-8 w-8 text-primary" />
                      <Badge variant="secondary">
                        {language === 'ar' ? 'نشط' : language === 'fr' ? 'Actif' : language === 'tz' ? 'Urmid' : 'Active'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? 'رسوم شهرية' : 
                       language === 'fr' ? 'Charges mensuelles' :
                       language === 'tz' ? 'Irden n wayyur' :
                       'Monthly Charges'}
                    </h3>
                    <p className="text-2xl font-bold text-primary mb-2">€320.00</p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'تشمل الصيانة والأمن والمرافق العامة' : 
                       language === 'fr' ? 'Inclut maintenance, sécurité et services communs' :
                       language === 'tz' ? 'Deg-s ussefṛu, ṭahhurt d tanfa tazayezt' :
                       'Includes maintenance, security, and common facilities'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <CreditCard className="h-8 w-8 text-success" />
                      <Badge className="bg-success/10 text-success hover:bg-success/20">
                        {language === 'ar' ? 'مُدفوع' : language === 'fr' ? 'Payé' : language === 'tz' ? 'Yettwaxles' : 'Paid'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? 'حالة الدفع' : 
                       language === 'fr' ? 'Statut de paiement' :
                       language === 'tz' ? 'Addad n uxlas' :
                       'Payment Status'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ? 'جميع المدفوعات محدثة حتى نوفمبر 2024' : 
                       language === 'fr' ? 'Tous les paiements à jour jusqu\'en novembre 2024' :
                       language === 'tz' ? 'Akk ixlasaten d imaynuten armi ɣer nwanbir 2024' :
                       'All payments up to date through November 2024'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {language === 'ar' ? 'طرق الدفع' : 
                   language === 'fr' ? 'Méthodes de paiement' :
                   language === 'tz' ? 'Tarrayin n uxlas' :
                   'Payment Methods'}
                </h3>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/27</p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {language === 'ar' ? 'افتراضي' : language === 'fr' ? 'Par défaut' : language === 'tz' ? 'Amezwer' : 'Default'}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />
              
              <div className="flex justify-between">
                <Button variant="outline">
                  {language === 'ar' ? 'إضافة طريقة دفع' : 
                   language === 'fr' ? 'Ajouter méthode de paiement' :
                   language === 'tz' ? 'Rnu tarrayt n uxlas' :
                   'Add Payment Method'}
                </Button>
                <Button onClick={logout} variant="destructive">
                  {language === 'ar' ? 'تسجيل الخروج' : 
                   language === 'fr' ? 'Se déconnecter' :
                   language === 'tz' ? 'Ffer' :
                   'Sign Out'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
