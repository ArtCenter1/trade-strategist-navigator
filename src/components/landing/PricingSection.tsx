
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export function PricingSection() {
  const navigate = useNavigate();
  
  const plans = [
    {
      name: "Basic",
      price: 0,
      description: "Perfect for trying out the platform",
      features: [
        "1 Active Trading Strategy",
        "Real-time Market Data",
        "Basic Analytics",
        "Email Support",
        "Community Forum Access"
      ],
      highlighted: false,
      actionText: "Get Started"
    },
    {
      name: "Pro",
      price: 29,
      description: "For serious individual traders",
      features: [
        "5 Active Trading Strategies",
        "Advanced Analytics",
        "Strategy Backtesting",
        "Priority Email Support",
        "API Access",
        "Custom Parameters"
      ],
      highlighted: true,
      actionText: "Try Pro"
    },
    {
      name: "Enterprise",
      price: 99,
      description: "For professional trading teams",
      features: [
        "Unlimited Active Strategies",
        "Custom Strategy Development",
        "Dedicated Account Manager",
        "Advanced Risk Management",
        "Phone Support",
        "Multi-user Access"
      ],
      highlighted: false,
      actionText: "Contact Sales"
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Select the perfect trading plan to match your needs and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-card rounded-lg overflow-hidden border transition-shadow ${
                plan.highlighted 
                  ? 'border-primary shadow-lg relative z-10 scale-105 md:scale-110 my-4 md:my-0' 
                  : 'border-muted shadow-sm'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge variant="default" className="px-3 py-1">Most Popular</Badge>
                </div>
              )}
              
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price > 0 && <span className="text-muted-foreground ml-1">/month</span>}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.highlighted ? "default" : "outline"} 
                  className="w-full"
                  size="lg"
                  onClick={() => navigate('/auth')}
                >
                  {plan.actionText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required to start.
          </p>
        </div>
      </div>
    </section>
  );
}
