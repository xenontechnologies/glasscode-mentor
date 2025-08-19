import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerLinks = {
  product: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'API Documentation', href: '/docs' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Security', href: '/security' },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-24">
      {/* Newsletter Section */}
      <div className="border-t border-border-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="glass-card p-12 text-center rounded-3xl">
            <h3 className="text-3xl font-bold mb-4">
              Stay updated with{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                CodeMentor AI
              </span>
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest updates on new features, AI improvements, and developer tips 
              delivered directly to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-glass w-full px-4 py-3 text-center sm:text-left"
              />
              <Button variant="hero" className="w-full sm:w-auto">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-border-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            
            {/* Brand Column */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="glass-card p-2">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  CodeMentor AI
                </span>
              </Link>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Intelligent code review, debugging, and explanations powered by AI. 
                Transform your development workflow with professional-grade tools.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="icon-sm">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon-sm">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon-sm">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon-sm">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <div className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <div className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <div className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <div className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border-glass mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © 2024 CodeMentor AI. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>for developers</span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Version 1.0.0
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};