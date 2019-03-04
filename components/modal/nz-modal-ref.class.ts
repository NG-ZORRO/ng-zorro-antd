import { Observable } from 'rxjs';

import { NzModalComponent } from './nz-modal.component';

/**
 * API class that public to users to handle the modal instance.
 * NzModalRef is aim to avoid accessing to the modal instance directly by users.
 */
export abstract class NzModalRef<T = any, R = any> { // tslint:disable-line:no-any
  abstract afterOpen: Observable<void>;
  abstract afterClose: Observable<R>;

  abstract open(): void;
  abstract close(result?: R): void;
  abstract destroy(result?: R): void;

  /**
   * Trigger the nzOnOk/nzOnCancel by manual
   */
  abstract triggerOk(): void;
  abstract triggerCancel(): void;

  // /**
  //  * Return the ComponentRef of nzContent when specify nzContent as a Component
  //  * Note: this method may return undefined if the Component has not ready yet. (it only available after Modal's ngOnInit)
  //  */
  // abstract getContentComponentRef(): ComponentRef<{}>;

  /**
   * Return the component instance of nzContent when specify nzContent as a Component
   * Note: this method may return undefined if the Component has not ready yet. (it only available after Modal's ngOnInit)
   */
  abstract getContentComponent(): T;

  /**
   * Get the dom element of this Modal
   */
  abstract getElement(): HTMLElement;

  /**
   * Get the instance of the Modal itself
   */
  abstract getInstance(): NzModalComponent;
}
