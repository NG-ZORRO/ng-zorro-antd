import {
  AfterViewInit,
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { NzNoAnimationDirective } from '../core/no-animation/nz-no-animation.directive';
import { isNotNil } from '../core/util/check';

import { NzToolTipComponent } from './nz-tooltip.component';

@Directive({
  selector: '[nz-tooltip]',
  host    : {
    '[class.ant-tooltip-open]': 'isTooltipOpen'
  }
})
export class NzTooltipDirective implements AfterViewInit, OnChanges, OnInit, OnDestroy {
  // [NOTE] Here hard coded, and nzTitle used only under NzTooltipDirective currently.
  isTooltipOpen: boolean = false;
  isDynamicTooltip = false; // Indicate whether current tooltip is dynamic created
  delayTimer: number | null; // Timer for delay enter/leave
  visible: boolean;
  factory: ComponentFactory<NzToolTipComponent> = this.resolver.resolveComponentFactory(NzToolTipComponent);

  /** Names of properties that should be proxy to child component. */
  protected needProxyProperties = [
    'nzTitle',
    'nzContent',
    'nzOverlayClassName',
    'nzOverlayStyle',
    'nzMouseEnterDelay',
    'nzMouseLeaveDelay',
    'nzVisible',
    'nzTrigger',
    'nzPlacement'
  ];

  protected subs_ = new Subscription();

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  @Input('nz-tooltip') nzTitle: string | TemplateRef<void>;

  @Input('nzTitle') set setTitle(title: string | TemplateRef<void>) {
    this.nzTitle = title;
  }

  @Input() nzContent: string | TemplateRef<void>;
  @Input() nzMouseEnterDelay: number;
  @Input() nzMouseLeaveDelay: number;
  @Input() nzOverlayClassName: string;
  @Input() nzOverlayStyle: { [ key: string ]: string };
  @Input() nzTrigger: string;
  @Input() nzVisible: boolean;
  @Input() nzPlacement: string;

  [ property: string ]: any // tslint:disable-line:no-any

  constructor(
    public elementRef: ElementRef,
    public hostView: ViewContainerRef,
    public resolver: ComponentFactoryResolver,
    public renderer: Renderer2,
    @Optional() public tooltip: NzToolTipComponent,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateProxies(changes);
  }

  ngOnInit(): void {
    // Support faster tooltip mode: <a nz-tooltip="xxx"></a>. [NOTE] Used only under NzTooltipDirective currently.
    if (!this.tooltip) {
      const tooltipComponent = this.hostView.createComponent(this.factory);
      this.tooltip = tooltipComponent.instance;
      this.tooltip.noAnimation = this.noAnimation;
      // Remove element when use directive https://github.com/NG-ZORRO/ng-zorro-antd/issues/1967
      this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), tooltipComponent.location.nativeElement);
      this.isDynamicTooltip = true;
      this.needProxyProperties.forEach(property => this.updateCompValue(property, this[ property ]));
      const visible_ = this.tooltip.nzVisibleChange.pipe(distinctUntilChanged()).subscribe(data => {
        this.visible = data;
        this.nzVisibleChange.emit(data);
      });
      this.subs_.add(visible_);
    }
    this.tooltip.setOverlayOrigin(this);
  }

  ngAfterViewInit(): void {
    if (this.tooltip.nzTrigger === 'hover') {
      let overlayElement: HTMLElement;
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
    this.subs_.unsubscribe();
  }

  // tslint:disable-next-line:no-any
  protected updateCompValue(key: string, value: any): void {
    if (this.isDynamicTooltip && isNotNil(value)) {
      this.tooltip[ key ] = value;
    }
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
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    } else if (delay > 0) {
      this.delayTimer = setTimeout(() => {
        this.delayTimer = null;
        isEnter ? this.show() : this.hide();
      }, delay * 1000);
    } else {
      isEnter && isOrigin ? this.show() : this.hide(); // [Compatible] The "isOrigin" is used due to the tooltip will not hide immediately (may caused by the fade-out animation)
    }
  }

  /**
   * Set inputs of child components when this component's inputs change.
   * @param changes
   */
  private updateProxies(changes: SimpleChanges): void {
    if (this.tooltip) {
      Object.keys(changes).forEach(key => {
        const change = changes[ key ];
        if (change) {
          this.updateCompValue(key, change.currentValue);
        }
      });

      if (changes.setTitle) {
        this.nzTitle = changes.setTitle.currentValue;
        this.updateCompValue('nzTitle', changes.setTitle.currentValue);
      }

      this.tooltip.cdr.markForCheck(); // Manually trigger change detection of component.
    }
  }
}
