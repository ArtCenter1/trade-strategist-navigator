
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import type { StrategyDetails } from "../types";

interface StrategyConfigurationTabProps {
  strategy: StrategyDetails;
  onSaveConfiguration: () => void;
}

export function StrategyConfigurationTab({ strategy, onSaveConfiguration }: StrategyConfigurationTabProps) {
  // Create a dynamic form based on the strategy type
  const form = useForm({
    defaultValues: strategy?.parameters || {}
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Configuration</CardTitle>
        <CardDescription>
          Adjust the parameters to optimize the strategy for your trading style.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-6">
            {Object.entries(strategy.parameters).map(([key, value]) => {
              const isNumeric = typeof value === 'number';
              
              return (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                      </FormLabel>
                      <FormControl>
                        {isNumeric ? (
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-4">
                              <Slider
                                value={[field.value]}
                                min={Math.max(1, Math.floor(field.value / 2))}
                                max={Math.ceil(field.value * 2)}
                                step={1}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                              <Input
                                type="number"
                                className="w-20"
                                value={field.value}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </div>
                          </div>
                        ) : (
                          <Input {...field} />
                        )}
                      </FormControl>
                      <FormDescription>
                        {isNumeric
                          ? `Default value: ${value}`
                          : `Enter a valid ${typeof value}`}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              );
            })}
          </div>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => {
          // Type-safe reset
          form.reset(strategy.parameters);
        }}>
          Reset to Defaults
        </Button>
        <Button onClick={onSaveConfiguration}>
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  );
}
