import { Annotation, typeChecker } from "./typeChecker";

const getMessage = (annotation: Annotation) => annotation.message;

test("empty result for valid code", () => {
  const annotations = typeChecker(`
    2 + 3 * 4;
  `);

  expect(annotations.map(getMessage)).toStrictEqual([]);
});
