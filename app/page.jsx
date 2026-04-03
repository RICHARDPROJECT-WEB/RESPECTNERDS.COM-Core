"use client";

import Link from 'next/link';
import { MessageSquare, Activity, User, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { subscribeToTopics, createTopic } from '../lib/db';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const [topics, setTopics] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToTopics((data) => {
      setTopics(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !user) return;
    try {
      await createTopic(newTitle, newContent, user);
      setIsCreating(false);
      setNewTitle("");
      setNewContent("");
    } catch (err) {
      alert("Failed to create topic: " + err.message);
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

  return (
    <div className="forum-grid">
      <div className="main-feed">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Latest Discussions</h1>
          {user && (
            <button 
              className="btn btn-primary flex items-center gap-2"
              onClick={() => setIsCreating(!isCreating)}
            >
              {isCreating ? 'Cancel' : <><Plus size={18} /> New Topic</>}
            </button>
          )}
        </div>

        {isCreating && user && (
          <form className="card mb-6" onSubmit={handleCreateTopic}>
            <h3 className="font-bold mb-4">Start a new discussion</h3>
            <input 
              type="text" 
              placeholder="Title..." 
              className="mb-4 text-base"
              style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <textarea 
              placeholder="What's on your mind?..." 
              className="mb-4 text-base"
              style={{ width: '100%', minHeight: '120px', padding: '12px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', resize: 'vertical' }}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">Post Topic</button>
            </div>
          </form>
        )}

        <div className="card">
          {loading ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading threads...</div>
          ) : topics.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No discussions yet. Be the first to start one!
            </div>
          ) : topics.map((topic) => (
            <div key={topic.id} className="topic-item">
              <div className="topic-stats">
                <span className="font-bold text-lg">{topic.likes || 0}</span>
                <span className="text-xs color-secondary">Likes</span>
              </div>
              <div className="topic-content">
                <Link href={`/topic/${topic.id}`}>
                  <h3 className="topic-title">{topic.title}</h3>
                </Link>
                <div className="topic-meta">
                  <span className="flex items-center gap-1">
                     <User size={14} /> {topic.authorName}
                  </span>
                  <span>•</span>
                  <span>{formatTime(topic.createdAt)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} /> {topic.replyCount || 0} replies
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar">
        <div className="card mb-4" style={{ backgroundColor: 'var(--surface-color)', padding: '24px', borderRadius: 'var(--radius-md)' }}>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Activity size={20} className="color-primary" />
            Trending Tags
          </h3>
          <div className="flex" style={{ flexWrap: 'wrap', gap: '8px' }}>
            <span className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.875rem' }}>#linux</span>
            <span className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.875rem' }}>#hardware</span>
            <span className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.875rem' }}>#coding</span>
            <span className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.875rem' }}>#ai</span>
          </div>
        </div>
        
        {!user && (
          <div className="card" style={{ backgroundColor: 'var(--surface-color)', padding: '24px', borderRadius: 'var(--radius-md)' }}>
            <h3 className="text-lg font-bold mb-2">Welcome to Respect Nerds</h3>
            <p className="color-secondary text-sm mb-4">
              A safe, fast, and modern community for hackers, engineers, and tech enthusiasts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
