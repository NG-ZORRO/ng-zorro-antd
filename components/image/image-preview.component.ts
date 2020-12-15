/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AnimationEvent } from '@angular/animations';
import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';

import { FADE_CLASS_NAME_MAP, NZ_CONFIG_MODULE_NAME } from './image-config';
import { NzImage, NzImagePreviewOptions } from './image-preview-options';
import { NzImagePreviewRef } from './image-preview-ref';

export interface NzImageContainerOperation {
  icon: string;
  type: string;

  onClick(): void;
}

const initialPosition = {
  x: 0,
  y: 0
};

@Component({
  selector: 'nz-image-preview',
  exportAs: 'nzImagePreview',
  animations: [fadeMotion],
  template: `
    <div class="ant-image-preview">
      <div tabindex="0" aria-hidden="true" style="width: 0; height: 0; overflow: hidden; outline: none;"></div>
      <div class="ant-image-preview-content">
        <div class="ant-image-preview-body">
          <ul class="ant-image-preview-operations">
            <li
              class="ant-image-preview-operations-operation"
              [class.ant-image-preview-operations-operation-disabled]="zoomOutDisabled && option.type === 'zoomOut'"
              (click)="option.onClick()"
              *ngFor="let option of operations"
            >
              <span class="ant-image-preview-operations-icon" nz-icon [nzType]="option.icon" nzTheme="outline"></span>
            </li>
          </ul>
          <div
            class="ant-image-preview-img-wrapper"
            cdkDrag
            [style.transform]="previewImageWrapperTransform"
            [cdkDragFreeDragPosition]="position"
            (mousedown)="onDragStarted()"
            (cdkDragReleased)="onDragReleased()"
          >
            <ng-container *ngFor="let image of images; index as imageIndex">
              <img
                cdkDragHandle
                class="ant-image-preview-img"
                *ngIf="index === imageIndex"
                [attr.src]="image.src"
                [attr.alt]="image.alt"
                [style.width]="image.width"
                [style.height]="image.height"
                [style.transform]="previewImageTransform"
              />
            </ng-container>
          </div>
          <ng-container *ngIf="images.length > 1">
            <div
              class="ant-image-preview-switch-left"
              [class.ant-image-preview-switch-left-disabled]="index <= 0"
              (click)="onSwitchLeft($event)"
            >
              <span nz-icon nzType="left" nzTheme="outline"></span>
            </div>
            <div
              class="ant-image-preview-switch-right"
              [class.ant-image-preview-switch-right-disabled]="index >= images.length - 1"
              (click)="onSwitchRight($event)"
            >
              <span nz-icon nzType="right" nzTheme="outline"></span>
            </div>
          </ng-container>
        </div>
      </div>
      <div tabindex="0" aria-hidden="true" style="width: 0; height: 0; overflow: hidden; outline: none;"></div>
    </div>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ant-image-preview-moving]': 'isDragging',
    '[style.zIndex]': 'config.nzZIndex',
    '[class.ant-image-preview-wrap]': 'true',
    '[@.disabled]': 'config.nzNoAnimation',
    '[@fadeMotion]': 'animationState',
    '(@fadeMotion.start)': 'onAnimationStart($event)',
    '(@fadeMotion.done)': 'onAnimationDone($event)',
    '(click)': 'onContainerClick($event)',
    tabindex: '-1',
    role: 'document'
  }
})
export class NzImagePreviewComponent implements OnDestroy {
  images: NzImage[] = [];
  index = 0;
  isDragging = false;
  visible = true;
  animationState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();

  previewImageTransform = '';
  previewImageWrapperTransform = '';
  operations: NzImageContainerOperation[] = [
    {
      icon: 'close',
      onClick: () => {
        this.onClose();
      },
      type: 'close'
    },
    {
      icon: 'zoom-in',
      onClick: () => {
        this.onZoomIn();
      },
      type: 'zoomIn'
    },
    {
      icon: 'zoom-out',
      onClick: () => {
        this.onZoomOut();
      },
      type: 'zoomOut'
    },
    {
      icon: 'rotate-right',
      onClick: () => {
        this.onRotateRight();
      },
      type: 'rotateRight'
    },
    {
      icon: 'rotate-left',
      onClick: () => {
        this.onRotateLeft();
      },
      type: 'rotateLeft'
    }
  ];

  zoomOutDisabled = false;
  position = { ...initialPosition };
  previewRef!: NzImagePreviewRef;
  containerClick = new EventEmitter<void>();
  closeClick = new EventEmitter<void>();

  private zoom: number;
  private rotate: number;
  private destroy$ = new Subject();

  get animationDisabled(): boolean {
    return this.config.nzNoAnimation ?? false;
  }

  get maskClosable(): boolean {
    const defaultConfig: NzSafeAny = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};
    return this.config.nzMaskClosable ?? defaultConfig.nzMaskClosable ?? true;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    public nzConfigService: NzConfigService,
    public config: NzImagePreviewOptions,
    private overlayRef: OverlayRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.zoom = this.config.nzZoom ?? 1;
    this.rotate = this.config.nzRotate ?? 0;
    this.updateZoomOutDisabled();
    this.updatePreviewImageTransform();
    this.updatePreviewImageWrapperTransform();
  }

  setImages(images: NzImage[]): void {
    this.images = images;
    this.cdr.markForCheck();
  }

  switchTo(index: number): void {
    this.index = index;
    this.cdr.markForCheck();
  }

  next(): void {
    if (this.index < this.images.length - 1) {
      this.reset();
      this.index++;
      this.updatePreviewImageTransform();
      this.updatePreviewImageWrapperTransform();
      this.updateZoomOutDisabled();
      this.cdr.markForCheck();
    }
  }

  prev(): void {
    if (this.index > 0) {
      this.reset();
      this.index--;
      this.updatePreviewImageTransform();
      this.updatePreviewImageWrapperTransform();
      this.updateZoomOutDisabled();
      this.cdr.markForCheck();
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  onClose(): void {
    this.closeClick.emit();
  }

  onZoomIn(): void {
    this.zoom += 1;
    this.updatePreviewImageTransform();
    this.updateZoomOutDisabled();
  }

  onZoomOut(): void {
    if (this.zoom > 1) {
      this.zoom -= 1;
      this.updatePreviewImageTransform();
      this.updateZoomOutDisabled();
    }
  }

  onRotateRight(): void {
    this.rotate += 90;
    this.updatePreviewImageTransform();
  }

  onRotateLeft(): void {
    this.rotate -= 90;
    this.updatePreviewImageTransform();
  }

  onSwitchLeft(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.prev();
  }

  onSwitchRight(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.next();
  }

  onContainerClick(e: MouseEvent): void {
    if (e.target === e.currentTarget && this.maskClosable) {
      this.containerClick.emit();
    }
  }

  onAnimationStart(event: AnimationEvent): void {
    if (event.toState === 'enter') {
      this.setEnterAnimationClass();
    } else if (event.toState === 'leave') {
      this.setLeaveAnimationClass();
    }

    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'enter') {
      this.setEnterAnimationClass();
    } else if (event.toState === 'leave') {
      this.setLeaveAnimationClass();
    }
    this.animationStateChanged.emit(event);
  }

  startLeaveAnimation(): void {
    this.animationState = 'leave';
    this.cdr.markForCheck();
  }

  onDragStarted(): void {
    this.isDragging = true;
  }

  onDragReleased(): void {
    this.isDragging = false;
    this.position = { ...initialPosition };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updatePreviewImageTransform(): void {
    this.previewImageTransform = `scale3d(${this.zoom}, ${this.zoom}, 1) rotate(${this.rotate}deg)`;
  }

  private updatePreviewImageWrapperTransform(): void {
    this.previewImageWrapperTransform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
  }

  private updateZoomOutDisabled(): void {
    this.zoomOutDisabled = this.zoom <= 1;
  }

  private setEnterAnimationClass(): void {
    if (this.animationDisabled) {
      return;
    }
    const backdropElement = this.overlayRef.backdropElement;
    if (backdropElement) {
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.enter);
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.enterActive);
    }
  }

  private setLeaveAnimationClass(): void {
    if (this.animationDisabled) {
      return;
    }
    const backdropElement = this.overlayRef.backdropElement;
    if (backdropElement) {
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.leave);
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.leaveActive);
    }
  }

  private reset(): void {
    this.zoom = 1;
    this.rotate = 0;
    this.position = { ...initialPosition };
  }
}
