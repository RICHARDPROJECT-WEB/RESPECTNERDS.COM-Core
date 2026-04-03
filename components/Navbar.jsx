"use client";

import Link from 'next/link';
import { Terminal, Moon, Sun, User } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

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
          <button className="btn btn-outline flex items-center">
            Sign In
          </button>
          <button className="btn btn-primary flex items-center">
            <User size={18} />
            Join
          </button>
        </div>
      </div>
    </nav>
  );
}
