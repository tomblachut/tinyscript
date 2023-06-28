import * as types from "@babel/types";
import { Node } from "@babel/types";
import { BooleanType, NumberType, StringType, Type } from "./types";
import { todoType, withCache } from "./utils";

export interface CheckContext {
  typeCache: WeakMap<Node, Type>;

  annotate(node: Node, message: string): void;
}

export function check(node: Node, context: CheckContext) {
  function getType(node: Node): Type {
    return withCache(context.typeCache, node, () => {
      return getTypeImpl(node);
    });
  }

  function getTypeImpl(node: Node): Type {
    return getLiteralType(node) ?? getBinaryExpressionType(node) ?? todoType();
  }

  function getLiteralType(node: Node): Type | undefined {
    if (types.isLiteral(node)) {
      switch (node.type) {
        case "BooleanLiteral":
          return new BooleanType();
        case "NumericLiteral":
          return new NumberType();
        case "StringLiteral":
          return new StringType();
      }
    }
    return undefined;
  }

  function getBinaryExpressionType(node: Node): Type | undefined {
    if (types.isBinaryExpression(node)) {
      switch (node.operator) {
        case "+": {
          const left = getType(node.left);
          const right = getType(node.right);
          if (left instanceof StringType || right instanceof StringType) {
            return new StringType();
          }
          if (left instanceof NumberType || right instanceof NumberType) {
            return new NumberType();
          }
          return todoType();
        }
      }
    }
    return undefined;
  }

  getType(node);
}
