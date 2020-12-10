import { parseFragment, DefaultTreeDocument, DefaultTreeElement } from 'parse5';

const hasClassName = (node: DefaultTreeElement, className: string) => {
  return node.attrs?.find?.(attr => attr.name === 'class' && attr.value.indexOf(className) !== -1)
};

export function findElementWithoutStructuralDirective(html: string, tagName: string, directiveName: string, attr: string): number[] {
  const document = parseFragment(html, {sourceCodeLocationInfo: true}) as DefaultTreeDocument;
  const elements: DefaultTreeElement[] = [];

  const visitNodes = nodes => {
    nodes.forEach(node => {
      if (node.childNodes && !(node.tagName === 'ng-template' && !!node.attrs.find(a => a.name!.toLowerCase() === directiveName.toLowerCase()))) {
        visitNodes(node.childNodes);
      }

      if (node.tagName?.toLowerCase() === tagName.toLowerCase() && !!node.attrs.find(a => a.name!.toLowerCase() === attr.toLowerCase()) && !node.attrs.find(a => a.name!.toLowerCase() === `*${directiveName}`.toLowerCase())) {
        elements.push(node);
      }
    });
  };

  visitNodes(document.childNodes);

  return elements
    .filter(e => e?.sourceCodeLocation?.startTag)
    .map(element => element.sourceCodeLocation.startTag.startOffset)
}

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

  return elements
    .filter(e => e?.sourceCodeLocation?.startTag)
    .map(element => element.sourceCodeLocation.startTag.startOffset)
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

  return elements
    .filter(e => e?.sourceCodeLocation?.startTag)
    .map(element => element.sourceCodeLocation.attrs.class.startOffset)
}
