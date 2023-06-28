import { parse } from "@babel/parser";
import { Node } from "@babel/types";

export function parseFile(text: string): Node {
  return parse(text, {
    sourceType: "module",
    plugins: ["typescript"],
  });
}
