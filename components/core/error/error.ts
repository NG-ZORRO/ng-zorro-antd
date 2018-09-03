export function RouterModuleNotImportedError(msg: string): Error {
  return new Error(`[NG-ZORRO] You should import 'RouterModule' if you want to use ${msg}.`);
}
