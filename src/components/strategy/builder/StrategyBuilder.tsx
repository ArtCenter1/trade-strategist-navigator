
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndicatorSelector } from "./IndicatorSelector";
import { RuleBuilder } from "./RuleBuilder";
import { BasicSettingsTab } from "./form/BasicSettingsTab";
import { FormNavigation } from "./form/FormNavigation";
import { useStrategyForm } from "./hooks/useStrategyForm";
import { BacktestingTab } from "./form/BacktestingTab";

export function StrategyBuilder() {
  const {
    form,
    activeTab,
    setActiveTab,
    selectedIndicators,
    setSelectedIndicators,
    rules,
    setRules,
    onSubmit,
    enableStopLoss,
    enableTakeProfit
  } = useStrategyForm();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Strategy Builder</CardTitle>
        <CardDescription>
          Create a custom trading strategy with your own rules and parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="basic">Basic Settings</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
            <TabsTrigger value="rules">Trading Rules</TabsTrigger>
            <TabsTrigger value="backtest">Backtest</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value="basic">
                <BasicSettingsTab control={form.control} />
              </TabsContent>
              
              <TabsContent value="indicators">
                <IndicatorSelector 
                  selectedIndicators={selectedIndicators}
                  setSelectedIndicators={setSelectedIndicators}
                />
              </TabsContent>
              
              <TabsContent value="rules">
                <RuleBuilder
                  rules={rules}
                  setRules={setRules}
                  selectedIndicators={selectedIndicators}
                />
              </TabsContent>
              
              <TabsContent value="backtest">
                <BacktestingTab 
                  strategy={form.getValues()}
                  selectedIndicators={selectedIndicators}
                  rules={rules}
                />
              </TabsContent>
              
              <FormNavigation 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                canSubmit={form.formState.isValid}
                selectedIndicators={selectedIndicators}
                rules={rules}
              />
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
