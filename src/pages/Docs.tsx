import React from 'react';
import { 
  BookOpen, 
  Code2, 
  Zap, 
  Shield, 
  Github,
  ArrowRight,
  Search,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const docSections = [
  {
    title: 'Getting Started',
    items: [
      'Quick Start Guide',
      'Setting up GitHub Integration',
      'Your First Code Review',
      'Understanding AI Responses',
    ]
  },
  {
    title: 'Features',
    items: [
      'Code Review System',
      'Debug Assistant',
      'Explain Mode',
      'Team Collaboration',
      'Chat Interface',
    ]
  },
  {
    title: 'API Reference',
    items: [
      'Authentication',
      'REST API Endpoints',
      'Webhook Integration',
      'Rate Limits',
    ]
  },
  {
    title: 'Best Practices',
    items: [
      'Writing Better Prompts',
      'Code Quality Guidelines',
      'Security Considerations',
      'Performance Tips',
    ]
  },
];

export const Docs: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Documentation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How to use{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              CodeMentor AI
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to know to get started with AI-powered code reviews, 
            debugging, and explanations.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="input-glass w-full pl-11"
              />
            </div>
          </div>
        </div>

        {/* Quick Start Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Quick Start
            </h3>
            <p className="text-muted-foreground mb-6">
              Get up and running in minutes. Connect your GitHub account and start your first code review.
            </p>
            <Button variant="outline" className="w-full group">
              Read Guide
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="glass-card p-8 hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              API Reference
            </h3>
            <p className="text-muted-foreground mb-6">
              Integrate CodeMentor AI into your workflow with our comprehensive REST API.
            </p>
            <Button variant="outline" className="w-full group">
              View API
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="glass-card p-8 hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Security & Privacy
            </h3>
            <p className="text-muted-foreground mb-6">
              Learn how we protect your code and maintain the highest security standards.
            </p>
            <Button variant="outline" className="w-full group">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {docSections.map((section, index) => (
            <div key={index} className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href="#"
                    className="block p-3 rounded-xl hover:bg-accent-light/10 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-foreground group-hover:text-primary">
                        {item}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="glass-card p-8 rounded-2xl mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'How does the AI code review work?',
                answer: 'Our AI analyzes your code for quality, performance, security issues, and best practices using advanced machine learning models trained on millions of code repositories.'
              },
              {
                question: 'Is my code data secure?',
                answer: 'Yes, we use enterprise-grade encryption and never store your code permanently. All analysis happens in secure, isolated environments.'
              },
              {
                question: 'Can I integrate with my CI/CD pipeline?',
                answer: 'Absolutely! We provide REST APIs, webhooks, and GitHub Actions to integrate seamlessly with your development workflow.'
              },
              {
                question: 'What programming languages are supported?',
                answer: 'We support all major programming languages including JavaScript, Python, Java, C++, Go, Rust, and many more.'
              },
            ].map((faq, index) => (
              <div key={index} className="glass-subtle p-6 rounded-2xl">
                <h3 className="font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="text-center">
          <div className="glass-card p-12 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Need More Help?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you 
              get the most out of CodeMentor AI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button variant="hero" size="lg">
                <Github className="w-5 h-5" />
                GitHub Issues
              </Button>
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};