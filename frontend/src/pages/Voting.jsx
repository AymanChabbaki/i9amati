import { Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { mockVotes } from '../data/mockData';

export default function Voting() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleVote = (voteId, vote) => {
    toast({
      title: "Vote Submitted",
      description: "Your vote has been recorded successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('nav.voting')}</h1>
        <p className="mt-1 text-sm text-gray-600">Participate in community decisions and view voting results.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Votes</p>
                <p className="text-2xl font-bold text-gray-900">{mockVotes.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium">📊</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Votes Cast</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <span className="text-success font-medium">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participation Rate</p>
                <p className="text-2xl font-bold text-gray-900">58%</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <span className="text-warning font-medium">%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Voting Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockVotes.map((vote) => (
              <div key={vote.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{vote.title}</h3>
                    <p className="text-gray-600 mt-2">{vote.description}</p>
                    <div className="flex items-center space-x-6 mt-4">
                      <span className="text-sm text-gray-500">
                        {t('voting.deadline')}: {vote.deadline}
                      </span>
                      <span className="text-sm text-gray-500">
                        {t('voting.participation')}: {vote.participated}/{vote.totalOwners} owners
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(vote.participated / vote.totalOwners) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3 ml-6">
                    <Button
                      className="bg-success hover:bg-success/90 text-white"
                      onClick={() => handleVote(vote.id, 'yes')}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      {t('voting.voteYes')}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleVote(vote.id, 'no')}
                    >
                      <X className="mr-2 h-4 w-4" />
                      {t('voting.voteNo')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
