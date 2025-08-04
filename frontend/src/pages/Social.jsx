import { Heart, MessageCircle, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { mockPosts } from '../data/mockData';

export default function Social() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleLike = (postId) => {
    toast({
      title: "Liked",
      description: "Your reaction has been added.",
    });
  };

  const handleComment = (postId) => {
    toast({
      title: "Comment",
      description: "Comment feature coming soon.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('nav.social')}</h1>
        <p className="mt-1 text-sm text-gray-600">Connect with your community and stay updated.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Share with Community</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              placeholder="What's happening in your building?"
              rows={3}
            />
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Post Update
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockPosts.map((post) => (
              <div key={post.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">{post.authorInitials}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-900">{post.author}</span>
                      <span className="text-xs text-gray-500">{post.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex items-center space-x-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="text-gray-500 hover:text-primary p-0 h-auto"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        {post.likes} likes
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleComment(post.id)}
                        className="text-gray-500 hover:text-primary p-0 h-auto"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {post.comments} comments
                      </Button>
                    </div>
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
