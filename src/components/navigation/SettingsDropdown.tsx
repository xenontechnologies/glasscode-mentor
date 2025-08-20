import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Settings,
  User,
  Key,
  Github,
  Bell,
  BarChart3,
  CreditCard,
  Shield,
  Download,
  Trash2,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface SettingsDropdownProps {
  isDark?: boolean;
}

export const SettingsDropdown: React.FC<SettingsDropdownProps> = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleDropdown = () => {
    if (!isOpen) {
      // Calculate if dropdown should appear above or below
      const buttonElement = dropdownRef.current?.querySelector('button');
      if (buttonElement) {
        const rect = buttonElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const estimatedDropdownHeight = 400; // Approximate height of dropdown
        
        if (rect.bottom + estimatedDropdownHeight > viewportHeight) {
          setDropdownPosition('top');
        } else {
          setDropdownPosition('bottom');
        }
      }
    }
    setIsOpen(!isOpen);
  };

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { name: 'Profile', href: '/settings/profile', icon: User, description: 'Manage your personal information' },
        { name: 'API Keys', href: '/settings/api-keys', icon: Key, description: 'Manage your API keys and usage' },
        { name: 'Integrations', href: '/settings/integrations', icon: Github, description: 'Connect external services' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { name: 'Notifications', href: '/settings/notifications', icon: Bell, description: 'Configure email and push notifications' },
        { name: 'Analysis', href: '/settings/analysis', icon: BarChart3, description: 'Default settings and custom rules' },
      ]
    },
    {
      title: 'Billing & Security',
      items: [
        { name: 'Billing', href: '/settings/billing', icon: CreditCard, description: 'Subscription and billing information' },
        { name: 'Security', href: '/settings/security', icon: Shield, description: 'Security audit log and settings' },
      ]
    },
    {
      title: 'Data & Account',
      items: [
        { name: 'Export Data', href: '/settings/export', icon: Download, description: 'Download your data' },
        { name: 'Delete Account', href: '/settings/delete', icon: Trash2, description: 'Permanently delete your account' },
      ]
    }
  ];

  const handleLogout = () => {
    // Logout logic here
    console.log('Logging out...');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Settings Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggleDropdown}
        className="flex items-center space-x-2 rounded-full px-3"
      >
        <Settings className="w-4 h-4" />
        <span className="hidden sm:inline">Settings</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={`absolute right-0 w-80 sm:w-80 bg-background/95 backdrop-blur-xl border border-border-glass rounded-2xl shadow-elegant overflow-hidden z-50 max-h-[70vh] ${
            dropdownPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
          onWheel={(e) => e.stopPropagation()}
        >
          <div 
            ref={scrollContainerRef}
            className="py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-border-glass scrollbar-track-transparent pr-1" 
            style={{ maxHeight: '60vh' }}
          >
            {settingsGroups.map((group, groupIndex) => (
              <div key={group.title}>
                {groupIndex > 0 && <div className="border-t border-border-glass my-2" />}
                
                {/* Group Title */}
                <div className="px-4 py-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {group.title}
                  </h3>
                </div>

                {/* Group Items */}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 hover:bg-accent-light/10 transition-colors duration-200"
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground">
                              {item.name}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Logout Section */}
            <div className="border-t border-border-glass mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left hover:bg-accent-light/10 transition-colors duration-200 flex items-center space-x-3"
              >
                <LogOut className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};