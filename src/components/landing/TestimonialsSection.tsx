import React from 'react';
import { Star, Quote } from 'lucide-react';
import avatar1 from '@/assets/avatar-1.jpg';
import avatar2 from '@/assets/avatar-2.jpg';
import avatar3 from '@/assets/avatar-3.jpg';

const testimonials = [
  {
    name: 'Sarah Chen',
    username: '@devguru',
    role: 'Senior Full-Stack Developer',
    avatar: avatar1,
    content: 'CodeMentor AI has transformed how I review code. The intelligent suggestions and debugging assistance have saved me hours every week. The glassmorphic UI is beautiful too!',
    rating: 5,
    company: 'TechCorp'
  },
  {
    name: 'Marcus Rodriguez',
    username: '@openai-coder', 
    role: 'Tech Lead',
    avatar: avatar2,
    content: 'The AI explanations are incredibly detailed and helpful. It\'s like having a senior developer mentor available 24/7. Perfect for onboarding new team members.',
    rating: 5,
    company: 'StartupHub'
  },
  {
    name: 'Emily Watson',
    username: '@codewizard',
    role: 'Frontend Architect',
    avatar: avatar3,
    content: 'Best debugging tool I\'ve used. The step-by-step analysis helps identify issues quickly. The GitHub integration makes it seamless to use in our workflow.',
    rating: 5,
    company: 'DesignTech'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 text-sm font-medium mb-6">
            <Quote className="w-4 h-4 text-primary" />
            <span>What Developers Say</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              developers
            </span>{' '}
            worldwide
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of developers who use CodeMentor AI to write better code, 
            debug faster, and learn continuously.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-8 hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
              
              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name} avatar`}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background"></div>
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-primary">{testimonial.username}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="glass-subtle rounded-2xl p-8">
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-sm font-medium">Trusted by teams at:</div>
              {['GitHub', 'Microsoft', 'Google', 'Meta', 'Netflix', 'Spotify'].map((company, index) => (
                <div key={index} className="text-sm font-medium text-muted-foreground">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};