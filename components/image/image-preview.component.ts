/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { CdkDrag, CdkDragEnd, CdkDragHandle } from '@angular/cdk/drag-drop';
import { ESCAPE } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  EventEmitter,
  inject,
  NgZone,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular, isNotNil } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NZ_CONFIG_MODULE_NAME } from './image-config';
import { NzImage, NzImagePreviewOptions } from './image-preview-options';
import { NzImagePreviewRef } from './image-preview-ref';
import { NzImageScaleStep, NzImageUrl } from './image.directive';
import { getClientSize, getFitContentPosition, getOffset } from './utils';

export interface NzImageContainerOperation {
  icon: string;
  type: string;
  rotate?: number;
  onClick(): void;
}

const initialPosition = {
  x: 0,
  y: 0
};

export const NZ_DEFAULT_SCALE_STEP = 0.5;
const NZ_DEFAULT_ZOOM = 1;
const NZ_DEFAULT_ROTATE = 0;

@Component({
  selector: 'nz-image-preview',
  exportAs: 'nzImagePreview',
  animations: [fadeMotion],
  template: `
    <div class="ant-image-preview-mask"></div>

    <div class="ant-image-preview-operations-wrapper">
      @if (images.length > 1) {
        <div
          class="ant-image-preview-switch-left"
          [class.ant-image-preview-switch-left-disabled]="index <= 0"
          (click)="onSwitchLeft($event)"
        >
          <nz-icon nzType="left" nzTheme="outline" />
        </div>
        <div
          class="ant-image-preview-switch-right"
          [class.ant-image-preview-switch-right-disabled]="index >= images.length - 1"
          (click)="onSwitchRight($event)"
        >
          <nz-icon nzType="right" nzTheme="outline" />
        </div>
      }

      <ul class="ant-image-preview-operations">
        @if (images.length > 1) {
          <li class="ant-image-preview-operations-progress">{{ index + 1 }} / {{ images.length }}</li>
        }

        @for (option of operations; track option) {
          <li
            class="ant-image-preview-operations-operation"
            [class.ant-image-preview-operations-operation-disabled]="zoomOutDisabled && option.type === 'zoomOut'"
            (click)="option.onClick()"
          >
            <nz-icon
              class="ant-image-preview-operations-icon"
              [nzType]="option.icon"
              [nzRotate]="option.rotate ?? 0"
              nzTheme="outline"
            />
          </li>
        }
      </ul>
    </div>

    <div
      class="ant-image-preview-wrap"
      tabindex="-1"
      (click)="maskClosable && $event.target === $event.currentTarget && onClose()"
    >
      <div class="ant-image-preview" role="dialog" aria-modal="true">
        <div tabindex="0" aria-hidden="true" class="ant-image-preview-focus-trap"></div>
        <div class="ant-image-preview-content">
          <div class="ant-image-preview-body">
            <div
              class="ant-image-preview-img-wrapper"
              #imagePreviewWrapper
              cdkDrag
              [style.transform]="previewImageWrapperTransform"
              [cdkDragFreeDragPosition]="position"
              (cdkDragEnded)="onDragEnd($event)"
            >
              @for (image of images; track image; let imageIndex = $index) {
                @if (imageIndex === index) {
                  <img
                    cdkDragHandle
                    class="ant-image-preview-img"
                    #imgRef
                    [attr.src]="sanitizerResourceUrl(image.src)"
                    [attr.srcset]="image.srcset"
                    [attr.alt]="image.alt"
                    [style.width]="image.width"
                    [style.height]="image.height"
                    [style.transform]="previewImageTransform"
                  />
                }
              }
            </div>
          </div>
        </div>
        <div tabindex="0" aria-hidden="true" class="ant-image-preview-focus-trap"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-image-preview-root',
    '[class.ant-image-preview-moving]': 'isDragging',
    '[style.zIndex]': 'config.nzZIndex',
    '[@.disabled]': 'config.nzNoAnimation',
    '[@fadeMotion]': `visible ? 'enter' : 'leave'`,
    '(@fadeMotion.start)': 'onAnimationStart($event)',
    '(@fadeMotion.done)': 'onAnimationDone($event)'
  },
  imports: [NzIconModule, CdkDragHandle, CdkDrag]
})
export class NzImagePreviewComponent implements OnInit {
  private document = inject(DOCUMENT);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  public nzConfigService = inject(NzConfigService);
  public config = inject(NzImagePreviewOptions);
  private sanitizer = inject(DomSanitizer);
  private destroyRef = inject(DestroyRef);
  readonly _defaultNzZoom = NZ_DEFAULT_ZOOM;
  readonly _defaultNzScaleStep = NZ_DEFAULT_SCALE_STEP;
  readonly _defaultNzRotate = NZ_DEFAULT_ROTATE;

  images: NzImage[] = [];
  index = 0;
  isDragging = false;
  visible = true;
  animationStateChanged = new EventEmitter<AnimationEvent>();
  scaleStepMap: Map<NzImageUrl, NzImageScaleStep> = new Map<NzImageUrl, NzImageScaleStep>();

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
    },
    {
      icon: 'swap',
      onClick: () => {
        this.onHorizontalFlip();
      },
      type: 'flipHorizontally'
    },
    {
      icon: 'swap',
      onClick: () => {
        this.onVerticalFlip();
      },
      type: 'flipVertically',
      rotate: 90
    }
  ];

  zoomOutDisabled = false;
  position = { ...initialPosition };
  previewRef!: NzImagePreviewRef;
  closeClick = new EventEmitter<void>();

  @ViewChild('imgRef') imageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('imagePreviewWrapper', { static: true }) imagePreviewWrapper!: ElementRef<HTMLElement>;

  private zoom = this.config.nzZoom ?? this._defaultNzZoom;
  private rotate = this.config.nzRotate ?? this._defaultNzRotate;
  private scaleStep = this.config.nzScaleStep ?? this._defaultNzScaleStep;
  private flipHorizontally = this.config.nzFlipHorizontally ?? false;
  private flipVertically = this.config.nzFlipVertically ?? false;

  get animationDisabled(): boolean {
    return this.config.nzNoAnimation ?? false;
  }

  get maskClosable(): boolean {
    const defaultConfig: NzSafeAny = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};
    return this.config.nzMaskClosable ?? defaultConfig.nzMaskClosable ?? true;
  }

  constructor() {
    this.updateZoomOutDisabled();
    this.updatePreviewImageTransform();
    this.updatePreviewImageWrapperTransform();
  }

  ngOnInit(): void {
    fromEventOutsideAngular(this.imagePreviewWrapper.nativeElement, 'mousedown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isDragging = true;
      });

    fromEventOutsideAngular<WheelEvent>(this.imagePreviewWrapper.nativeElement, 'wheel')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        this.ngZone.run(() => this.wheelZoomEventHandler(event));
      });

    fromEventOutsideAngular<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        filter(event => event.keyCode === ESCAPE),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.onClose();
          this.markForCheck();
        });
      });
  }

  setImages(images: NzImage[], scaleStepMap?: Map<string, number>): void {
    if (scaleStepMap) this.scaleStepMap = scaleStepMap;
    this.images = images;
    this.markForCheck();
  }

  switchTo(index: number): void {
    this.index = index;
    this.markForCheck();
  }

  next(): void {
    if (this.index < this.images.length - 1) {
      this.reset();
      this.index++;
      this.updatePreviewImageTransform();
      this.updatePreviewImageWrapperTransform();
      this.updateZoomOutDisabled();
      this.markForCheck();
    }
  }

  prev(): void {
    if (this.index > 0) {
      this.reset();
      this.index--;
      this.updatePreviewImageTransform();
      this.updatePreviewImageWrapperTransform();
      this.updateZoomOutDisabled();
      this.markForCheck();
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  onClose(): void {
    this.visible = false;
    this.closeClick.emit();
  }

  onZoomIn(): void {
    const zoomStep =
      this.scaleStepMap.get(this.images[this.index].src ?? this.images[this.index].srcset) ?? this.scaleStep;
    this.zoom += zoomStep;
    this.updatePreviewImageTransform();
    this.updateZoomOutDisabled();
  }

  onZoomOut(): void {
    if (this.zoom > 1) {
      const zoomStep =
        this.scaleStepMap.get(this.images[this.index].src ?? this.images[this.index].srcset) ?? this.scaleStep;
      this.zoom -= zoomStep;
      this.updatePreviewImageTransform();
      this.updateZoomOutDisabled();

      if (this.zoom <= 1) {
        this.reCenterImage();
      }
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

  onHorizontalFlip(): void {
    this.flipHorizontally = !this.flipHorizontally;
    this.updatePreviewImageTransform();
  }

  onVerticalFlip(): void {
    this.flipVertically = !this.flipVertically;
    this.updatePreviewImageTransform();
  }

  wheelZoomEventHandler(event: WheelEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.handlerImageTransformationWhileZoomingWithMouse(event, event.deltaY);
    this.handleImageScaleWhileZoomingWithMouse(event.deltaY);

    this.updatePreviewImageWrapperTransform();
    this.updatePreviewImageTransform();

    this.markForCheck();
  }

  onAnimationStart(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  onDragEnd(event: CdkDragEnd): void {
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
    } else if (!isNotNil(fitContentPos.x) && !isNotNil(fitContentPos.y)) {
      this.position = {
        x: event.source.getFreeDragPosition().x,
        y: event.source.getFreeDragPosition().y
      };
    }
  }

  sanitizerResourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private updatePreviewImageTransform(): void {
    this.previewImageTransform = `scale3d(${this.zoom * (this.flipHorizontally ? -1 : 1)}, ${
      this.zoom * (this.flipVertically ? -1 : 1)
    }, 1) rotate(${this.rotate}deg)`;
  }

  private updatePreviewImageWrapperTransform(): void {
    this.previewImageWrapperTransform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
  }

  private updateZoomOutDisabled(): void {
    this.zoomOutDisabled = this.zoom <= 1;
  }

  private handlerImageTransformationWhileZoomingWithMouse(event: WheelEvent, deltaY: number): void {
    let scaleValue: number;
    const imageElement = this.imageRef.nativeElement;

    const elementTransform = getComputedStyle(imageElement).transform;
    const matrixValue = elementTransform.match(/matrix.*\((.+)\)/);

    if (matrixValue) {
      scaleValue = +matrixValue[1].split(', ')[0];
    } else {
      scaleValue = this.zoom;
    }

    const x = (event.clientX - imageElement.getBoundingClientRect().x) / scaleValue;
    const y = (event.clientY - imageElement.getBoundingClientRect().y) / scaleValue;
    const halfOfScaleStepValue = deltaY < 0 ? this.scaleStep / 2 : -this.scaleStep / 2;

    this.position.x += -x * halfOfScaleStepValue * 2 + imageElement.offsetWidth * halfOfScaleStepValue;
    this.position.y += -y * halfOfScaleStepValue * 2 + imageElement.offsetHeight * halfOfScaleStepValue;
  }

  private handleImageScaleWhileZoomingWithMouse(deltaY: number): void {
    if (this.isZoomedInWithMouseWheel(deltaY)) {
      this.onZoomIn();
    } else {
      this.onZoomOut();
    }

    if (this.zoom <= 1) {
      this.reCenterImage();
    }
  }

  private isZoomedInWithMouseWheel(delta: number): boolean {
    return delta < 0;
  }

  private reset(): void {
    this.zoom = this.config.nzZoom ?? this._defaultNzZoom;
    this.scaleStep = this.config.nzScaleStep ?? this._defaultNzScaleStep;
    this.rotate = this.config.nzRotate ?? this._defaultNzRotate;
    this.flipHorizontally = false;
    this.flipVertically = false;
    this.reCenterImage();
  }

  private reCenterImage(): void {
    this.position = { ...initialPosition };
  }
}
