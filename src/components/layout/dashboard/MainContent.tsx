
import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="container max-w-7xl mx-auto p-4 md:p-6">
        {children}
      </div>
    </main>
  );
}
