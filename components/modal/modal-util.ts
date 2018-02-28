export interface ClickPosition {
  x: number;
  y: number;
}

export class ModalUtil {
  private lastPosition: ClickPosition = null;

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
