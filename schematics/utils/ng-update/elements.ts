import { parseFragment, DefaultTreeDocument, DefaultTreeElement } from 'parse5';

const hasClassName = (node: DefaultTreeElement, className: string) => {
  return node.attrs?.find?.(attr => attr.name === 'class' && attr.value.indexOf(className) !== -1)
};

export function findElementWithTag(html: string, tagName: string): number[] {
  const document = parseFragment(html, {sourceCodeLocationInfo: true}) as DefaultTreeDocument;
  const elements: DefaultTreeElement[] = [];

  const visitNodes = nodes => {
    nodes.forEach(node => {
      if (node.childNodes) {
        visitNodes(node.childNodes);
      }

      if (node.tagName?.toLowerCase() === tagName.toLowerCase()) {
        elements.push(node);
      }
    });
  };

  visitNodes(document.childNodes);

  return elements.map(element => element.sourceCodeLocation.startTag.startOffset)
}

export function findElementWithClassName(html: string, className: string, tagName: string): number[] {
  const document = parseFragment(html, {sourceCodeLocationInfo: true}) as DefaultTreeDocument;
  const elements: DefaultTreeElement[] = [];

  const visitNodes = nodes => {
    nodes.forEach(node => {
      if (node.childNodes) {
        visitNodes(node.childNodes);
      }

      if (hasClassName(node, className) && node.tagName?.toLowerCase() === tagName.toLowerCase()) {
        elements.push(node);
      }
    });
  };

  visitNodes(document.childNodes);

  return elements.map(element => element.sourceCodeLocation.attrs.class.startOffset)
}
