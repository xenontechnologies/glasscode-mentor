import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for individual developers getting started',
    features: [
      '100 code reviews per month',
      '10 debugging sessions',
      'Basic AI explanations',
      'Community support',
      'GitHub integration',
    ],
    limitations: [
      'Limited to 3 repositories',
      'Basic chat support only',
    ],
    cta: 'Start Free',
    popular: false,
    variant: 'outline' as const,
  },
  {
    name: 'Pro',
    icon: Crown,
    price: { monthly: 29, yearly: 290 },
    description: 'Best for professional developers and small teams',
    features: [
      'Unlimited code reviews',
      'Unlimited debugging sessions',
      'Advanced AI explanations',
      'Priority support',
      'Advanced GitHub integration',
      'Team collaboration (up to 5 members)',
      'Custom review templates',
      'Analytics dashboard',
    ],
    limitations: [],
    cta: 'Start Pro Trial',
    popular: true,
    variant: 'hero' as const,
  },
  {
    name: 'Enterprise',
    icon: Rocket,
    price: { monthly: 99, yearly: 990 },
    description: 'For large teams and organizations',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Custom AI model training',
      'SSO integration',
      'Advanced security controls',
      'Custom integrations',
      'Dedicated success manager',
      'SLA guarantees',
      'On-premise deployment option',
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
    variant: 'glass-primary' as const,
  },
];

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const getPrice = (plan: typeof plans[0]) => {
    const price = isYearly ? plan.price.yearly : plan.price.monthly;
    if (price === 0) return 'Free';
    if (plan.name === 'Enterprise') return 'Custom';
    return `$${price}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.price.monthly === 0) return '';
    const monthlyCost = plan.price.monthly * 12;
    const savings = monthlyCost - plan.price.yearly;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return `Save ${percentage}%`;
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 text-sm font-medium mb-6">
            <Crown className="w-4 h-4 text-primary" />
            <span>Simple Pricing</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose your{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              perfect plan
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Start free and scale as your team grows. All plans include our core AI features.
          </p>

          {/* Billing Toggle */}
          <div className="glass-card inline-flex items-center p-1 rounded-2xl">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                !isYearly 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                isYearly 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-primary-glow/20 text-primary px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`glass-card p-8 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 relative ${
                plan.popular ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 glass-card flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-foreground mb-1">
                  {getPrice(plan)}
                  {plan.name !== 'Enterprise' && plan.price.monthly > 0 && (
                    <span className="text-lg text-muted-foreground font-normal">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                {isYearly && plan.price.monthly > 0 && (
                  <div className="text-sm text-primary font-medium">
                    {getSavings(plan)}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-start space-x-3 opacity-60">
                    <div className="w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link to={plan.name === 'Enterprise' ? '/contact' : '/dashboard'}>
                <Button variant={plan.variant} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Have questions about our plans?
          </p>
          <Link to="/docs" className="text-primary hover:text-primary-light transition-colors">
            Check our FAQ →
          </Link>
        </div>

      </div>
    </section>
  );
};