
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'wouter';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { demoUsers } from '../data/demoUsers';
import { Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LanguageSelector from '../components/LanguageSelector';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      setLocation('/dashboard');
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: t('auth.loginError'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <Building className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Iqamati</h1>
          </div>
          <div className="flex justify-center mb-6">
            <LanguageSelector />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">{t('auth.login')}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TEMP DEMO USERS BOX - REMOVE IN PRODUCTION! */}
            <div className="mb-6 p-3 rounded bg-yellow-50 border border-yellow-200 text-xs text-gray-700">
              <div className="font-semibold mb-2 text-yellow-700">Demo/Test Users</div>
              <div className="space-y-1">
                {demoUsers.map((u, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-medium">{u.name}:</span>
                    <span>Email: <span className="font-mono bg-gray-100 px-1 rounded">{u.email}</span></span>
                    <span>Password: <span className="font-mono bg-gray-100 px-1 rounded">{u.password}</span></span>
                    <span className="text-gray-400">({u.role})</span>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? t('common.loading') : t('auth.loginButton')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
