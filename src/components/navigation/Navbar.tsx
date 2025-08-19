import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SettingsDropdown } from './SettingsDropdown';
import { 
  Code2, 
  Github, 
  Moon, 
  Sun, 
  Menu, 
  X,
  User,
  History,
  Users,
  BookOpen,
  Home
} from 'lucide-react';

interface NavbarProps {
  isDark?: boolean;
  toggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark = false, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [githubStatus, setGithubStatus] = useState<'connected' | 'pending' | 'disconnected'>('disconnected');
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: Code2 },
    { name: 'History', href: '/history', icon: History },
    { name: 'Docs', href: '/docs', icon: BookOpen },
    { name: 'Team', href: '/team', icon: Users },
  ];

  const getGithubStatusProps = () => {
    switch (githubStatus) {
      case 'connected':
        return { variant: 'status-connected' as const, icon: '🟢', text: 'Connected' };
      case 'pending':
        return { variant: 'status-pending' as const, icon: '🟡', text: 'Pending' };
      default:
        return { variant: 'status-disconnected' as const, icon: '🔴', text: 'Connect GitHub' };
    }
  };

  const githubProps = getGithubStatusProps();

  return (
    <nav className="nav-glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="glass-card p-2">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">
              CodeMentor AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isActive 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent-light/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* GitHub Status */}
            <Button 
              variant={githubProps.variant}
              size="sm"
              onClick={() => {
                if (githubStatus === 'disconnected') {
                  setGithubStatus('pending');
                  // Simulate connection process
                  setTimeout(() => setGithubStatus('connected'), 2000);
                }
              }}
              className="flex items-center space-x-2"
            >
              <Github className="w-4 h-4" />
              <span className="hidden lg:inline">{githubProps.icon} {githubProps.text}</span>
              <span className="lg:hidden">{githubProps.icon}</span>
            </Button>

            {/* Theme Toggle */}
            {toggleTheme && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            )}

            {/* Settings Dropdown */}
            <SettingsDropdown isDark={isDark} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isActive 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent-light/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile GitHub Status */}
              <Button 
                variant={githubProps.variant}
                size="sm"
                onClick={() => {
                  if (githubStatus === 'disconnected') {
                    setGithubStatus('pending');
                    setTimeout(() => setGithubStatus('connected'), 2000);
                  }
                }}
                className="w-full flex items-center space-x-2 mt-4"
              >
                <Github className="w-4 h-4" />
                <span>{githubProps.icon} {githubProps.text}</span>
              </Button>

              {/* Mobile Theme Toggle */}
              {toggleTheme && (
                <Button
                  variant="outline"
                  onClick={toggleTheme}
                  className="w-full flex items-center space-x-2 mt-2"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};