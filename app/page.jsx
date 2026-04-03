import Link from 'next/link';
import { MessageSquare, Activity } from 'lucide-react';

export default function Home() {
  // Mock data for the MVP presentation
  const mockTopics = [
    { id: 1, title: "Show off your latest home server setup!", author: "admin_geek", replies: 142, likes: 89, time: "2 hours ago" },
    { id: 2, title: "What's the best Linux distro for software engineering in 2024?", author: "tux_lover", replies: 56, likes: 34, time: "5 hours ago" },
    { id: 3, title: "Is writing code with AI considered 'cheating'?", author: "prompt_mage", replies: 312, likes: 210, time: "1 day ago" },
    { id: 4, title: "Mechanical Keyboard enthusiasts: Show your daily drivers", author: "click_clack", replies: 88, likes: 45, time: "1 day ago" },
  ];

  return (
    <div className="forum-grid">
      <div className="main-feed">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Latest Discussions</h1>
          <button className="btn btn-primary flex items-center gap-2">
            <MessageSquare size={18} />
            New Topic
          </button>
        </div>

        <div className="card">
          {mockTopics.map((topic) => (
            <div key={topic.id} className="topic-item">
              <div className="topic-stats">
                <span className="font-bold text-lg">{topic.likes}</span>
                <span className="text-xs color-secondary">Likes</span>
              </div>
              <div className="topic-content">
                <Link href={`/topic/${topic.id}`}>
                  <h3 className="topic-title">{topic.title}</h3>
                </Link>
                <div className="topic-meta">
                  <span className="flex items-center gap-2">
                    <UserIcon /> {topic.author}
                  </span>
                  <span>•</span>
                  <span>{topic.time}</span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <MessageSquare size={14} /> {topic.replies} replies
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
        
        <div className="card" style={{ backgroundColor: 'var(--surface-color)', padding: '24px', borderRadius: 'var(--radius-md)' }}>
          <h3 className="text-lg font-bold mb-2">Welcome to Respect Nerds</h3>
          <p className="color-secondary text-sm mb-4">
            A safe, fast, and modern community for hackers, engineers, and tech enthusiasts.
          </p>
          <button className="btn btn-primary" style={{ width: '100%' }}>Create Account</button>
        </div>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}
