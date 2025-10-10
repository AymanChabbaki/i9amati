import { useState } from "react";
import { User, Image, Video, MapPin, Smile, Heart, MessageCircle, Share2, X, Edit, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { mockPosts as initialPosts } from "../data/mockData";

const currentUser = {
  name: "John Doe",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const friendRequests = [
  { id: 1, name: "Marie Dubois", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: 2, name: "Ali Hassan", avatar: "https://randomuser.me/api/portraits/men/66.jpg" },
];

const suggestedFriends = [
  { id: 1, name: "Emily Smith", avatar: "https://randomuser.me/api/portraits/women/67.jpg" },
  { id: 2, name: "Tom Lee", avatar: "https://randomuser.me/api/portraits/men/68.jpg" },
];

const trendingGroups = [
  { id: 1, name: "Garden Lovers" },
  { id: 2, name: "Tech Enthusiasts" },
];

export default function Social() {
  const { t, i18n } = useTranslation();
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState(
    initialPosts.map(p => ({
      ...p,
      avatar: p.avatar || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*90)+10}.jpg`,
      comments: Array.isArray(p.comments) ? p.comments : [],
      author: p.author || p.authorInitials || "User"
    }))
  );
  const [commentInputs, setCommentInputs] = useState({});
  const [showComment, setShowComment] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // RTL support
  const isRTL = ["ar", "tz"].includes(i18n.language);

  // Handlers
  const handlePost = () => {
    if (!postText.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: currentUser.name,
        avatar: currentUser.avatar,
        timestamp: t("justNow"),
        content: postText,
        media: imagePreview,
        likes: 0,
        comments: [],
      },
      ...posts,
    ]);
    setPostText("");
    setImagePreview(null);
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { id: Date.now(), author: currentUser.name, text }] }
        : post
    ));
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleToggleComment = (postId) => {
    setShowComment({ ...showComment, [postId]: !showComment[postId] });
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleEditPost = (postId) => {
    // Mock: just alert
    alert(t("editFeature"));
  };

  return (
    <div className={`bg-[#f0f2f5] min-h-screen w-full${isRTL ? " rtl" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-2xl mx-auto py-8 px-2">
        {/* Post Creation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4">
          <div className="flex items-start space-x-3">
            <img src={currentUser.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover border" />
            <div className="flex-1">
              <textarea
                value={postText}
                onChange={e => setPostText(e.target.value)}
                placeholder={t("shareUpdate", { defaultValue: "Share an update or concern with your co-owners…" })}
                rows={2}
                className="w-full resize-none rounded-lg border border-gray-200 focus:border-[#1877f2] focus:ring-0 p-2"
              />
              {imagePreview && (
                <div className="mt-2 relative w-32 h-32">
                  <img src={imagePreview} alt="preview" className="rounded-lg w-full h-full object-cover" />
                  <button type="button" className="absolute top-1 right-1 bg-white rounded-full p-1 shadow" onClick={()=>setImagePreview(null)}><X className="h-4 w-4 text-gray-500" /></button>
                </div>
              )}
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center px-2 py-1 rounded hover:bg-gray-100 text-gray-500 cursor-pointer">
                  <Image className="h-5 w-5 mr-1" /> {t("addPhoto", { defaultValue: "Add Photo" })}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                <button
                  onClick={handlePost}
                  className="bg-[#1877f2] hover:bg-[#165ec9] text-white font-semibold rounded-full px-6 py-2 shadow-sm"
                >
                  {t("post", { defaultValue: "Post" })}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-gray-500 font-medium">
              {t("noUpdates", { defaultValue: "No posts yet. Be the first to post!" })}
            </div>
          )}
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-start space-x-3">
                <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover border" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900">{post.author}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{post.timestamp}</span>
                    {post.author === currentUser.name && (
                      <>
                        <button className="ml-2 text-gray-400 hover:text-[#1877f2]" onClick={()=>handleEditPost(post.id)}><Edit className="h-4 w-4" /></button>
                        <button className="ml-2 text-gray-400 hover:text-red-500" onClick={()=>handleDeletePost(post.id)}><Trash2 className="h-4 w-4" /></button>
                      </>
                    )}
                  </div>
                  <p className="text-gray-800 text-base mb-3 leading-relaxed">{post.content}</p>
                  {post.media && (
                    <img src={post.media} alt="media" className="w-full rounded-lg mb-3" />
                  )}
                  <div className="flex items-center border-t border-gray-100 pt-2 mt-2 space-x-6">
                    <button className="flex items-center space-x-1 px-2 py-1 rounded-full transition-colors duration-150 text-gray-500 hover:bg-gray-100">
                      <Heart className="h-4 w-4" />
                      <span className="ml-1 text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 px-2 py-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-150" onClick={()=>handleToggleComment(post.id)}>
                      <MessageCircle className="h-4 w-4" />
                      <span className="ml-1 text-sm font-medium">{post.comments.length}</span>
                    </button>
                  </div>
                  {/* Comments */}
                  <div className={`mt-3 space-y-2 transition-all duration-300 ${showComment[post.id] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    {post.comments.slice(-2).map(comment => (
                      <div key={comment.id} className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">{comment.author}</span>
                        <span className="text-gray-600">{comment.text}</span>
                      </div>
                    ))}
                    {post.comments.length > 2 && (
                      <button className="text-xs text-[#1877f2] hover:underline">{t("seeMoreComments", { defaultValue: "See more comments" })}</button>
                    )}
                    <div className="flex items-center space-x-2 mt-2">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ""}
                        onChange={e => handleCommentChange(post.id, e.target.value)}
                        placeholder={t("writeComment", { defaultValue: "Write a comment..." })}
                        className="flex-1 rounded-full border border-gray-200 px-3 py-1 text-sm focus:border-[#1877f2] focus:ring-0"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="bg-[#1877f2] text-white rounded-full px-4 py-1 text-sm font-semibold hover:bg-[#165ec9]"
                      >
                        {t("post", { defaultValue: "Post" })}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}