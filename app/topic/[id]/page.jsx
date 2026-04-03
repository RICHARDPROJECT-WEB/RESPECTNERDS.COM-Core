import Link from 'next/link';
import { ArrowLeft, MessageSquare, ThumbsUp, MoreVertical } from 'lucide-react';

export default function TopicPage({ params }) {
  // Mock data for the thread 
  const thread = {
    id: params.id,
    title: "Is writing code with AI considered 'cheating'?",
    author: "prompt_mage",
    time: "1 day ago",
    content: "I've been using AI tools to write scripts and build apps faster. Some of my senior colleagues say this is 'cheating' and that I'm not learning the fundamentals. I feel like it's just a tool to eliminate boilerplate. What do you all think?",
    likes: 210,
    replies: [
      { id: 101, author: "old_school_dev", time: "23 hours ago", content: "It's not cheating, but your colleagues have a point. If you don't know the fundamentals, you won't know how to debug complex issues when the AI hallucinates.", likes: 85 },
      { id: 102, author: "startup_hustler", time: "20 hours ago", content: "Who cares if it's cheating? If you're building products that work and users are happy, that's all that matters. Speed is everything right now.", likes: 132 },
    ]
  };

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
              {thread.author[0].toUpperCase()}
            </div>
            <span className="font-semibold text-primary">{thread.author}</span>
            <span>•</span>
            <span>{thread.time}</span>
          </div>
          <button className="theme-toggle" style={{ border: 'none', background: 'transparent' }}>
            <MoreVertical size={16} />
          </button>
        </div>
        
        <div className="text-base mb-6" style={{ lineHeight: '1.7' }}>
          {thread.content}
        </div>

        <div className="flex items-center gap-4 border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
          <button className="btn btn-outline flex items-center gap-2">
            <ThumbsUp size={16} />
            {thread.likes}
          </button>
          <button className="btn btn-outline flex items-center gap-2">
            <MessageSquare size={16} />
            Reply
          </button>
        </div>
      </div>

      {/* Replies */}
      <h3 className="text-lg font-bold mb-4">{thread.replies.length} Replies</h3>
      <div className="flex" style={{ flexDirection: 'column', gap: '16px' }}>
        {thread.replies.map(reply => (
          <div key={reply.id} className="card" style={{ padding: '20px' }}>
            <div className="flex items-center gap-2 mb-3 color-secondary text-sm">
              <span className="font-semibold color-primary">{reply.author}</span>
              <span>•</span>
              <span>{reply.time}</span>
            </div>
            <div className="text-sm" style={{ marginBottom: '16px', lineHeight: '1.6' }}>
              {reply.content}
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 color-secondary text-xs" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <ThumbsUp size={14} />
                {reply.likes}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply input skeleton */}
      <div className="card mt-6">
        <textarea 
          placeholder="Write a reply..." 
          className="text-base"
          style={{ 
            width: '100%', 
            minHeight: '100px', 
            padding: '12px', 
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-color)',
            color: 'var(--text-primary)',
            marginBottom: '12px',
            resize: 'vertical'
          }} 
        />
        <div className="flex justify-between items-center">
          <span className="text-xs color-secondary">Sign in to reply</span>
          <button className="btn btn-primary" disabled style={{ opacity: 0.5 }}>Post Reply</button>
        </div>
      </div>

    </div>
  );
}
