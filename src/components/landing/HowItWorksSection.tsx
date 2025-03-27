
import React from 'react';
import { ArrowRight, FileLineChart, BarChart2, Settings, Play } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: <FileLineChart className="h-12 w-12 text-primary" />,
      title: "Choose a Strategy",
      description: "Browse our collection of pre-built trading strategies or create your own custom strategy."
    },
    {
      icon: <Settings className="h-12 w-12 text-primary" />,
      title: "Configure Parameters",
      description: "Fine-tune your strategy with customizable parameters to match your risk tolerance and trading goals."
    },
    {
      icon: <BarChart2 className="h-12 w-12 text-primary" />,
      title: "Backtest & Optimize",
      description: "Test your strategy against historical market data to see how it would have performed."
    },
    {
      icon: <Play className="h-12 w-12 text-primary" />,
      title: "Deploy & Monitor",
      description: "Launch your strategy and monitor its performance in real-time on our comprehensive dashboard."
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How TradingBot Works</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Get started with automated trading in just a few simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-muted hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step number */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Card content */}
                <div className="bg-card rounded-lg p-6 shadow-sm border border-muted flex flex-col items-center text-center h-full">
                  <div className="flex md:flex-col items-center gap-4 md:gap-0">
                    <div className="p-3 rounded-full bg-muted/30 mb-4 flex-shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Arrow connector for mobile */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-4 md:hidden">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
