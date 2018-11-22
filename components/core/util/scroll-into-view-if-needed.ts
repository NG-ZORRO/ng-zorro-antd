export function scrollIntoView(node: HTMLElement): void {

  // Non-standard
  /* tslint:disable-next-line:no-string-literal */
  if (node['scrollIntoViewIfNeeded']) {
    /* tslint:disable-next-line:no-string-literal */
    node['scrollIntoViewIfNeeded'](false);
    return;
  }

  if (node.scrollIntoView) {
    node.scrollIntoView(false);
    return;
  }
}
