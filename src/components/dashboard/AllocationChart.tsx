
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { themeColors } from "@/lib/theme-config";
import { Card } from "@/components/ui/card";

// Mock data for the asset allocation
const data = [
  { name: "BTC", value: 30, color: "#F7931A" },
  { name: "ETH", value: 25, color: "#627EEA" },
  { name: "SOL", value: 15, color: "#00FFBD" },
  { name: "USDT", value: 10, color: "#26A17B" },
  { name: "Other", value: 20, color: "#9F7AEA" },
];

export function AllocationChart() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="bg-[#222222] border-[#333333] p-2 text-white text-xs">
          <div className="font-bold">{payload[0].name}</div>
          <div>{payload[0].value}%</div>
        </Card>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={1}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          formatter={(value, entry, index) => (
            <span className="text-white">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
