import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';
import { TagAnimation } from '../core/animation/tag-animations';
import { toBoolean } from '../util/convert';


@Component({
  selector       : 'nz-checkable-tag',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    TagAnimation
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
export class NzCheckableTagComponent implements AfterViewInit {
  private _checked = false;
  private _closable = false;

  _prefixCls = 'ant-tag';
  _closed = false;

  /** Whether tag is checked */
  @Input()
  set nzChecked(value: boolean) {
    this._checked = toBoolean(value);
  }

  get nzChecked(): boolean {
    return this._checked;
  }

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

  /** Event: emit after close */
  @Output() nzClose = new EventEmitter<Event>();

  /** Event: emit on change */
  @Output() nzChange = new EventEmitter<boolean>();


  @HostBinding('attr.data-show') get _dataShow(): boolean {
    return !this._closed;
  }

  get _backgroundColor(): string {
    const isPresetColor = this._isPresetColor(this.nzColor);
    return (this.nzColor && !isPresetColor) ? this.nzColor : null;
  }

  _afterClose(event: any): void {
    if (this._closed) {
      this.nzClose.emit(event);
    }
  }

  get _tagCls(): any {
    const isPresetColor = this._isPresetColor(this.nzColor);
    return {
      [this._prefixCls]                       : true,
      [`${this._prefixCls}-${this.nzColor}`]  : isPresetColor,
      [`${this._prefixCls}-has-color`]        : (this.nzColor && !isPresetColor),
      [`${this._prefixCls}-checkable`]        : true,
      [`${this._prefixCls}-checkable-checked`]: this.nzChecked
    };
  }

  get _textClass(): string {
    return `${this._prefixCls}-text`;
  }

  @HostListener('click', ['$event'])
  _handleClick(event: Event): void {
    event.preventDefault();
    this.nzChange.emit(!this.nzChecked);
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
