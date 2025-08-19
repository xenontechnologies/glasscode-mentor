import React from 'react';
import { 
  Code2, 
  Bug, 
  Brain, 
  Users, 
  Shield, 
  Zap,
  GitBranch,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Smart Code Review',
    description: 'AI-powered analysis of your code quality, best practices, and potential improvements.',
    benefits: ['Code quality scoring', 'Style consistency', 'Performance suggestions']
  },
  {
    icon: Bug,
    title: 'Intelligent Debugging',
    description: 'Step-by-step debugging assistance with contextual solutions and fix recommendations.',
    benefits: ['Error pattern recognition', 'Stack trace analysis', 'Quick fixes']
  },
  {
    icon: Brain,
    title: 'Explain Mode',
    description: 'Get detailed explanations of complex code patterns, algorithms, and architectural decisions.',
    benefits: ['Code documentation', 'Learning insights', 'Pattern explanations']
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share reviews, collaborate on debugging sessions, and maintain code quality standards.',
    benefits: ['Team workspaces', 'Review sharing', 'Quality metrics']
  },
  {
    icon: GitBranch,
    title: 'GitHub Integration',
    description: 'Seamless integration with your GitHub repositories for automated code analysis.',
    benefits: ['PR automation', 'Commit analysis', 'Repository sync']
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
    description: 'Interactive chat interface for real-time code discussions and problem solving.',
    benefits: ['Context-aware responses', 'Code suggestions', 'Learning support']
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything you need to{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              code smarter
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI-powered tools designed to enhance your development workflow 
            and improve code quality across your entire team.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group">
              {/* Icon */}
              <div className="w-14 h-14 glass-card flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Benefits */}
              <div className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Performance Stats */}
        <div className="mt-20">
          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-center mb-8">
              Trusted by developers worldwide
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '50K+', label: 'Code Reviews' },
                { number: '99.9%', label: 'Uptime' },
                { number: '2.5x', label: 'Faster Debugging' },
                { number: '10K+', label: 'Developers' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const Sparkles: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
    <path d="M19 11L19.74 14.26L23 15L19.74 15.74L19 19L18.26 15.74L15 15L18.26 14.26L19 11Z" fill="currentColor"/>
    <path d="M5 5L5.74 8.26L9 9L5.74 9.74L5 13L4.26 9.74L1 9L4.26 8.26L5 5Z" fill="currentColor"/>
  </svg>
);