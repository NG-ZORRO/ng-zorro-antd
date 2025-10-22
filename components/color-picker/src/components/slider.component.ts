/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { GradientComponent } from './gradient.component';
import { HandlerComponent } from './handler.component';
import { PaletteComponent } from './palette.component';
import { Color } from '../interfaces/color';
import { HsbaColorType, TransformOffset } from '../interfaces/type';
import { calculateColor, calculateOffset } from '../util/util';

type EventType = MouseEvent | TouchEvent;

type EventHandle = (e: EventType) => void;

function getPosition(e: EventType): { pageX: number; pageY: number } {
  const obj = 'touches' in e ? e.touches[0] : e;
  const scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
  const scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
  return { pageX: obj.pageX - scrollXOffset, pageY: obj.pageY - scrollYOffset };
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'color-slider',
  imports: [PaletteComponent, GradientComponent, HandlerComponent],
  template: `
    <div
      #slider
      (mousedown)="dragStartHandle($event)"
      (touchstart)="dragStartHandle($event)"
      class="ant-color-picker-slider"
      [class]="'ant-color-picker-slider-' + type"
    >
      <color-palette>
        <div
          #transform
          class="ant-color-picker-transform"
          [style.left]="offsetValue.x + 'px'"
          [style.top]="offsetValue.y + 'px'"
        >
          <color-handler size="small" [color]="value"></color-handler>
        </div>
        <color-gradient [colors]="gradientColors" [direction]="direction" [type]="type"></color-gradient>
      </color-palette>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `
  ]
})
export class SliderComponent implements OnInit, AfterViewInit, OnChanges {
  private document = inject(DOCUMENT);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('slider', { static: false }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('transform', { static: false }) transformRef!: ElementRef<HTMLDivElement>;

  @Input() gradientColors: string[] = [];
  @Input() direction: string = 'to right';
  @Input() type: HsbaColorType = 'hue';
  @Input() color: Color | null = null;
  @Input() value: string | null = null;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Output() readonly nzOnChange = new EventEmitter<Color>();
  @Output() readonly nzOnChangeComplete = new EventEmitter<HsbaColorType>();

  offsetValue: TransformOffset = { x: 0, y: 0 };
  dragRef: boolean = false;
  mouseMoveRef: (e: MouseEvent | TouchEvent) => void = () => null;
  mouseUpRef: (e: MouseEvent | TouchEvent) => void = () => null;

  ngOnInit(): void {
    this.document.removeEventListener('mousemove', this.mouseMoveRef);
    this.document.removeEventListener('mouseup', this.mouseUpRef);
    this.document.removeEventListener('touchmove', this.mouseMoveRef);
    this.document.removeEventListener('touchend', this.mouseUpRef);
    this.mouseMoveRef = () => null;
    this.mouseUpRef = () => null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { color } = changes;

    if (color) {
      if (!this.dragRef && this.containerRef && this.transformRef) {
        const calcOffset = calculateOffset(
          this.containerRef.nativeElement,
          this.transformRef.nativeElement,
          this.color,
          this.type
        );
        if (calcOffset) {
          this.offsetValue = calcOffset;
          this.cdr.detectChanges();
        }
      }
    }
  }

  ngAfterViewInit(): void {
    if (!this.dragRef && this.containerRef && this.transformRef) {
      const calcOffset = calculateOffset(
        this.containerRef.nativeElement,
        this.transformRef.nativeElement,
        this.color,
        this.type
      );
      if (calcOffset) {
        this.offsetValue = calcOffset;
        this.cdr.detectChanges();
      }
    }
  }

  dragStartHandle(e: MouseEvent | TouchEvent): void {
    this.onDragStart(e);
  }

  updateOffset: EventHandle = (e: EventType, direction: 'x' | 'y' = 'x') => {
    const { pageX, pageY } = getPosition(e);
    const {
      x: rectX,
      y: rectY,
      width,
      height
    } = this.containerRef?.nativeElement?.getBoundingClientRect() || { x: 0, y: 0, width: 0, height: 0 };
    const { width: targetWidth, height: targetHeight } = this.transformRef?.nativeElement?.getBoundingClientRect() || {
      width: 0,
      height: 0
    };

    const centerOffsetX = targetWidth / 2;
    const centerOffsetY = targetHeight / 2;

    const offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX;
    const offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY;

    const calcOffset = {
      x: offsetX,
      y: direction === 'x' ? this.offsetValue.y : offsetY
    };

    // Exclusion of boundary cases
    if ((targetWidth === 0 && targetHeight === 0) || targetWidth !== targetHeight) {
      return;
    }

    this.offsetValue = calcOffset;
    this.nzOnChange.emit(
      calculateColor(
        calcOffset,
        this.containerRef.nativeElement,
        this.transformRef.nativeElement,
        this.color,
        this.type
      )
    );
    this.cdr.detectChanges();
  };

  onDragMove: EventHandle = (e: EventType) => {
    e.preventDefault();
    this.updateOffset(e);
  };

  onDragStop: EventHandle = (e: EventType) => {
    e.preventDefault();
    this.dragRef = false;
    this.document.removeEventListener('mousemove', this.onDragMove);
    this.document.removeEventListener('mouseup', this.mouseUpRef);
    this.document.removeEventListener('touchmove', this.mouseMoveRef);
    this.document.removeEventListener('touchend', this.mouseUpRef);
    this.mouseMoveRef = () => null;
    this.mouseUpRef = () => null;
    this.nzOnChangeComplete?.emit(this.type);
  };

  onDragStart: EventHandle = (e: EventType) => {
    if (this.disabled) {
      return;
    }
    this.updateOffset(e);
    this.dragRef = true;
    this.document.addEventListener('mousemove', this.onDragMove);
    this.document.addEventListener('mouseup', this.onDragStop);
    this.document.addEventListener('touchmove', this.onDragMove);
    this.document.addEventListener('touchend', this.onDragStop);
    this.mouseMoveRef = this.onDragMove;
    this.mouseUpRef = this.onDragStop;
    this.cdr.markForCheck();
  };
}
