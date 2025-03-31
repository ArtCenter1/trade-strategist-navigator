
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { AllocationChart } from "@/components/dashboard/AllocationChart";

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      <Card className="bg-[#1A1A1A] border-[#333333] text-white lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md">Performance</CardTitle>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" className="h-8 bg-[#333333] border-[#444444] text-white hover:bg-[#444444]">Day</Button>
            <Button variant="outline" size="sm" className="h-8 bg-[#333333] border-[#444444] text-white hover:bg-[#444444]">Week</Button>
            <Button variant="outline" size="sm" className="h-8 bg-[#333333] border-[#444444] text-white hover:bg-[#444444]">Month</Button>
            <Button variant="outline" size="sm" className="h-8 bg-[#3a3a3a] border-[#444444] text-white hover:bg-[#444444]">Year</Button>
            <Button variant="outline" size="sm" className="h-8 bg-[#333333] border-[#444444] text-white hover:bg-[#444444]">5 Years</Button>
          </div>
        </CardHeader>
        <CardContent className="h-[300px]">
          <PerformanceChart />
        </CardContent>
      </Card>
      
      <Card className="bg-[#1A1A1A] border-[#333333] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Current Allocations</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <AllocationChart />
        </CardContent>
      </Card>
    </div>
  );
}
