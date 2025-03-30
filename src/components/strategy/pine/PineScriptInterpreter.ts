
import { 
  PineScriptContext, 
  PineScriptNode, 
  PineScriptValue, 
  PineScriptSeries,
  PineScriptStrategy
} from "./PineScriptTypes";

// Initialize a Pine Script context with standard built-in functions
export const createPineScriptContext = (): PineScriptContext => {
  const context: PineScriptContext = {
    variables: new Map(),
    functions: new Map(),
    builtins: new Map()
  };

  // Add built-in functions
  context.builtins.set("sma", (series, length) => {
    if (typeof series !== "object" || !("values" in series) || !("time" in series)) {
      throw new Error("SMA requires a series as first argument");
    }
    if (typeof length !== "number") {
      throw new Error("SMA requires a number as second argument");
    }

    const values = (series as PineScriptSeries).values;
    const time = (series as PineScriptSeries).time;
    const result: number[] = [];

    for (let i = 0; i < values.length; i++) {
      if (i < length - 1) {
        result.push(0); // Not enough data yet
      } else {
        let sum = 0;
        for (let j = i - length + 1; j <= i; j++) {
          sum += values[j];
        }
        result.push(sum / length);
      }
    }

    return { values: result, time } as PineScriptSeries;
  });

  context.builtins.set("ema", (series, length) => {
    if (typeof series !== "object" || !("values" in series) || !("time" in series)) {
      throw new Error("EMA requires a series as first argument");
    }
    if (typeof length !== "number") {
      throw new Error("EMA requires a number as second argument");
    }

    const values = (series as PineScriptSeries).values;
    const time = (series as PineScriptSeries).time;
    const result: number[] = [];
    const alpha = 2 / (length + 1);

    for (let i = 0; i < values.length; i++) {
      if (i === 0) {
        result.push(values[i]);
      } else {
        result.push(alpha * values[i] + (1 - alpha) * result[i - 1]);
      }
    }

    return { values: result, time } as PineScriptSeries;
  });

  context.builtins.set("rsi", (series, length) => {
    if (typeof series !== "object" || !("values" in series) || !("time" in series)) {
      throw new Error("RSI requires a series as first argument");
    }
    if (typeof length !== "number") {
      throw new Error("RSI requires a number as second argument");
    }

    const values = (series as PineScriptSeries).values;
    const time = (series as PineScriptSeries).time;
    const result: number[] = [];
    const gains: number[] = [];
    const losses: number[] = [];

    // Calculate gains and losses
    for (let i = 0; i < values.length; i++) {
      if (i === 0) {
        gains.push(0);
        losses.push(0);
      } else {
        const change = values[i] - values[i - 1];
        gains.push(change > 0 ? change : 0);
        losses.push(change < 0 ? -change : 0);
      }
    }

    // Calculate average gains and losses over the specified length
    let avgGain = 0;
    let avgLoss = 0;

    for (let i = 0; i < values.length; i++) {
      if (i < length) {
        // Not enough data yet
        result.push(0);
        continue;
      }

      if (i === length) {
        // First calculation uses simple average
        let sumGain = 0;
        let sumLoss = 0;
        for (let j = i - length + 1; j <= i; j++) {
          sumGain += gains[j];
          sumLoss += losses[j];
        }
        avgGain = sumGain / length;
        avgLoss = sumLoss / length;
      } else {
        // Subsequent calculations use smoothed values
        avgGain = ((avgGain * (length - 1)) + gains[i]) / length;
        avgLoss = ((avgLoss * (length - 1)) + losses[i]) / length;
      }

      if (avgLoss === 0) {
        result.push(100);
      } else {
        const rs = avgGain / avgLoss;
        result.push(100 - (100 / (1 + rs)));
      }
    }

    return { values: result, time } as PineScriptSeries;
  });

  context.builtins.set("crossover", (a, b) => {
    if (typeof a !== "object" || !("values" in a) || !("time" in a)) {
      throw new Error("Crossover requires a series as first argument");
    }

    const aValues = (a as PineScriptSeries).values;
    const time = (a as PineScriptSeries).time;
    const result: number[] = [];

    // If b is a series, use its values, otherwise use b as a constant
    const bValues = typeof b === "object" && "values" in b
      ? (b as PineScriptSeries).values
      : Array(aValues.length).fill(b as number);

    for (let i = 0; i < aValues.length; i++) {
      if (i === 0) {
        result.push(0); // No crossover on first value
      } else {
        // Crossover occurs when a crosses above b
        const crossover = aValues[i] > bValues[i] && aValues[i - 1] <= bValues[i - 1];
        result.push(crossover ? 1 : 0);
      }
    }

    return { values: result, time } as PineScriptSeries;
  });

  context.builtins.set("crossunder", (a, b) => {
    if (typeof a !== "object" || !("values" in a) || !("time" in a)) {
      throw new Error("Crossunder requires a series as first argument");
    }

    const aValues = (a as PineScriptSeries).values;
    const time = (a as PineScriptSeries).time;
    const result: number[] = [];

    // If b is a series, use its values, otherwise use b as a constant
    const bValues = typeof b === "object" && "values" in b
      ? (b as PineScriptSeries).values
      : Array(aValues.length).fill(b as number);

    for (let i = 0; i < aValues.length; i++) {
      if (i === 0) {
        result.push(0); // No crossunder on first value
      } else {
        // Crossunder occurs when a crosses below b
        const crossunder = aValues[i] < bValues[i] && aValues[i - 1] >= bValues[i - 1];
        result.push(crossunder ? 1 : 0);
      }
    }

    return { values: result, time } as PineScriptSeries;
  });

  return context;
};

