/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE, hasModifierKey, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { generateClassName } from 'ng-zorro-antd/core/util';

import { NzImagePreviewOptions } from './image-preview-options';
import { NzImagePreviewComponent } from './image-preview.component';

const CLASS_NAME = 'ant-image-preview';
const FADE_CLASS_NAME_MAP = {
  enter: generateClassName(CLASS_NAME, 'fade-motion-enter'),
  leave: generateClassName(CLASS_NAME, 'fade-motion-leave')
};
const FADE_OUT_KEYFRAME_NAME = 'antFadeOut';

export class NzImagePreviewRef {
  private destroy$ = new Subject<void>();

  constructor(
    public previewInstance: NzImagePreviewComponent,
    private config: NzImagePreviewOptions,
    private overlayRef: OverlayRef
  ) {
    if (config.nzKeyboard) {
      overlayRef
        .keydownEvents()
        .pipe(
          filter(
            event =>
              (event.keyCode === ESCAPE || event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW) &&
              !hasModifierKey(event)
          )
        )
        .subscribe(event => {
          event.preventDefault();
          if (event.keyCode === ESCAPE) {
            previewInstance.onClose();
          }
          if (event.keyCode === LEFT_ARROW) {
            this.prev();
          }
          if (event.keyCode === RIGHT_ARROW) {
            this.next();
          }
        });
    }

    overlayRef.detachments().subscribe(() => this.overlayRef.dispose());

    previewInstance.closeClick.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => this.close());

    this._startEnterAnimation();
  }

  private get element(): HTMLElement {
    return this.previewInstance.elementRef.nativeElement as HTMLElement;
  }

  private get _animationsEnabled(): boolean {
    return !(this.config.nzNoAnimation ?? false);
  }

  private _startEnterAnimation(): void {
    if (this._animationsEnabled) {
      this.element.classList.add(FADE_CLASS_NAME_MAP.enter);
    }
  }

  private _startLeaveAnimation(): void {
    if (this._animationsEnabled) {
      this.element.classList.remove(FADE_CLASS_NAME_MAP.enter);
      this.element.classList.add(FADE_CLASS_NAME_MAP.leave);
    }
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
    if (this._animationsEnabled) {
      // if animation is enabled, close after animation end
      const onAnimationEnd = (event: AnimationEvent): void => {
        if (event.animationName === FADE_OUT_KEYFRAME_NAME) {
          this.element.removeEventListener('animationend', onAnimationEnd);
          this._doClose();
        }
      };

      this.element.addEventListener('animationend', onAnimationEnd);
      this._startLeaveAnimation();
    } else {
      this._doClose();
    }
  }

  private _doClose(): void {
    this.destroy$.next();
    this.overlayRef.dispose();
    this.previewInstance = null!;
  }
}
