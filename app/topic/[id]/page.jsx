"use client";

import Link from 'next/link';
import { ArrowLeft, MessageSquare, ThumbsUp, MoreVertical, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTopic, subscribeToReplies, createReply } from '../../../lib/db';
import { useAuth } from '../../../contexts/AuthContext';

export default function TopicPage({ params }) {
  const { id } = params;
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // 1. Fetch main topic details once
    getTopic(id).then(data => {
      setThread(data);
    });

    // 2. Subscribe to live replies feed
    const unsubscribe = subscribeToReplies(id, (data) => {
      setReplies(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  const handlePostReply = async () => {
    if (!newReply.trim() || !user) return;
    try {
      await createReply(id, newReply, user);
      setNewReply("");
    } catch (err) {
      alert("Failed to post reply: " + err.message);
    }
  };

  function formatTime(timestamp) {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate();
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }

  if (!thread) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading discussion...</div>;
  }

  return (
    <div className="topic-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" className="btn btn-outline flex items-center gap-2 mb-6" style={{ display: 'inline-flex', padding: '6px 12px' }}>
        <ArrowLeft size={16} />
        Back to Discussions
      </Link>

      {/* Main Post */}
      <div className="card mb-6">
        <h1 className="text-2xl font-bold mb-4">{thread.title}</h1>
        <div className="flex items-center justify-between mb-6 color-secondary text-sm">
          <div className="flex items-center gap-2">
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
              {(thread.authorName || 'A')[0].toUpperCase()}
            </div>
            <span className="font-semibold text-primary">{thread.authorName}</span>
            <span>•</span>
            <span>{formatTime(thread.createdAt)}</span>
          </div>
          <button className="theme-toggle" style={{ border: 'none', background: 'transparent' }}>
            <MoreVertical size={16} />
          </button>
        </div>
        
        <div className="text-base mb-6" style={{ lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
          {thread.content}
        </div>

        <div className="flex items-center gap-4 border-t pt-4" style={{ borderColor: 'var(--border-color)', marginTop: '20px' }}>
          <button className="btn btn-outline flex items-center gap-2">
            <ThumbsUp size={16} />
            {thread.likes || 0}
          </button>
        </div>
      </div>

      {/* Replies */}
      <h3 className="text-lg font-bold mb-4">{replies.length} Replies</h3>
      <div className="flex" style={{ flexDirection: 'column', gap: '16px' }}>
        {replies.map(reply => (
          <div key={reply.id} className="card" style={{ padding: '20px' }}>
            <div className="flex items-center gap-2 mb-3 color-secondary text-sm">
               <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '10px' }}>
                {(reply.authorName || 'R')[0].toUpperCase()}
              </div>
              <span className="font-semibold color-primary">{reply.authorName}</span>
              <span>•</span>
              <span>{formatTime(reply.createdAt)}</span>
            </div>
            <div className="text-sm" style={{ marginBottom: '16px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
              {reply.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-center color-secondary py-4">Loading replies...</div>}
        {!loading && replies.length === 0 && <div className="text-center color-secondary py-4">No replies yet. Be the first to chime in!</div>}
      </div>

      {/* Reply input */}
      <div className="card mt-6">
        <textarea 
          placeholder={user ? "Write a reply..." : "Please Login with Google to join the discussion."} 
          className="text-base"
          disabled={!user}
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          style={{ 
            width: '100%', 
            minHeight: '100px', 
            padding: '12px', 
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-color)',
            color: 'var(--text-primary)',
            marginBottom: '12px',
            resize: 'vertical',
            opacity: user ? 1 : 0.6
          }} 
        />
        <div className="flex justify-between items-center">
          <span className="text-xs color-secondary">
            {user ? `Posting as ${user.displayName || user.email}` : "Sign in to reply"}
          </span>
          <button 
            className="btn btn-primary flex items-center gap-2" 
            disabled={!user || !newReply.trim()} 
            style={{ opacity: (!user || !newReply.trim()) ? 0.5 : 1 }}
            onClick={handlePostReply}
          >
            <Send size={16} />
            Post Reply
          </button>
        </div>
      </div>

    </div>
  );
}
