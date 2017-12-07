import { AnimationEvent } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { tagAnimation } from '../core/animation/tag-animations';
import { toBoolean } from '../util/convert';

@Component({
  selector       : 'nz-tag',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    tagAnimation
  ],
  template       : `
    <span *ngIf="!_closed"
      [ngClass]="_tagCls"
      [style.backgroundColor]="_backgroundColor"
      [@tagAnimation]
      (@tagAnimation.done)="_afterClose($event)">
      <span [class]="_textClass"><ng-content></ng-content></span>
      <i class="anticon anticon-cross" (click)="_close($event)" *ngIf="nzClosable"></i>
    </span>
  `,
  styleUrls      : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzTagComponent implements AfterViewInit {
  private _closable = false;

  _prefixCls = 'ant-tag';
  _closed = false;

  /** Whether tag is closable */
  @Input()
  set nzClosable(value: boolean) {
    this._closable = toBoolean(value);
  }

  get nzClosable(): boolean {
    return this._closable;
  }

  /** The tag color */
  @Input() nzColor: string;

  /** Event: emit before close */
  @Output() nzBeforeClose = new EventEmitter<Event>();

  // TODO: AnimationEvent is not subclass of Event, but all payloads should be unified
  /** Event: emit after close */
  @Output() nzClose = new EventEmitter<AnimationEvent>();

  @HostBinding('attr.data-show')
  get _dataShow(): boolean {
    return !this._closed;
  }

  get _backgroundColor(): string {
    const isPresetColor = this._isPresetColor(this.nzColor);
    return (this.nzColor && !isPresetColor) ? this.nzColor : null;
  }

  _afterClose(event: AnimationEvent): void {
    if (this._closed) {
      this.nzClose.emit(event);
    }
  }

  get _tagCls(): object {
    const isPresetColor = this._isPresetColor(this.nzColor);
    return {
      [this._prefixCls]                       : true,
      [`${this._prefixCls}-${this.nzColor}`]  : isPresetColor,
      [`${this._prefixCls}-has-color`]        : (this.nzColor && !isPresetColor)
    };
  }

  get _textClass(): string {
    return `${this._prefixCls}-text`;
  }

  _close(event: Event): void {
    this.nzBeforeClose.emit(event);
    if (event.defaultPrevented) {
        return;
    }
    this._closed = true;
  }

  _isPresetColor(color: string): boolean {
    return /^(pink|red|yellow|orange|cyan|green|blue|purple)(-inverse)?$/.test(color);
  }

  constructor(
    private _elementRef: ElementRef,
    private _render: Renderer2) {

  }

  ngAfterViewInit(): void {
    this._render.addClass(this._elementRef.nativeElement, `${this._prefixCls}-root`);
  }
}
