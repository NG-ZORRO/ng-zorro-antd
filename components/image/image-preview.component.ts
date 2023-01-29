/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { OverlayRef } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { isNotNil } from 'ng-zorro-antd/core/util';

import { FADE_CLASS_NAME_MAP, NZ_CONFIG_MODULE_NAME } from './image-config';
import { NzImage, NzImagePreviewOptions } from './image-preview-options';
import { NzImagePreviewRef } from './image-preview-ref';
import { getClientSize, getFitContentPosition, getOffset } from './utils';

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
            #imagePreviewWrapper
            cdkDrag
            [style.transform]="previewImageWrapperTransform"
            [cdkDragFreeDragPosition]="position"
            (cdkDragReleased)="onDragReleased()"
          >
            <ng-container *ngFor="let image of images; index as imageIndex">
              <img
                cdkDragHandle
                class="ant-image-preview-img"
                #imgRef
                *ngIf="index === imageIndex"
                [attr.src]="sanitizerResourceUrl(image.src)"
                [attr.srcset]="image.srcset"
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
    class: 'ant-image-preview-wrap',
    '[class.ant-image-preview-moving]': 'isDragging',
    '[style.zIndex]': 'config.nzZIndex',
    '[@.disabled]': 'config.nzNoAnimation',
    '[@fadeMotion]': 'animationState',
    '(@fadeMotion.start)': 'onAnimationStart($event)',
    '(@fadeMotion.done)': 'onAnimationDone($event)',
    tabindex: '-1',
    role: 'document'
  },
  providers: [NzDestroyService]
})
export class NzImagePreviewComponent implements OnInit {
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

  @ViewChild('imgRef') imageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('imagePreviewWrapper', { static: true }) imagePreviewWrapper!: ElementRef<HTMLElement>;

  private zoom: number;
  private rotate: number;

  get animationDisabled(): boolean {
    return this.config.nzNoAnimation ?? false;
  }

  get maskClosable(): boolean {
    const defaultConfig: NzSafeAny = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};
    return this.config.nzMaskClosable ?? defaultConfig.nzMaskClosable ?? true;
  }

  constructor(
    private ngZone: NgZone,
    private host: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    public nzConfigService: NzConfigService,
    public config: NzImagePreviewOptions,
    private overlayRef: OverlayRef,
    private destroy$: NzDestroyService,
    private sanitizer: DomSanitizer
  ) {
    this.zoom = this.config.nzZoom ?? 1;
    this.rotate = this.config.nzRotate ?? 0;
    this.updateZoomOutDisabled();
    this.updatePreviewImageTransform();
    this.updatePreviewImageWrapperTransform();
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.host.nativeElement, 'click')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          if (event.target === event.currentTarget && this.maskClosable && this.containerClick.observers.length) {
            this.ngZone.run(() => this.containerClick.emit());
          }
        });

      fromEvent(this.imagePreviewWrapper.nativeElement, 'mousedown')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.isDragging = true;
        });
    });
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
    this.position = { ...initialPosition };
  }

  onZoomOut(): void {
    if (this.zoom > 1) {
      this.zoom -= 1;
      this.updatePreviewImageTransform();
      this.updateZoomOutDisabled();
      this.position = { ...initialPosition };
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

  onDragReleased(): void {
    this.isDragging = false;
    const width = this.imageRef.nativeElement.offsetWidth * this.zoom;
    const height = this.imageRef.nativeElement.offsetHeight * this.zoom;
    const { left, top } = getOffset(this.imageRef.nativeElement);
    const { width: clientWidth, height: clientHeight } = getClientSize();
    const isRotate = this.rotate % 180 !== 0;
    const fitContentParams = {
      width: isRotate ? height : width,
      height: isRotate ? width : height,
      left,
      top,
      clientWidth,
      clientHeight
    };
    const fitContentPos = getFitContentPosition(fitContentParams);
    if (isNotNil(fitContentPos.x) || isNotNil(fitContentPos.y)) {
      this.position = { ...this.position, ...fitContentPos };
    }
  }

  sanitizerResourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
