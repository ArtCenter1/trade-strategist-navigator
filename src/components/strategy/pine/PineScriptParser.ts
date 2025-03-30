
import { PineScriptNode, PineScriptStrategy } from './PineScriptTypes';

/**
 * Simple Pine Script parser
 * This is a basic implementation that will need to be expanded to support the full Pine Script syntax
 */
export class PineScriptParser {
  private tokens: string[] = [];
  private current: number = 0;
  private source: string = '';

  parse(source: string): PineScriptStrategy {
    this.source = source;
    this.tokens = this.tokenize(source);
    this.current = 0;
    
    const ast: PineScriptNode[] = [];
    let name = 'Custom Strategy';
    let description = 'Custom strategy created with Pine Script';
    const entryConditions: PineScriptNode[] = [];
    const exitConditions: PineScriptNode[] = [];
    
    // Parse the script
    while (!this.isAtEnd()) {
      const stmt = this.parseStatement();
      
      // Extract strategy metadata
      if (stmt.type === 'assignment' && stmt.variable === 'strategy.name') {
        if (stmt.value.type === 'literal' && typeof stmt.value.value === 'string') {
          name = stmt.value.value;
        }
      } else if (stmt.type === 'assignment' && stmt.variable === 'strategy.description') {
        if (stmt.value.type === 'literal' && typeof stmt.value.value === 'string') {
          description = stmt.value.value;
        }
      } else if (stmt.type === 'functionCall' && stmt.name === 'strategy.entry') {
        // Extract entry conditions from strategy.entry calls
        entryConditions.push(stmt.arguments[2]);
      } else if (stmt.type === 'functionCall' && stmt.name === 'strategy.exit') {
        // Extract exit conditions from strategy.exit calls
        exitConditions.push(stmt.arguments[2]);
      }
      
      ast.push(stmt);
    }
    
    return { name, description, ast, entryConditions, exitConditions };
  }
  
  private tokenize(source: string): string[] {
    // Simple tokenizer - in a real implementation, this would be more robust
    // This is just a placeholder implementation
    const tokens: string[] = [];
    const regex = /[A-Za-z_][A-Za-z0-9_]*|[0-9]+(\.[0-9]+)?|==|!=|<=|>=|&&|\|\||:|[+\-*/().=<>{}[\],]/g;
    
    let match;
    while ((match = regex.exec(source)) !== null) {
      tokens.push(match[0]);
    }
    
    return tokens;
  }
  
  private parseStatement(): PineScriptNode {
    // Simplified statement parsing - would be expanded in a full implementation
    if (this.match('var', 'const')) {
      return this.parseVariableDeclaration();
    }
    
    if (this.match('if')) {
      return this.parseConditional();
    }
    
    return this.parseExpression();
  }
  
  private parseVariableDeclaration(): PineScriptNode {
    const varType = this.previous() as 'var' | 'const';
    const name = this.consume('identifier', 'Expect variable name.');
    
    this.consume('=', 'Expect "=" after variable name.');
    const value = this.parseExpression();
    
    return {
      type: 'variableDeclaration',
      name,
      value,
      varType
    };
  }
  
  private parseConditional(): PineScriptNode {
    this.consume('(', 'Expect "(" after "if".');
    const test = this.parseExpression();
    this.consume(')', 'Expect ")" after condition.');
    
    this.consume('{', 'Expect "{" before if body.');
    const consequent: PineScriptNode[] = [];
    while (!this.check('}') && !this.isAtEnd()) {
      consequent.push(this.parseStatement());
    }
    this.consume('}', 'Expect "}" after if body.');
    
    let alternate: PineScriptNode[] | undefined;
    if (this.match('else')) {
      this.consume('{', 'Expect "{" before else body.');
      alternate = [];
      while (!this.check('}') && !this.isAtEnd()) {
        alternate.push(this.parseStatement());
      }
      this.consume('}', 'Expect "}" after else body.');
    }
    
    return {
      type: 'conditional',
      test,
      consequent,
      alternate
    };
  }
  
  private parseExpression(): PineScriptNode {
    // Simplified expression parsing
    const left = this.parseTerm();
    
    if (this.match('=') && left.type === 'identifier') {
      const value = this.parseExpression();
      return {
        type: 'assignment',
        variable: left.name,
        value
      };
    }
    
    if (this.match('crossover')) {
      this.consume('(', 'Expect "(" after "crossover".');
      const right = this.parseExpression();
      this.consume(')', 'Expect ")" after crossover argument.');
      
      return {
        type: 'crossover',
        left,
        right
      };
    }
    
    return left;
  }
  
  private parseTerm(): PineScriptNode {
    const left = this.parseFactor();
    
    if (this.match('+', '-')) {
      const operator = this.previous();
      const right = this.parseTerm();
      
      return {
        type: 'binary',
        operator,
        left,
        right
      };
    }
    
    return left;
  }
  
  private parseFactor(): PineScriptNode {
    const left = this.parsePrimary();
    
    if (this.match('*', '/')) {
      const operator = this.previous();
      const right = this.parseFactor();
      
      return {
        type: 'binary',
        operator,
        left,
        right
      };
    }
    
    return left;
  }
  
  private parsePrimary(): PineScriptNode {
    if (this.match('true', 'false')) {
      return {
        type: 'literal',
        value: this.previous() === 'true'
      };
    }
    
    if (this.match('number')) {
      return {
        type: 'literal',
        value: parseFloat(this.previous())
      };
    }
    
    if (this.match('string')) {
      return {
        type: 'literal',
        value: this.previous()
      };
    }
    
    if (this.match('identifier')) {
      const name = this.previous();
      
      if (this.match('(')) {
        const args: PineScriptNode[] = [];
        
        if (!this.check(')')) {
          do {
            args.push(this.parseExpression());
          } while (this.match(','));
        }
        
        this.consume(')', 'Expect ")" after arguments.');
        
        return {
          type: 'functionCall',
          name,
          arguments: args
        };
      }
      
      return {
        type: 'identifier',
        name
      };
    }
    
    if (this.match('(')) {
      const expr = this.parseExpression();
      this.consume(')', 'Expect ")" after expression.');
      return expr;
    }
    
    throw new Error(`Unexpected token: ${this.peek()}`);
  }
  
  private match(...tokens: string[]): boolean {
    for (const token of tokens) {
      if (this.check(token)) {
        this.advance();
        return true;
      }
    }
    
    return false;
  }
  
  private check(token: string): boolean {
    if (this.isAtEnd()) return false;
    return this.peek() === token;
  }
  
  private advance(): string {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }
  
  private isAtEnd(): boolean {
    return this.current >= this.tokens.length;
  }
  
  private peek(): string {
    return this.tokens[this.current];
  }
  
  private previous(): string {
    return this.tokens[this.current - 1];
  }
  
  private consume(token: string, message: string): string {
    if (this.check(token)) return this.advance();
    throw new Error(message);
  }
}
