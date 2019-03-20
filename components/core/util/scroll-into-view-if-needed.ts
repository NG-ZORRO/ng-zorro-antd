export function scrollIntoView(node: HTMLElement): void {
  const nodeAsAny = node as any; // tslint:disable-line:no-any
  if (nodeAsAny.scrollIntoViewIfNeeded) {
    /* tslint:disable-next-line:no-string-literal */
    nodeAsAny.scrollIntoViewIfNeeded(false);
    return;
  }
  if (node.scrollIntoView) {
    node.scrollIntoView(false);
    return;
  }
}
