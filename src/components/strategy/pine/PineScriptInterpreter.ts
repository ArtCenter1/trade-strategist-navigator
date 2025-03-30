
import { PineScriptContext, PineScriptNode, PineScriptValue } from './PineScriptTypes';

/**
 * Basic Pine Script interpreter
 * This is a simplified implementation that would need to be expanded for a full Pine Script implementation
 */
export class PineScriptInterpreter {
  private context: PineScriptContext;
  
  constructor() {
    this.context = {
      variables: new Map(),
      functions: new Map(),
      builtins: this.setupBuiltins()
    };
  }
  
  evaluate(node: PineScriptNode): PineScriptValue {
    switch (node.type) {
      case 'literal':
        return node.value;
        
      case 'identifier':
        if (!this.context.variables.has(node.name)) {
          throw new Error(`Undefined variable: ${node.name}`);
        }
        return this.context.variables.get(node.name)!;
        
      case 'binary':
        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);
        
        if (typeof left !== 'number' || typeof right !== 'number') {
          throw new Error('Binary operations only work on numbers');
        }
        
        switch (node.operator) {
          case '+': return left + right;
          case '-': return left - right;
          case '*': return left * right;
          case '/': return left / right;
          case '==': return left === right;
          case '!=': return left !== right;
          case '>': return left > right;
          case '<': return left < right;
          case '>=': return left >= right;
          case '<=': return left <= right;
          default:
            throw new Error(`Unknown operator: ${node.operator}`);
        }
        
      case 'unary':
        const argument = this.evaluate(node.argument);
        
        if (typeof argument !== 'number') {
          throw new Error('Unary operations only work on numbers');
        }
        
        switch (node.operator) {
          case '-': return -argument;
          case '+': return argument;
          default:
            throw new Error(`Unknown unary operator: ${node.operator}`);
        }
        
      case 'assignment':
        const value = this.evaluate(node.value);
        this.context.variables.set(node.variable, value);
        return value;
        
      case 'variableDeclaration':
        const varValue = this.evaluate(node.value);
        this.context.variables.set(node.name, varValue);
        return varValue;
        
      case 'functionCall':
        if (this.context.builtins.has(node.name)) {
          const fn = this.context.builtins.get(node.name)!;
          const args = node.arguments.map(arg => this.evaluate(arg));
          return fn(...args);
        }
        
        throw new Error(`Unknown function: ${node.name}`);
        
      case 'conditional':
        const testResult = this.evaluate(node.test);
        
        if (testResult) {
          for (const stmt of node.consequent) {
            this.evaluate(stmt);
          }
        } else if (node.alternate) {
          for (const stmt of node.alternate) {
            this.evaluate(stmt);
          }
        }
        
        return 0; // Conditionals don't return values in Pine Script
        
      case 'crossover':
        const series1 = this.evaluate(node.left);
        const series2 = this.evaluate(node.right);
        
        // Simple crossover check for now
        // In a real implementation, this would look at historical values
        if (typeof series1 === 'number' && typeof series2 === 'number') {
          return series1 > series2; // Simplified
        }
        
        return false;
        
      default:
        throw new Error(`Unknown node type: ${(node as any).type}`);
    }
  }
  
  evaluateStrategy(ast: PineScriptNode[]): boolean {
    // Reset the context for a new evaluation
    this.context.variables = new Map();
    
    for (const node of ast) {
      this.evaluate(node);
    }
    
    return true;
  }
  
  setupBuiltins(): Map<string, (...args: PineScriptValue[]) => PineScriptValue> {
    const builtins = new Map<string, (...args: PineScriptValue[]) => PineScriptValue>();
    
    // Technical indicators
    builtins.set('sma', (source: PineScriptValue, length: PineScriptValue) => {
      // Simple moving average implementation
      if (typeof source !== 'number' || typeof length !== 'number') {
        throw new Error('sma requires numeric arguments');
      }
      
      // In a real implementation, this would calculate the SMA using historical data
      return source; // Placeholder
    });
    
    builtins.set('rsi', (source: PineScriptValue, length: PineScriptValue) => {
      // RSI implementation
      if (typeof source !== 'number' || typeof length !== 'number') {
        throw new Error('rsi requires numeric arguments');
      }
      
      // In a real implementation, this would calculate the RSI using historical data
      return 50; // Placeholder
    });
    
    builtins.set('ema', (source: PineScriptValue, length: PineScriptValue) => {
      // Exponential moving average implementation
      if (typeof source !== 'number' || typeof length !== 'number') {
        throw new Error('ema requires numeric arguments');
      }
      
      // In a real implementation, this would calculate the EMA using historical data
      return source; // Placeholder
    });
    
    // Strategy execution functions
    builtins.set('strategy.entry', (id: PineScriptValue, direction: PineScriptValue, condition: PineScriptValue) => {
      // Strategy entry function
      console.log(`Entry signal: ${id} (${direction}) - Condition: ${condition}`);
      return true;
    });
    
    builtins.set('strategy.exit', (id: PineScriptValue, from: PineScriptValue, condition: PineScriptValue) => {
      // Strategy exit function
      console.log(`Exit signal: ${id} (from: ${from}) - Condition: ${condition}`);
      return true;
    });
    
    return builtins;
  }
}
