
import React from 'react';
import { BarChart2, PieChart, LineChart, Settings, Zap, Shield, TrendingUp, Target } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <BarChart2 className="h-10 w-10 text-primary" />,
      title: "Advanced Analytics",
      description: "Detailed performance metrics and insights for your trading strategies."
    },
    {
      icon: <PieChart className="h-10 w-10 text-primary" />,
      title: "Portfolio Management",
      description: "Track and optimize your entire trading portfolio in one place."
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Real-time Monitoring",
      description: "Track market movements and your strategy performance in real-time."
    },
    {
      icon: <Settings className="h-10 w-10 text-primary" />,
      title: "Customizable Strategies",
      description: "Configure and fine-tune strategies to match your trading style."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Fast Execution",
      description: "Low-latency order execution for time-sensitive trading opportunities."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure Trading",
      description: "Enterprise-grade security for your trading data and API connections."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Backtesting Engine",
      description: "Test your strategies against historical data before going live."
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Risk Management",
      description: "Built-in risk controls to protect your capital."
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Trading Features</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            TradingBot provides all the tools you need to create, deploy, and monitor successful trading strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card rounded-lg p-6 shadow-sm border border-muted hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
