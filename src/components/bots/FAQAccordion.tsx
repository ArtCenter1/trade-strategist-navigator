
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQAccordion: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-sm">What are bots?</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">
          Bots are automated trading programs that execute trades based on predefined strategies and market conditions without requiring constant human intervention.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-sm">How do I get started?</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">
          Select a bot from the available options, configure its parameters according to your trading preferences, backtest to validate performance, and then activate it to start automated trading.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-sm">Can I run multiple bots?</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">
          Yes, you can run multiple bots simultaneously across different markets or with varying strategies to diversify your trading approach.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-4">
        <AccordionTrigger className="text-sm">What is a backtest?</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">
          Backtesting is the process of testing a trading strategy against historical data to evaluate its performance before deploying it with real funds.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
