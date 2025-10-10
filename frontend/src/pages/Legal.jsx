import { Gavel, BookOpen, MessageCircle, Video, FileText, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Legal() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      type: 'bot',
      message: language === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك في الأمور القانونية؟' : 
               language === 'fr' ? 'Bonjour! Comment puis-je vous aider avec les questions juridiques?' :
               language === 'tz' ? 'Azul! Amek i zemreɣ ad k-εawneɣ s tmeslayin tizgaranin?' :
               'Hello! How can I help you with legal matters?',
      timestamp: 'now'
    }
  ]);

  const mockVideos = [
    {
      id: '1',
      title: language === 'ar' ? 'حقوق وواجبات المالك' : 
             language === 'fr' ? 'Droits et devoirs du propriétaire' :
             language === 'tz' ? 'Izerfan d twuriwin n bab n teɣult' :
             'Owner Rights and Responsibilities',
      duration: '15:30',
      category: language === 'ar' ? 'الحقوق' : 
                language === 'fr' ? 'Droits' :
                language === 'tz' ? 'Izerfan' :
                'Rights',
      thumbnail: '🏠'
    },
    {
      id: '2',
      title: language === 'ar' ? 'عملية التصويت والقرارات' : 
             language === 'fr' ? 'Processus de vote et décisions' :
             language === 'tz' ? 'Akala n uferz d tebrat' :
             'Voting Process and Decisions',
      duration: '12:45',
      category: language === 'ar' ? 'التصويت' : 
                language === 'fr' ? 'Vote' :
                language === 'tz' ? 'Aferz' :
                'Voting',
      thumbnail: '🗳️'
    },
    {
      id: '3',
      title: language === 'ar' ? 'إدارة الشكاوى والنزاعات' : 
             language === 'fr' ? 'Gestion des plaintes et conflits' :
             language === 'tz' ? 'Asefrek n iseɣbaten d imennuɣen' :
             'Complaint and Dispute Management',
      duration: '18:20',
      category: language === 'ar' ? 'النزاعات' : 
                language === 'fr' ? 'Conflits' :
                language === 'tz' ? 'Imennuɣen' :
                'Disputes',
      thumbnail: '⚖️'
    }
  ];

  const mockArticles = [
    {
      id: '1',
      title: language === 'ar' ? 'دليل المالك الجديد' : 
             language === 'fr' ? 'Guide du nouveau propriétaire' :
             language === 'tz' ? 'Amnir n bab n teɣult amaynu' :
             'New Owner\'s Guide',
      summary: language === 'ar' ? 'كل ما تحتاج معرفته كمالك جديد في المجمع السكني' : 
               language === 'fr' ? 'Tout ce que vous devez savoir en tant que nouveau propriétaire' :
               language === 'tz' ? 'Akk ayen ilaqen ad teẓreḍ d bab n teɣult amaynu' :
               'Everything you need to know as a new property owner',
      category: language === 'ar' ? 'أساسيات' : 
                language === 'fr' ? 'Bases' :
                language === 'tz' ? 'Isisawen' :
                'Basics',
      readTime: '5 min',
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: language === 'ar' ? 'القوانين المالية للمجمع' : 
             language === 'fr' ? 'Réglementations financières de la copropriété' :
             language === 'tz' ? 'Iẓarfan iɣarmayen n tmetti' :
             'Building Financial Regulations',
      summary: language === 'ar' ? 'فهم القوانين المالية والرسوم في المجمع السكني' : 
               language === 'fr' ? 'Comprendre les règles financières et les charges' :
               language === 'tz' ? 'Afham n iẓarfan iɣarmayen d irden' :
               'Understanding financial rules and charges in the building',
      category: language === 'ar' ? 'مالية' : 
                language === 'fr' ? 'Finance' :
                language === 'tz' ? 'Aɣarim' :
                'Finance',
      readTime: '8 min',
      difficulty: 'intermediate'
    },
    {
      id: '3',
      title: language === 'ar' ? 'حل النزاعات القانونية' : 
             language === 'fr' ? 'Résolution des conflits juridiques' :
             language === 'tz' ? 'Afru n imennuɣen izgaranen' :
             'Legal Dispute Resolution',
      summary: language === 'ar' ? 'طرق حل النزاعات والإجراءات القانونية المتاحة' : 
               language === 'fr' ? 'Méthodes de résolution et procédures légales disponibles' :
               language === 'tz' ? 'Tarrayin n ufru d ikalasen izgaranen yellan' :
               'Available methods and legal procedures for dispute resolution',
      category: language === 'ar' ? 'نزاعات' : 
                language === 'fr' ? 'Conflits' :
                language === 'tz' ? 'Imennuɣen' :
                'Disputes',
      readTime: '12 min',
      difficulty: 'advanced'
    }
  ];

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge className="bg-success/10 text-success hover:bg-success/20">
          {language === 'ar' ? 'مبتدئ' : language === 'fr' ? 'Débutant' : language === 'tz' ? 'Amezwaru' : 'Beginner'}
        </Badge>;
      case 'intermediate':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">
          {language === 'ar' ? 'متوسط' : language === 'fr' ? 'Intermédiaire' : language === 'tz' ? 'Alemmas' : 'Intermediate'}
        </Badge>;
      case 'advanced':
        return <Badge variant="destructive">
          {language === 'ar' ? 'متقدم' : language === 'fr' ? 'Avancé' : language === 'tz' ? 'Aqeṛṛu' : 'Advanced'}
        </Badge>;
      default:
        return null;
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: chatInput,
      timestamp: 'now'
    };

    const botResponse = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      message: language === 'ar' ? 'شكراً لسؤالك. يرجى الاتصال بالمستشار القانوني للحصول على إجابة مفصلة.' :
               language === 'fr' ? 'Merci pour votre question. Veuillez contacter le conseiller juridique pour une réponse détaillée.' :
               language === 'tz' ? 'Tanemmirt i usteqsi-nnek. Ma ulac aɣilif, nermes aseɣti azgaran i tririt tafessilt.' :
               'Thank you for your question. Please contact the legal advisor for a detailed response.',
      timestamp: 'now'
    };

    setChatMessages([...chatMessages, userMessage, botResponse]);
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('nav.legal')}</h1>
        <p className="mt-1 text-sm text-gray-600">
          {language === 'ar' ? 'تعلم عن حقوقك وواجباتك القانونية كمالك عقار' :
           language === 'fr' ? 'Apprenez vos droits et devoirs légaux en tant que propriétaire' :
           language === 'tz' ? 'Issin izerfan-nnek d twuriwin-nnek tizgaranin d bab n teɣult' :
           'Learn about your legal rights and responsibilities as a property owner'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'المقالات' : language === 'fr' ? 'Articles' : language === 'tz' ? 'Imagraden' : 'Articles'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{mockArticles.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'الفيديوهات' : language === 'fr' ? 'Vidéos' : language === 'tz' ? 'Tividyutin' : 'Videos'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{mockVideos.length}</p>
              </div>
              <Video className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'الاستشارات' : language === 'fr' ? 'Consultations' : language === 'tz' ? 'Imsiwlen' : 'Consultations'}
                </p>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
              </div>
              <MessageCircle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'المساعدة' : language === 'fr' ? 'Support' : language === 'tz' ? 'Tallalt' : 'Support'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {language === 'ar' ? 'متاح' : language === 'fr' ? 'Disponible' : language === 'tz' ? 'Yella' : 'Available'}
                </p>
              </div>
              <Gavel className="h-8 w-8 text-error" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="articles">
            {language === 'ar' ? 'المقالات' : language === 'fr' ? 'Articles' : language === 'tz' ? 'Imagraden' : 'Articles'}
          </TabsTrigger>
          <TabsTrigger value="videos">
            {language === 'ar' ? 'الفيديوهات' : language === 'fr' ? 'Vidéos' : language === 'tz' ? 'Tividyutin' : 'Videos'}
          </TabsTrigger>
          <TabsTrigger value="chatbot">
            {language === 'ar' ? 'المساعد القانوني' : language === 'fr' ? 'Assistant juridique' : language === 'tz' ? 'Aseɣti azgaran' : 'Legal Assistant'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'المقالات القانونية المبسطة' : 
                 language === 'fr' ? 'Articles juridiques simplifiés' :
                 language === 'tz' ? 'Imagraden izgaranen ihewwanen' :
                 'Simplified Legal Articles'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary">{article.category}</Badge>
                        {getDifficultyBadge(article.difficulty)}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{article.summary}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{article.readTime}</span>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          {language === 'ar' ? 'اقرأ' : language === 'fr' ? 'Lire' : language === 'tz' ? 'Ɣer' : 'Read'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'فيديوهات تعليمية' : 
                 language === 'fr' ? 'Vidéos éducatives' :
                 language === 'tz' ? 'Tividyutin tiselmadin' :
                 'Educational Videos'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVideos.map((video) => (
                  <Card key={video.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center w-full h-32 bg-gray-100 rounded-lg mb-4">
                        <div className="text-4xl">{video.thumbnail}</div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{video.category}</Badge>
                        <span className="text-xs text-gray-500">{video.duration}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-3">{video.title}</h3>
                      <Button className="w-full">
                        <Video className="h-4 w-4 mr-2" />
                        {language === 'ar' ? 'شاهد' : language === 'fr' ? 'Regarder' : language === 'tz' ? 'Ẓer' : 'Watch'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chatbot">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'المساعد القانوني الذكي' : 
                 language === 'fr' ? 'Assistant juridique intelligent' :
                 language === 'tz' ? 'Aseɣti azgaran uḥriq' :
                 'Smart Legal Assistant'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-96">
                <ScrollArea className="flex-1 mb-4 border rounded-lg p-4">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex space-x-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={
                      language === 'ar' ? 'اكتب سؤالك القانوني...' :
                      language === 'fr' ? 'Tapez votre question juridique...' :
                      language === 'tz' ? 'Aru asteqsi-nnek azgaran...' :
                      'Type your legal question...'
                    }
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
