import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { Vote, Clock, Users } from 'lucide-react';

export default function ActiveVoting() {
  const { user } = useAuth();

  const mockVotes = [
    {
      id: '1',
      title: 'Approve New Security System Budget',
      description: 'Vote to approve €15,000 budget for upgrading building security cameras and access control system.',
      deadline: '2024-12-10',
      totalVotes: 89,
      requiredVotes: 124,
      userHasVoted: false,
      type: 'budget'
    },
    {
      id: '2',
      title: 'Garden Renovation Project',
      description: 'Approve landscape renovation including new plants, irrigation system, and seating areas.',
      deadline: '2024-12-15',
      totalVotes: 67,
      requiredVotes: 124,
      userHasVoted: true,
      type: 'improvement'
    },
    {
      id: '3',
      title: 'Change Building Cleaning Schedule',
      description: 'Modify cleaning schedule from weekly to bi-weekly to reduce maintenance costs.',
      deadline: '2024-12-08',
      totalVotes: 45,
      requiredVotes: 124,
      userHasVoted: false,
      type: 'policy'
    }
  ];

  const getTypeBadge = (type) => {
    switch (type) {
      case 'budget':
        return <Badge className="bg-primary/10 text-primary">Budget</Badge>;
      case 'improvement':
        return <Badge className="bg-success/10 text-success">Improvement</Badge>;
      case 'policy':
        return <Badge className="bg-warning/10 text-warning">Policy</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-600">General</Badge>;
    }
  };

  const getProgressPercentage = (current, required) => {
    return Math.min((current / required) * 100, 100);
  };

  if (user?.role === 'supervisor') {
    return null; // Supervisors don't participate in voting
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Vote className="h-5 w-5" />
          <span>Active Voting Sessions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockVotes.map((vote) => (
            <div key={vote.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{vote.title}</h3>
                    {getTypeBadge(vote.type)}
                    {vote.userHasVoted && (
                      <Badge className="bg-success/10 text-success">Voted</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{vote.description}</p>
                </div>
                <div className="ml-4">
                  {vote.userHasVoted ? (
                    <Button disabled>
                      Vote Submitted
                    </Button>
                  ) : (
                    <Button className="bg-primary hover:bg-primary/90">
                      Cast Vote
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Deadline: {vote.deadline}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>Participation: {vote.totalVotes}/{vote.requiredVotes}</span>
                </div>
                <div className="text-gray-500">
                  Progress: {getProgressPercentage(vote.totalVotes, vote.requiredVotes).toFixed(1)}%
                </div>
              </div>
              
              <div className="mt-3">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${getProgressPercentage(vote.totalVotes, vote.requiredVotes)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}