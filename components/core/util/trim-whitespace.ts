export function trimWhiteSpace(el: HTMLElement): void {
  Array.from(el.childNodes).forEach((node: HTMLElement) => {
    if (node.nodeType === 3) {
      el.removeChild(node);
    }
  });
}
