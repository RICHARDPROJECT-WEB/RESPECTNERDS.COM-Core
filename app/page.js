'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// 初始化 Supabase 连接
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  // 1. 从数据库读取帖子
  async function fetchPosts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) console.error('Error fetching:', error)
    else setPosts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // 2. 提交新帖子
  async function handleSubmit(e) {
    e.preventDefault()
    if (!title || !content) return alert('Please fill in both title and content')

    const { error } = await supabase
      .from('posts')
      .insert([{ title, content }])

    if (error) {
      alert('Error posting: ' + error.message)
    } else {
      setTitle('')
      setContent('')
      fetchPosts() // 刷新列表
    }
  }

  return (
    <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: '#c9d1d9', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#58a6ff', borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>
        RESPECTNERDS.COM / CROSSFIRE_DEBATE
      </h1>
      
      <p style={{ fontStyle: 'italic', color: '#8b949e', marginBottom: '30px' }}>
        "Where Engineering Meets Law, and Intelligence Empowers the Community."
      </p>

      {/* 发帖表单 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '50px', background: '#161b22', padding: '20px', borderRadius: '8px', border: '1px solid #30363d' }}>
        <div style={{ marginBottom: '15px' }}>
          <input 
            type="text" 
            placeholder="Topic Title (e.g., AI Liability in BC Law)" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '10px', background: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <textarea 
            placeholder="Share your technical or legal perspective..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', padding: '10px', background: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '4px', minHeight: '120px' }}
          />
        </div>
        <button type="submit" style={{ background: '#238636', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          POST TO NETWORK
        </button>
      </form>

      {/* 帖子列表 */}
      <div>
        <h2 style={{ fontSize: '1.2rem', color: '#8b949e', marginBottom: '20px' }}>LATEST_DISCUSSIONS</h2>
        {loading ? <p>Loading data from Supabase...</p> : (
          posts.map(post => (
            <div key={post.id} style={{ borderLeft: '3px solid #58a6ff', paddingLeft: '20px', marginBottom: '30px', background: '#161b22', padding: '15px', borderRadius: '0 8px 8px 0' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#58a6ff' }}>{post.title}</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
              <small style={{ color: '#484f58' }}>{new Date(post.created_at).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
