import { Node } from "@babel/types";
import { Type } from "./types";
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
    return todoType();
  }

  getType(node);
}
