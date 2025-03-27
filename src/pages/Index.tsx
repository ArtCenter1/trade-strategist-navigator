import React from 'react';
import { NavigationHeader } from '@/components/layout/NavigationHeader';
import { HeroSection } from '@/components/landing/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1">
        <HeroSection />
        {/* Additional sections can be added here */}
      </main>
      {/* Footer component will be added later */}
    </div>
  );
};

export default Index;
