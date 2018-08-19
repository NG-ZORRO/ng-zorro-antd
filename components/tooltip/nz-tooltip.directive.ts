import {
  AfterViewInit,
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { isNotNil } from '../core/util/check';
import { NzToolTipComponent } from './nz-tooltip.component';

@Directive({
  selector: '[nz-tooltip]'
})
export class NzTooltipDirective implements AfterViewInit, OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  // [NOTE] Here hard coded, and nzTitle used only under NzTooltipDirective currently.
  isTooltipOpen: boolean = false;
  isDynamicTooltip = false; // Indicate whether current tooltip is dynamic created
  delayTimer; // Timer for delay enter/leave
  _title: string | TemplateRef<void>;
  _content: string | TemplateRef<void>;
  _overlayClassName: string;
  _overlayStyle: { [ key: string ]: string };
  _mouseEnterDelay: number;
  _mouseLeaveDelay: number;
  _visible: boolean;
  _trigger: string;
  _placement: string;
  factory: ComponentFactory<NzToolTipComponent> = this.resolver.resolveComponentFactory(NzToolTipComponent);
  @Output() nzVisibleChange = new EventEmitter<boolean>();

  @Input('nz-tooltip')
  set nzTitle(title: string | TemplateRef<void>) {
    this._title = title;
    this.updateCompValue('nzTitle', title);
  }

  get nzTitle(): string | TemplateRef<void> {
    return this._title;
  }

  @Input('nzTitle')
  set setTitle(title: string | TemplateRef<void>) {
    this.nzTitle = title;
  }

  @Input()
  set nzContent(value: string | TemplateRef<void>) {
    this._content = value;
    this.updateCompValue('nzContent', value);
  }

  get nzContent(): string | TemplateRef<void> {
    return this._content;
  }

  @Input()
  set nzOverlayClassName(value: string) {
    this._overlayClassName = value;
    this.updateCompValue('nzOverlayClassName', value);
  }

  get nzOverlayClassName(): string {
    return this._overlayClassName;
  }

  @Input()
  set nzOverlayStyle(value: { [ key: string ]: string }) {
    this._overlayStyle = value;
    this.updateCompValue('nzOverlayStyle', value);
  }

  get nzOverlayStyle(): { [ key: string ]: string } {
    return this._overlayStyle;
  }

  @Input()
  set nzMouseEnterDelay(value: number) {
    this._mouseEnterDelay = value;
    this.updateCompValue('nzMouseEnterDelay', value);
  }

  get nzMouseEnterDelay(): number {
    return this._mouseEnterDelay;
  }

  @Input()
  set nzMouseLeaveDelay(value: number) {
    this._mouseLeaveDelay = value;
    this.updateCompValue('nzMouseLeaveDelay', value);
  }

  get nzMouseLeaveDelay(): number {
    return this._mouseEnterDelay;
  }

  @Input()
  set nzVisible(value: boolean) {
    this._visible = value;
    this.updateCompValue('nzVisible', value);
  }

  get nzVisible(): boolean {
    return this._visible;
  }

  @Input()
  set nzTrigger(value: string) {
    this._trigger = value;
    this.updateCompValue('nzTrigger', value);
  }

  get nzTrigger(): string {
    return this._trigger;
  }

  @Input()
  set nzPlacement(value: string) {
    this._placement = value;
    this.updateCompValue('nzPlacement', value);
  }

  get nzPlacement(): string {
    return this._placement;
  }

  @HostBinding('class.ant-tooltip-open')
  get isOpen(): boolean {
    return this.isTooltipOpen;
  }

  private show(): void {
    this.tooltip.show();
    this.isTooltipOpen = true;
  }

  private hide(): void {
    this.tooltip.hide();
    this.isTooltipOpen = false;
  }

  private delayEnterLeave(isOrigin: boolean, isEnter: boolean, delay: number = -1): void {
    if (this.delayTimer) { // Clear timer during the delay time
      window.clearTimeout(this.delayTimer);
      this.delayTimer = null;
    } else if (delay > 0) {
      this.delayTimer = window.setTimeout(() => {
        this.delayTimer = null;
        isEnter ? this.show() : this.hide();
      }, delay * 1000);
    } else {
      isEnter && isOrigin ? this.show() : this.hide(); // [Compatible] The "isOrigin" is used due to the tooltip will not hide immediately (may caused by the fade-out animation)
    }
  }

  // tslint:disable-next-line:no-any
  updateCompValue(key: string, value: any): void {
    if (this.isDynamicTooltip && isNotNil(value)) {
      this.tooltip[ key ] = value;
    }
  }

  constructor(
    public elementRef: ElementRef,
    public hostView: ViewContainerRef,
    public resolver: ComponentFactoryResolver,
    public renderer: Renderer2,
    @Optional() public tooltip: NzToolTipComponent) {
  }

  ngOnInit(): void {
    // Support faster tooltip mode: <a nz-tooltip="xxx"></a>. [NOTE] Used only under NzTooltipDirective currently.
    if (!this.tooltip) {
      const tooltipComponent = this.hostView.createComponent(this.factory);
      this.tooltip = tooltipComponent.instance;
      // Remove element when use directive https://github.com/NG-ZORRO/ng-zorro-antd/issues/1967
      this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), tooltipComponent.location.nativeElement);
      this.isDynamicTooltip = true;
      const properties = [ 'nzTitle', 'nzContent', 'nzOverlayClassName', 'nzOverlayStyle', 'nzMouseEnterDelay', 'nzMouseLeaveDelay', 'nzVisible', 'nzTrigger', 'nzPlacement' ];
      properties.forEach(property => this.updateCompValue(property, this[ property ]));
      this.tooltip.nzVisibleChange.pipe(takeUntil(this.unsubscribe$), distinctUntilChanged()).subscribe(data => {
        this._visible = data;
        this.nzVisibleChange.emit(data);
      });
    }
    this.tooltip.setOverlayOrigin(this);
  }

  ngAfterViewInit(): void {
    if (this.tooltip.nzTrigger === 'hover') {
      let overlayElement;
      this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => this.delayEnterLeave(true, true, this.tooltip.nzMouseEnterDelay));
      this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', () => {
        this.delayEnterLeave(true, false, this.tooltip.nzMouseLeaveDelay);
        if (this.tooltip.overlay.overlayRef && !overlayElement) { // NOTE: we bind events under "mouseleave" due to the overlayRef is only created after the overlay was completely shown up
          overlayElement = this.tooltip.overlay.overlayRef.overlayElement;
          this.renderer.listen(overlayElement, 'mouseenter', () => this.delayEnterLeave(false, true));
          this.renderer.listen(overlayElement, 'mouseleave', () => this.delayEnterLeave(false, false));
        }
      });
    } else if (this.tooltip.nzTrigger === 'focus') {
      this.renderer.listen(this.elementRef.nativeElement, 'focus', () => this.show());
      this.renderer.listen(this.elementRef.nativeElement, 'blur', () => this.hide());
    } else if (this.tooltip.nzTrigger === 'click') {
      this.renderer.listen(this.elementRef.nativeElement, 'click', (e) => {
        e.preventDefault();
        this.show();
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
