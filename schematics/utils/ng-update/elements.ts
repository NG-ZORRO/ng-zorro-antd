import { parseFragment, DefaultTreeDocument, DefaultTreeElement } from 'parse5';

export function findElementWithTag(html: string, tagName: string): number[] {
  const document = parseFragment(html, {sourceCodeLocationInfo: true}) as DefaultTreeDocument;
  const elements: DefaultTreeElement[] = [];

  const visitNodes = nodes => {
    nodes.forEach(node => {
      if (node.childNodes) {
        visitNodes(node.childNodes);
      }

      if (node.tagName && node.tagName.toLowerCase() === tagName.toLowerCase()) {
        elements.push(node);
      }
    });
  };

  visitNodes(document.childNodes);

  return elements.map(element => element.sourceCodeLocation.startTag.startOffset)
}
