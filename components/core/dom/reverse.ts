export function reverseChildNodes(parent: HTMLElement): void {
  const children = parent.childNodes;
  let length = children.length;
  if (length) {
    const nodes: Node[] = [];
    children.forEach((node, i) => nodes[ i ] = node);
    while (length--) {
      parent.appendChild(nodes[ length ]);
    }
  }
}
