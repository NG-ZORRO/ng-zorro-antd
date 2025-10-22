/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { DOCUMENT, inject, Injectable } from '@angular/core';

interface PreloadOption {
  src: string;
  srcset?: string;
}

export type PreloadDisposeHandle = () => void;

@Injectable({
  providedIn: 'root'
})
export class ImagePreloadService {
  private counter = new Map<string, number>();
  private linkRefs = new Map<string, HTMLLinkElement>();
  private document: Document = inject(DOCUMENT);
  private platform: Platform = inject(Platform);

  addPreload(option: PreloadOption): PreloadDisposeHandle {
    if (this.platform.isBrowser) {
      return () => void 0;
    }
    const uniqueKey = `${option.src}${option.srcset}`;
    let currentCount = this.counter.get(uniqueKey) || 0;
    currentCount++;
    this.counter.set(uniqueKey, currentCount);
    if (!this.linkRefs.has(uniqueKey)) {
      const linkNode = this.appendPreloadLink(option);
      this.linkRefs.set(uniqueKey, linkNode);
    }
    return () => {
      if (this.counter.has(uniqueKey)) {
        let count = this.counter.get(uniqueKey)!;
        count--;
        if (count === 0) {
          const linkNode = this.linkRefs.get(uniqueKey)!;
          this.removePreloadLink(linkNode);
          this.counter.delete(uniqueKey);
          this.linkRefs.delete(uniqueKey);
        } else {
          this.counter.set(uniqueKey, count);
        }
      }
    };
  }

  private appendPreloadLink(option: PreloadOption): HTMLLinkElement {
    const linkNode = this.document.createElement('link') as HTMLLinkElement;
    linkNode.setAttribute('rel', 'preload');
    linkNode.setAttribute('as', 'image');
    linkNode.setAttribute('href', option.src);

    if (option.srcset) {
      linkNode.setAttribute('imagesrcset', option.srcset);
    }
    this.document.head.appendChild(linkNode);
    return linkNode;
  }

  private removePreloadLink(linkNode: HTMLLinkElement): void {
    if (this.document.head.contains(linkNode)) {
      this.document.head.removeChild(linkNode);
    }
  }
}
