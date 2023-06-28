import { Annotation, typeChecker } from "./typeChecker";

const getMessage = (annotation: Annotation) => annotation.message;

test("empty result for valid code", () => {
  const annotations = typeChecker(`
    2 + 3 * 4;
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

test("complex code", () => {
  const annotations = typeChecker(`
    type Money = number;
    
    interface Dto {}
    
    function someComplexBusiness(dto: Dto): Money {
      if (Math.random()) {
        return 2 + true;
      }
    }
  `);

  expect(annotations.map(getMessage)).toStrictEqual([
    "Operator '+' cannot be applied to types 'number' and 'boolean'",
  ]);
});
