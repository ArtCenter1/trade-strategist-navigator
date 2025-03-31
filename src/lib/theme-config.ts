
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper function for combining class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme color palette
export const themeColors = {
  // Dark theme colors
  background: "#111111",
  cardBackground: "#1A1A1A",
  foreground: "#FFFFFF",
  muted: "#333333",
  mutedForeground: "#999999",
  border: "#333333",
  primaryRed: "#FF3B30",
  primaryGreen: "#34C759",
  chartLine: "#FF3B30",
  highlight: "#333333",
  
  // Asset colors for allocation chart
  assetColors: [
    "#9F7AEA", // Purple
    "#4299E1", // Blue
    "#38B2AC", // Teal
    "#48BB78", // Green
    "#ED8936", // Orange
    "#F56565", // Red
    "#667EEA", // Indigo
    "#ED64A6", // Pink
    "#ECC94B", // Yellow
    "#A0AEC0", // Gray
  ]
};

// Trading platform specific colors
export const tradingColors = {
  positive: "#34C759",
  negative: "#FF3B30",
  neutral: "#999999",
  btc: "#F7931A",
  eth: "#627EEA",
  usdt: "#26A17B",
};

// Format currency values
export function formatCurrency(value: number, currency = "USD", minimumFractionDigits = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits: 2,
  }).format(value);
}

// Format percentage values
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero"
  }).format(value / 100);
}

// Format crypto amounts based on value
export function formatCryptoAmount(amount: number): string {
  if (amount === 0) return "0";
  
  if (amount < 0.001) {
    return amount.toExponential(4);
  } else if (amount < 1) {
    return amount.toFixed(6);
  } else if (amount < 1000) {
    return amount.toFixed(4);
  } else {
    return amount.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
}
