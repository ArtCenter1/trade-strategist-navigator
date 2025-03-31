
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AssetTable } from "@/components/dashboard/AssetTable";
import { ArrowUpRight, Search, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PortfolioDetails() {
  return (
    <Card className="bg-[#1A1A1A] border-[#333333] text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-md">Portfolio Overview</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#999999]" />
            <Input 
              className="w-[200px] pl-8 h-9 bg-[#222222] border-[#333333] text-white placeholder:text-[#666666]" 
              placeholder="Search Assets"
            />
          </div>
          <Button className="bg-[#34C759] hover:bg-[#2EB050] text-white">
            <Wallet className="mr-1 h-4 w-4" />
            Deposit
          </Button>
          <Button variant="outline" className="border-[#444444] text-white hover:bg-[#333333]">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="balances">
          <div className="border-b border-[#333333] px-6">
            <TabsList className="bg-transparent h-12">
              <TabsTrigger 
                value="balances" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white rounded-none h-12 text-[#999999]"
              >
                Balances
              </TabsTrigger>
              <TabsTrigger 
                value="open-orders" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white rounded-none h-12 text-[#999999]"
              >
                Open Orders
                <Badge className="ml-1 bg-[#FF3B30] text-white" variant="default">1</Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="order-history" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white rounded-none h-12 text-[#999999]"
              >
                Order History
              </TabsTrigger>
              <TabsTrigger 
                value="transfers" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:text-white rounded-none h-12 text-[#999999]"
              >
                Transfers
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="balances" className="m-0">
            <AssetTable />
          </TabsContent>
          
          <TabsContent value="open-orders" className="m-0 p-6">
            <p className="text-[#999999]">Your open orders will appear here.</p>
          </TabsContent>
          
          <TabsContent value="order-history" className="m-0 p-6">
            <p className="text-[#999999]">Your order history will appear here.</p>
          </TabsContent>
          
          <TabsContent value="transfers" className="m-0 p-6">
            <p className="text-[#999999]">Your transfers will appear here.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
