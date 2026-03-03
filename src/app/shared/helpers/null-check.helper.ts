export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function isNullOrEmpty(value: unknown): boolean {
  return value === null || value === undefined || value === '';
}