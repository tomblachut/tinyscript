import { parseFile } from "./parseFile";

export interface Annotation {
  message: string;
  offset: number;
}

export function typeChecker(text: string): Annotation[] {
  const annotations: Annotation[] = [];

  const rootNode = parseFile(text);

  return annotations;
}
