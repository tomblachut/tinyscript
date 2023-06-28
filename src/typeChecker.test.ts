import { Annotation, typeChecker } from "./typeChecker";

const getMessage = (annotation: Annotation) => annotation.message;

test("empty result for valid code", () => {
  const annotations = typeChecker(`
    2 + 3;
  `);

  expect(annotations.map(getMessage)).toStrictEqual([]);
});

test("binary expressions", () => {
  const annotations = typeChecker(`
    2 + true;
  `);

  expect(annotations.map(getMessage)).toStrictEqual([
    "Operator '+' cannot be applied to types 'number' and 'boolean'",
  ]);
});
