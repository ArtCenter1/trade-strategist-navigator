
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, BarChart2, Lock, Zap, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <header className="relative w-full px-4 py-6 flex items-center justify-between max-w-7xl mx-auto z-10">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-md bg-trading-navy text-white flex items-center justify-center">
            <BarChart2 className="h-6 w-6" />
          </div>
          <span className="font-semibold text-xl">TradingBot</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-trading-teal transition-standard">Features</a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-trading-teal transition-standard">How it Works</a>
          <a href="#pricing" className="text-sm font-medium hover:text-trading-teal transition-standard">Pricing</a>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/dashboard">
              <Button className="bg-trading-navy hover:bg-trading-navy/90 text-white">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" className="hidden md:flex">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-trading-navy hover:bg-trading-navy/90 text-white">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-trading-teal/10 text-trading-teal text-xs font-medium mb-6">
                <span>Intelligent Trading Strategies</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl">
                Automate Your Trading with Powerful Strategies
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                Select from a library of proven trading strategies and automate your trading across multiple exchanges. Set it up once and let the system work for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-trading-navy hover:bg-trading-navy/90 text-white px-8 py-6 rounded-lg text-base">
                  Start Trading Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="px-8 py-6 rounded-lg text-base">
                  View Demo
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-16 relative mx-auto max-w-4xl"
            >
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl glass-card">
                <div className="w-full h-full bg-trading-navy/5 flex items-center justify-center">
                  <div className="text-center p-8">
                    <BarChart2 className="h-16 w-16 mx-auto mb-4 text-trading-teal" />
                    <h3 className="text-xl font-medium mb-2">Trading Dashboard Preview</h3>
                    <p className="text-muted-foreground">Interactive visualization coming soon</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 -left-6 h-12 bg-gradient-to-t from-background to-transparent"></div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-trading-light/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform combines powerful trading tools with an intuitive interface, making automated trading accessible to everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BarChart2 className="h-8 w-8 text-trading-teal" />,
                  title: "Advanced Strategies",
                  description: "Choose from a library of proven trading strategies or customize your own to match your trading style.",
                },
                {
                  icon: <Lock className="h-8 w-8 text-trading-teal" />,
                  title: "Secure API Connections",
                  description: "Connect securely to major exchanges using encrypted API keys with custom permission settings.",
                },
                {
                  icon: <Zap className="h-8 w-8 text-trading-teal" />,
                  title: "Real-time Execution",
                  description: "Execute trades instantly with minimal latency, ensuring you never miss a market opportunity.",
                },
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-xl"
                >
                  <div className="h-12 w-12 rounded-lg bg-trading-teal/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started in just a few simple steps and let our automated systems handle your trading.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-trading-teal/20 -translate-y-1/2 z-0"></div>
              
              {[
                {
                  number: "01",
                  title: "Create an Account",
                  description: "Sign up and create your personal dashboard in less than 2 minutes.",
                },
                {
                  number: "02",
                  title: "Connect Exchange",
                  description: "Securely connect your preferred cryptocurrency exchanges via API.",
                },
                {
                  number: "03",
                  title: "Select Strategy",
                  description: "Choose and configure your trading strategy from our extensive library.",
                },
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative z-10 bg-background p-6 rounded-xl shadow-subtle"
                >
                  <div className="h-12 w-12 rounded-full bg-trading-navy text-white flex items-center justify-center mb-4 mx-auto">
                    <span className="font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
                  <p className="text-muted-foreground text-center">{step.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-trading-navy hover:bg-trading-navy/90 text-white px-8 py-6 rounded-lg text-base">
                Start Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Section Placeholder */}
        <section id="pricing" className="py-20 px-4 bg-trading-light/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that best fits your trading needs. No hidden fees.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Basic",
                  price: "$29",
                  description: "Perfect for beginners",
                  features: [
                    "5 active strategies",
                    "2 exchange connections",
                    "Basic analytics",
                    "Email support"
                  ]
                },
                {
                  name: "Pro",
                  price: "$79",
                  description: "Most popular choice",
                  features: [
                    "15 active strategies",
                    "5 exchange connections",
                    "Advanced analytics",
                    "Priority support",
                    "Strategy backtesting"
                  ],
                  highlighted: true
                },
                {
                  name: "Enterprise",
                  price: "$199",
                  description: "For serious traders",
                  features: [
                    "Unlimited strategies",
                    "Unlimited exchanges",
                    "Premium analytics",
                    "24/7 dedicated support",
                    "Custom strategy development",
                    "API access"
                  ]
                }
              ].map((plan, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${
                    plan.highlighted 
                      ? 'border-2 border-trading-teal relative shadow-lg scale-105' 
                      : 'border border-border'
                  } rounded-xl overflow-hidden bg-card`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 left-0 right-0 bg-trading-teal text-white text-center py-1 text-xs font-medium">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                    <Button 
                      className={`w-full ${
                        plan.highlighted 
                          ? 'bg-trading-teal hover:bg-trading-teal/90' 
                          : 'bg-trading-navy hover:bg-trading-navy/90'
                      } text-white`}
                    >
                      Get Started
                    </Button>
                  </div>
                  <div className="border-t border-border p-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <Shield className="h-4 w-4 text-trading-teal mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-trading-navy text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-white text-trading-navy flex items-center justify-center">
                <BarChart2 className="h-5 w-5" />
              </div>
              <span className="font-semibold text-lg">TradingBot</span>
            </div>
            <p className="text-sm text-gray-300">
              Automated trading made simple with powerful strategies and secure connections.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">Features</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">Strategies</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">Exchanges</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">About</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">Terms</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">Privacy</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">Cookies</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-standard">Licenses</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} TradingBot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
