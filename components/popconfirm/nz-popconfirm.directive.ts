import {
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { toBoolean } from '../core/util/convert';
import { NzTooltipDirective } from '../tooltip/nz-tooltip.directive';
import { NzPopconfirmComponent } from './nz-popconfirm.component';

@Directive({
  selector: '[nz-popconfirm]'
})
export class NzPopconfirmDirective extends NzTooltipDirective implements OnInit, OnDestroy {
  private subclassUnsubscribe$ = new Subject<void>();

  factory: ComponentFactory<NzPopconfirmComponent> = this.resolver.resolveComponentFactory(NzPopconfirmComponent);
  _condition: boolean = false;
  _okText: string;
  _okType: string = 'primary';
  _cancelText: string;

  @Output() nzOnCancel: EventEmitter<void> = new EventEmitter();
  @Output() nzOnConfirm: EventEmitter<void> = new EventEmitter();

  @Input()
  set nzOkText(value: string) {
    this._okText = value;
    this.updateCompValue('nzOkText', value);
  }

  get nzOkText(): string {
    return this._okText;
  }

  @Input()
  set nzOkType(value: string) {
    this._okType = value;
    this.updateCompValue('nzOkType', value);
  }

  get nzOkType(): string {
    return this._okType;
  }

  @Input()
  set nzCancelText(value: string) {
    this._cancelText = value;
    this.updateCompValue('nzCancelText', value);
  }

  get nzCancelText(): string {
    return this._cancelText;
  }

  @Input()
  set nzCondition(value: boolean) {
    this._condition = toBoolean(value);
    this.updateCompValue('nzCondition', value);
  }

  get nzCondition(): boolean {
    return this._condition;
  }

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Optional() tooltip: NzPopconfirmComponent) {
    super(elementRef, hostView, resolver, renderer, tooltip);
  }

  ngOnInit(): void {
    if (!this.tooltip) {
      const tooltipComponent = this.hostView.createComponent(this.factory);
      this.tooltip = tooltipComponent.instance;
      // Remove element when use directive https://github.com/NG-ZORRO/ng-zorro-antd/issues/1967
      this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), tooltipComponent.location.nativeElement);
      this.isDynamicTooltip = true;
      const properties = [
        'nzTitle',
        'nzContent',
        'nzOverlayClassName',
        'nzOverlayStyle',
        'nzMouseEnterDelay',
        'nzMouseLeaveDelay',
        'nzVisible',
        'nzTrigger',
        'nzPlacement',
        'nzOkText',
        'nzOkType',
        'nzCancelText',
        'nzCondition' ];
      properties.forEach(property => this.updateCompValue(property, this[ property ]));
      this.tooltip.nzVisibleChange.pipe(takeUntil(this.subclassUnsubscribe$), distinctUntilChanged()).subscribe(data => {
        this._visible = data;
        this.nzVisibleChange.emit(data);
      });
      (this.tooltip  as NzPopconfirmComponent).nzOnCancel.pipe(takeUntil(this.subclassUnsubscribe$)).subscribe(data => {
        this.nzOnCancel.emit();
      });
      (this.tooltip  as NzPopconfirmComponent).nzOnConfirm.pipe(takeUntil(this.subclassUnsubscribe$)).subscribe(data => {
        this.nzOnConfirm.emit();
      });
    }
    this.tooltip.setOverlayOrigin(this);
  }

  ngOnDestroy(): void {
    this.subclassUnsubscribe$.next();
    this.subclassUnsubscribe$.complete();
  }
}
