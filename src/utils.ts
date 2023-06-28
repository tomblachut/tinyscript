import { DummyType, Type } from "./types";
import { Node } from "@babel/types";

export function withCache(
  typeCache: WeakMap<Node, Type>,
  node: Node,
  calculate: () => Type
) {
  if (typeCache.has(node)) {
    return typeCache.get(node)!;
  } else {
    const type = calculate();
    typeCache.set(node, type);
    return type;
  }
}

export function todoType(): Type {
  return new DummyType();
}