// Evaluate a Pine Script AST within a context
export const evaluatePineScript = (
  ast: PineScriptNode[],
  context: PineScriptContext
): PineScriptValue => {
  let result: PineScriptValue = 0;

  for (const node of ast) {
    result = evaluateNode(node, context);
  }

  return result;
};

// Evaluate a single Pine Script node
const evaluateNode = (
  node: PineScriptNode,
  context: PineScriptContext
): PineScriptValue => {
  switch (node.type) {
    case "literal":
      return node.value;

    case "identifier":
      if (context.variables.has(node.name)) {
        return context.variables.get(node.name)!;
      }
      throw new Error(`Variable "${node.name}" is not defined`);

    case "assignment":
      const value = evaluateNode(node.value, context);
      context.variables.set(node.variable, value);
      return value;

    case "variableDeclaration":
      const varValue = evaluateNode(node.value, context);
      context.variables.set(node.name, varValue);
      return varValue;

    case "binary":
      const left = evaluateNode(node.left, context);
      const right = evaluateNode(node.right, context);

      switch (node.operator) {
        case "+":
          return (left as number) + (right as number);
        case "-":
          return (left as number) - (right as number);
        case "*":
          return (left as number) * (right as number);
        case "/":
          return (left as number) / (right as number);
        case ">":
          return (left as number) > (right as number);
        case "<":
          return (left as number) < (right as number);
        case ">=":
          return (left as number) >= (right as number);
        case "<=":
          return (left as number) <= (right as number);
        case "==":
          return left === right;
        case "!=":
          return left !== right;
        case "and":
          return Boolean(left) && Boolean(right);
        case "or":
          return Boolean(left) || Boolean(right);
        default:
          throw new Error(`Unknown binary operator "${node.operator}"`);
      }

    case "unary":
      const argument = evaluateNode(node.argument, context);

      switch (node.operator) {
        case "-":
          return -(argument as number);
        case "!":
          return !Boolean(argument);
        default:
          throw new Error(`Unknown unary operator "${node.operator}"`);
      }

    case "functionCall":
      const fn = context.builtins.get(node.name);
      if (!fn) {
        throw new Error(`Function "${node.name}" is not defined`);
      }

      const args = node.arguments.map(arg => evaluateNode(arg, context));
      return fn(...args);

    case "conditional":
      const test = evaluateNode(node.test, context);
      if (Boolean(test)) {
        for (const stmt of node.consequent) {
          evaluateNode(stmt, context);
        }
      } else if (node.alternate) {
        for (const stmt of node.alternate) {
          evaluateNode(stmt, context);
        }
      }
      return 0;

    case "crossover":
      const a = evaluateNode(node.left, context);
      const b = evaluateNode(node.right, context);
      
      // In a real implementation, we'd need to handle series data here
      // For simplicity, we're just returning a boolean
      return context.builtins.get("crossover")!(a, b);

    default:
      throw new Error(`Unknown node type: ${(node as any).type}`);
  }
};

// Extract entry and exit conditions from a Pine Script AST
export const extractConditions = (ast: PineScriptNode[]): PineScriptStrategy => {
  // In a real implementation, we would parse the AST to identify entry and exit conditions
  // For simplicity, we're returning empty arrays here
  return {
    name: "Custom Pine Script Strategy",
    description: "A strategy created using Pine Script",
    ast,
    entryConditions: [],
    exitConditions: []
  };
};

// Run a Pine Script strategy against historical data
export const runPineScriptStrategy = (
  script: string,
  historicalData: any[]
): any => {
  // In a real implementation, we would:
  // 1. Parse the script into an AST
  // 2. Create a context with the historical data
  // 3. Evaluate the AST within the context
  // 4. Extract the results
  
  // For now, we'll return a mock result
  return {
    trades: [],
    equityCurve: [],
    metrics: {
      winRate: 0,
      profitFactor: 0,
      maxDrawdown: 0
    }
  };
};
