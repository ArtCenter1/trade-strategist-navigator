
import React from 'react';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      name: "Michael J.",
      role: "Day Trader",
      content: "TradingBot has completely transformed my trading workflow. The automated strategies have saved me countless hours and improved my overall returns.",
      rating: 5
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      name: "Sarah T.",
      role: "Investment Advisor",
      content: "I'm impressed with how easy it is to customize and deploy strategies. The backtesting features have helped me optimize my approach and reduce risk.",
      rating: 5
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Robert L.",
      role: "Crypto Investor",
      content: "The real-time monitoring and alerts have been game-changing for my crypto trading. I can finally step away from the screen without missing opportunities.",
      rating: 4
    }
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-primary fill-primary' : 'text-muted'}`} 
      />
    ));
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Join thousands of traders who trust TradingBot for their automated trading needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card rounded-lg p-6 shadow-sm border border-muted flex flex-col"
            >
              <div className="flex flex-row gap-4 items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center mb-3">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-muted-foreground italic flex-grow">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
