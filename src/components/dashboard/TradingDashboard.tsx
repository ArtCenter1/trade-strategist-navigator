
import React from "react";
import { PortfolioSummary } from "@/components/dashboard/PortfolioSummary";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { PortfolioDetails } from "@/components/dashboard/PortfolioDetails";

const TradingDashboard = () => {
  // Mock data - In real implementation, this would come from API
  const portfolioValue = 47854.48;
  const portfolioChange = -2139.11;
  const portfolioChangePercent = -4.28;
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#111111] text-white">
      {/* Portfolio Summary */}
      <PortfolioSummary 
        portfolioValue={portfolioValue}
        portfolioChange={portfolioChange}
        portfolioChangePercent={portfolioChangePercent}
      />
      
      {/* Performance Chart and Allocation */}
      <ChartsSection />
      
      {/* Portfolio Details */}
      <PortfolioDetails />
    </div>
  );
};

export default TradingDashboard;
