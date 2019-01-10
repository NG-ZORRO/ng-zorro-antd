export function classMapToString(map: { [ key: string ]: boolean }): string {
  return Object.keys(map).filter(item => !!map[ item ]).join(' ');
}
