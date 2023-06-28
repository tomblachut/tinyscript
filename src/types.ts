export abstract class Type {
  abstract printType(): string;
}

export class DummyType extends Type {
  override printType(): string {
    return "unimplemented";
  }
}

export class BooleanType extends Type {
  override printType(): string {
    return "boolean";
  }
}

export class StringType extends Type {
  override printType(): string {
    return "string";
  }
}

export class NumberType extends Type {
  override printType(): string {
    return "number";
  }
}
