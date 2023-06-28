import { traverse, Node } from "@babel/types";
import { check, CheckContext } from "./check";
import { parseFile } from "./parseFile";
import { Type } from "./types";

export interface Annotation {
  message: string;
  offset: number;
}

export function typeChecker(text: string): Annotation[] {
  const annotations: Annotation[] = [];

  const rootNode = parseFile(text);

  const context: CheckContext = {
    typeCache: new WeakMap<Node, Type>(),
    annotate(node: Node, message: string) {
      annotations.push({ message: message, offset: node.start ?? 0 });
    },
  };

  let stoppedAtNode: Node | undefined = undefined;
  traverse(rootNode, {
    enter(node, parents) {
      if (stoppedAtNode != undefined) return;
      if (context.typeCache.has(node)) {
        stoppedAtNode = node;
        return;
      }

      check(node, context);
    },
    exit(node, parents) {
      if (stoppedAtNode == node) {
        stoppedAtNode = undefined;
      }
    },
  });

  return annotations;
}
