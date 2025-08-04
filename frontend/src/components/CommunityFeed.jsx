import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, Heart, Share2, Clock } from 'lucide-react';

export default function CommunityFeed() {
  const { user } = useAuth();

  const mockPosts = [
    {
      id: '1',
      author: 'Sarah Johnson',
      role: 'Agent',
      content: 'The new security system installation is scheduled for this weekend. Please ensure vehicles are moved from the main entrance area.',
      timestamp: '2 hours ago',
      likes: 12,
      comments: 3,
      hasLiked: false
    },
    {
      id: '2',
      author: 'Ahmed Benali',
      role: 'Owner',
      content: 'Thanks to everyone who participated in the garden renovation vote! The new landscaping will begin next month.',
      timestamp: '5 hours ago',
      likes: 8,
      comments: 7,
      hasLiked: true
    },
    {
      id: '3',
      author: 'Marie Dubois',
      role: 'Agent',
      content: 'Reminder: Monthly maintenance fees are due by the 15th. Online payment is now available through the resident portal.',
      timestamp: '1 day ago',
      likes: 15,
      comments: 2,
      hasLiked: false
    }
  ];

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Agent':
        return '🏢';
      case 'Owner':
        return '🏠';
      case 'Supervisor':
        return '👔';
      default:
        return '👤';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>Community Feed</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPosts.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getRoleBadge(post.role)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">{post.author}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{post.role}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{post.content}</p>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`flex items-center space-x-1 ${post.hasLiked ? 'text-red-500' : 'text-gray-500'}`}
                    >
                      <Heart className={`h-4 w-4 ${post.hasLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button variant="outline" className="w-full">
            View All Posts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}