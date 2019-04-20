import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { InputBoolean, NzUpdateHostClassService } from 'ng-zorro-antd/core';

import { NzFormLabelComponent } from './nz-form-label.component';

@Directive({
  selector: '[nz-form]',
  exportAs: 'nzForm',
  providers: [NzUpdateHostClassService]
})
export class NzFormDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() nzLayout = 'horizontal';
  @Input() @InputBoolean() nzNoColon: boolean = false;

  @ContentChildren(NzFormLabelComponent, { descendants: true }) nzFormLabelComponent: QueryList<NzFormLabelComponent>;

  destroy$ = new Subject();

  setClassMap(): void {
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [`ant-form-${this.nzLayout}`]: this.nzLayout
    });
  }

  updateItemsDefaultColon(): void {
    if (this.nzFormLabelComponent) {
      this.nzFormLabelComponent.forEach(item => item.setDefaultNoColon(this.nzNoColon));
    }
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private nzUpdateHostClassService: NzUpdateHostClassService
  ) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-form');
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setClassMap();
    if (changes.hasOwnProperty('nzNoColon')) {
      this.updateItemsDefaultColon();
    }
  }

  ngAfterContentInit(): void {
    this.nzFormLabelComponent.changes
    .pipe(
      startWith(null),
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      this.updateItemsDefaultColon();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
