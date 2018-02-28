import { ComponentRef } from '@angular/core';

import { NzModalComponent } from './nz-modal.component';

/**
 * API class that public to users to handle the modal instance.
 * ModalPublicAgent is aim to avoid accessing to the modal instance directly by users.
 */
export abstract class ModalPublicAgent {
  abstract open(): void;
  abstract close(): void;
  abstract destroy(): void;

  /**
   * Return the ComponentRef of nzContent when specify nzContent as a Component
   * Note: this method may return undefined if the Component has not ready yet. (it only available after Modal's ngOnInit)
   */
  abstract getContentComponentRef(): ComponentRef<{}>;

  /**
   * Get the dom element of this Modal
   */
  abstract getElement(): HTMLElement;

  /**
   * Get the instance of the Modal itself
   */
  abstract getInstance(): NzModalComponent;
}
