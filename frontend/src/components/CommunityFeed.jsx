import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, Heart, Share2, Clock, User } from 'lucide-react';

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

  // Facebook-style avatar (could be replaced with real user image)
  const getAvatar = (author) => (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 border border-gray-300">
      <User className="h-6 w-6 text-gray-500" />
    </div>
  );

  return (
    <Card className="bg-[#f0f2f5] border-none shadow-none">
      <CardHeader className="bg-white rounded-t-xl shadow-sm border-b border-gray-200">
        <CardTitle className="flex items-center space-x-2 text-[#1877f2] font-bold text-lg">
          <MessageSquare className="h-6 w-6" />
          <span>Community Feed</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col"
          >
            <div className="flex items-center mb-2">
              {getAvatar(post.author)}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{post.author}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">{post.role}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-800 text-base mb-3 leading-relaxed">{post.content}</p>
            <div className="flex items-center border-t border-gray-100 pt-2 mt-2 space-x-6">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-1 px-2 py-1 rounded-full transition-colors duration-150 ${post.hasLiked ? 'text-[#e53e3e] bg-[#fbe9ea] hover:bg-[#fbe9ea]' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Heart className={`h-4 w-4 ${post.hasLiked ? 'fill-[#e53e3e]' : ''}`} />
                <span className="ml-1 text-sm font-medium">{post.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 px-2 py-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-150"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="ml-1 text-sm font-medium">{post.comments}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 px-2 py-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-150"
              >
                <Share2 className="h-4 w-4" />
                <span className="ml-1 text-sm font-medium">Share</span>
              </Button>
            </div>
          </div>
        ))}
        <div className="pt-2">
          <Button variant="outline" className="w-full rounded-full bg-white shadow-sm border border-gray-200 text-[#1877f2] font-semibold hover:bg-[#f0f2f5] transition-colors duration-150">
            View All Posts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}