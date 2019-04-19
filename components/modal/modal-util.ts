/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export interface ClickPosition {
  x: number;
  y: number;
}

export class ModalUtil {
  private lastPosition: ClickPosition | null = null;

  constructor(private document: Document) {
    this.listenDocumentClick();
  }

  getLastClickPosition(): ClickPosition | null {
    return this.lastPosition;
  }

  listenDocumentClick(): void {
    this.document.addEventListener('click', (event: MouseEvent) => {
      this.lastPosition = { x: event.clientX, y: event.clientY };
    });
  }
}

export default new ModalUtil(document);
