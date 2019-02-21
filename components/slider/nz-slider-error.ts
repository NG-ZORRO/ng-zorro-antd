export function getValueTypeNotMatchError(): Error {
  return new Error(`The "nzRange" can't match the "nzValue"'s type, please check these properties: "nzRange", "nzValue", "nzDefaultValue".`);
}
