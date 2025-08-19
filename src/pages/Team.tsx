import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserPlus, 
  Crown, 
  Shield, 
  Eye,
  Mail,
  Github,
  Settings,
  MoreHorizontal,
  Search,
  Copy,
  Check
} from 'lucide-react';
import avatar1 from '@/assets/avatar-1.jpg';
import avatar2 from '@/assets/avatar-2.jpg';
import avatar3 from '@/assets/avatar-3.jpg';

const teamMembers = [
  {
    id: '1',
    name: 'Alex Rodriguez',
    email: 'alex@company.com',
    username: '@alexdev',
    avatar: avatar1,
    role: 'owner',
    status: 'active',
    lastActive: '2 minutes ago',
    reviews: 45,
    contributions: 234,
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@company.com',
    username: '@sarahc',
    avatar: avatar2,
    role: 'reviewer',
    status: 'active',
    lastActive: '1 hour ago',
    reviews: 28,
    contributions: 156,
    joinedDate: '2024-02-20'
  },
  {
    id: '3',
    name: 'Marcus Kim',
    email: 'marcus@company.com',
    username: '@marcusk',
    avatar: avatar3,
    role: 'viewer',
    status: 'inactive',
    lastActive: '3 days ago',
    reviews: 12,
    contributions: 67,
    joinedDate: '2024-03-10'
  },
];

const roleConfig = {
  owner: { icon: Crown, label: 'Owner', color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
  reviewer: { icon: Shield, label: 'Reviewer', color: 'text-blue-600', bg: 'bg-blue-500/10' },
  viewer: { icon: Eye, label: 'Viewer', color: 'text-gray-600', bg: 'bg-gray-500/10' },
};

export const Team: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('reviewer');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  const handleInvite = () => {
    // Handle invite logic
    console.log('Inviting:', inviteEmail, 'as', inviteRole);
    setInviteEmail('');
    setShowInviteForm(false);
  };

  const handleCopyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText('https://codementor.ai/invite/team-xyz-123');
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2000);
    } catch (err) {
      console.error('Failed to copy invite link:', err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Team Collaboration
              </h1>
              <p className="text-muted-foreground">
                Manage your team members and collaboration settings
              </p>
            </div>
            
            <Button 
              variant="hero" 
              onClick={() => setShowInviteForm(true)}
            >
              <UserPlus className="w-4 h-4" />
              Invite Member
            </Button>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Members', value: '3', icon: Users, trend: '+1 this month' },
            { label: 'Active Reviews', value: '12', icon: Shield, trend: '8 completed' },
            { label: 'Repositories', value: '5', icon: Github, trend: '2 connected' },
            { label: 'Team Score', value: '94%', icon: Crown, trend: '+3% this week' },
          ].map((stat, index) => (
            <div key={index} className="glass-card p-6">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Invite Form Modal */}
        {showInviteForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card p-8 rounded-3xl max-w-md w-full">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Invite Team Member
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="input-glass w-full pl-11"
                      placeholder="colleague@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="input-glass w-full"
                  >
                    <option value="viewer">Viewer - Can view reviews and results</option>
                    <option value="reviewer">Reviewer - Can create and review code</option>
                    <option value="admin">Admin - Full team management access</option>
                  </select>
                </div>

                <div className="glass-subtle p-4 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">Share Invite Link</div>
                      <div className="text-sm text-muted-foreground">
                        Anyone with this link can join as {inviteRole}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyInviteLink}
                    >
                      {copiedInvite ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <Button variant="hero" onClick={handleInvite} className="flex-1">
                    Send Invitation
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowInviteForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-glass w-full pl-11"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="input-glass px-3 py-2 text-sm"
              >
                <option value="all">All Roles</option>
                <option value="owner">Owner</option>
                <option value="reviewer">Reviewer</option>
                <option value="viewer">Viewer</option>
              </select>

              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
                Team Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => {
            const RoleIcon = roleConfig[member.role as keyof typeof roleConfig].icon;
            const roleColor = roleConfig[member.role as keyof typeof roleConfig].color;
            const roleBg = roleConfig[member.role as keyof typeof roleConfig].bg;
            
            return (
              <div key={member.id} className="glass-card p-6 rounded-2xl hover:shadow-glow hover:-translate-y-1 transition-all duration-300 group">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={member.avatar} 
                        alt={`${member.name} avatar`}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-primary/20"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                        member.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-primary">{member.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${roleBg} ${roleColor} flex items-center space-x-1`}>
                      <RoleIcon className="w-3 h-3" />
                      <span>{roleConfig[member.role as keyof typeof roleConfig].label}</span>
                    </span>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last active: {member.lastActive}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{member.reviews}</div>
                    <div className="text-xs text-muted-foreground">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{member.contributions}</div>
                    <div className="text-xs text-muted-foreground">Contributions</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Github className="w-4 h-4" />
                    Profile
                  </Button>
                  {member.role !== 'owner' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4" />
                      Manage
                    </Button>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground mt-3 text-center">
                  Joined {member.joinedDate}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No team members found
            </h3>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search terms or invite new members to join your team.
            </p>
            <Button variant="hero" onClick={() => setShowInviteForm(true)}>
              <UserPlus className="w-4 h-4" />
              Invite First Member
            </Button>
          </div>
        )}

        {/* Team Settings Card */}
        <div className="mt-12 glass-card p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Team Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-subtle p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Auto-invite from GitHub</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically invite collaborators from connected repos
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
            </div>

            <div className="glass-subtle p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Review assignments</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically assign reviews to team members
                  </div>
                </div>
                <Button variant="hero" size="sm">
                  Enabled
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};