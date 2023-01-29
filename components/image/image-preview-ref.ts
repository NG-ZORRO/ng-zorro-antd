/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE, hasModifierKey, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { NzImagePreviewOptions } from './image-preview-options';
import { NzImagePreviewComponent } from './image-preview.component';

export class NzImagePreviewRef {
  private destroy$ = new Subject<void>();

  constructor(
    public previewInstance: NzImagePreviewComponent,
    private config: NzImagePreviewOptions,
    private overlayRef: OverlayRef
  ) {
    overlayRef
      .keydownEvents()
      .pipe(
        filter(
          event =>
            (this.config.nzKeyboard as boolean) &&
            (event.keyCode === ESCAPE || event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW) &&
            !hasModifierKey(event)
        )
      )
      .subscribe(event => {
        event.preventDefault();
        if (event.keyCode === ESCAPE) {
          this.close();
        }
        if (event.keyCode === LEFT_ARROW) {
          this.prev();
        }
        if (event.keyCode === RIGHT_ARROW) {
          this.next();
        }
      });

    overlayRef.detachments().subscribe(() => {
      this.overlayRef.dispose();
    });

    previewInstance.containerClick.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
      this.close();
    });

    previewInstance.closeClick.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
      this.close();
    });

    previewInstance.animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'done' && event.toState === 'leave'),
        take(1)
      )
      .subscribe(() => {
        this.dispose();
      });
  }

  switchTo(index: number): void {
    this.previewInstance.switchTo(index);
  }

  next(): void {
    this.previewInstance.next();
  }

  prev(): void {
    this.previewInstance.prev();
  }

  close(): void {
    this.previewInstance.startLeaveAnimation();
  }

  private dispose(): void {
    this.destroy$.next();
    this.overlayRef.dispose();
  }
}
