"use client";

import Link from 'next/link';
import { Terminal, Moon, Sun, User } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, loginWithGoogle, logout, loading } = useAuth();

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link href="/" className="logo-title">
          <Terminal className="logo-icon" size={28} />
          Respect Nerds
        </Link>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {loading ? (
            <span className="text-sm color-secondary">...</span>
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">{user.displayName || user.email}</span>
              <button className="btn btn-outline text-xs" onClick={logout}>Sign Out</button>
            </div>
          ) : (
            <button className="btn btn-primary flex items-center" onClick={loginWithGoogle}>
              <User size={18} />
              Login with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
