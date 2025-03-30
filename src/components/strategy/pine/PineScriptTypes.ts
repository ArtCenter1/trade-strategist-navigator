
// Type definitions for Pine Script interpreter

export type PineScriptValue = 
  | number
  | boolean
  | string
  | PineScriptSeries;

export type PineScriptSeries = {
  values: number[];
  time: number[];
};

export type PineScriptVariable = {
  name: string;
  value: PineScriptValue;
  type: 'var' | 'const';
};

export type PineScriptFunction = {
  name: string;
  params: string[];
  body: PineScriptNode[];
};

export type PineScriptNode = 
  | { type: 'assignment'; variable: string; value: PineScriptNode }
  | { type: 'variableDeclaration'; name: string; value: PineScriptNode; varType: 'var' | 'const' }
  | { type: 'identifier'; name: string }
  | { type: 'literal'; value: PineScriptValue }
  | { type: 'binary'; operator: string; left: PineScriptNode; right: PineScriptNode }
  | { type: 'unary'; operator: string; argument: PineScriptNode }
  | { type: 'functionCall'; name: string; arguments: PineScriptNode[] }
  | { type: 'conditional'; test: PineScriptNode; consequent: PineScriptNode[]; alternate?: PineScriptNode[] }
  | { type: 'crossover'; left: PineScriptNode; right: PineScriptNode };

export type PineScriptContext = {
  variables: Map<string, PineScriptValue>;
  functions: Map<string, PineScriptFunction>;
  builtins: Map<string, (...args: PineScriptValue[]) => PineScriptValue>;
};

export type PineScriptStrategy = {
  name: string;
  description: string;
  ast: PineScriptNode[];
  entryConditions: PineScriptNode[];
  exitConditions: PineScriptNode[];
};
