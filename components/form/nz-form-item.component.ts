import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';
import { NzRowDirective } from '../grid/nz-row.directive';
import { NzFormExplainComponent } from './nz-form-explain.component';

/** should add nz-row directive to host, track https://github.com/angular/angular/issues/8785 **/
@Component({
  selector           : 'nz-form-item',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  providers          : [ NzUpdateHostClassService ],
  templateUrl        : './nz-form-item.component.html',
  host               : {
    '[class.ant-form-item-with-help]': 'listOfNzFormExplainComponent && (listOfNzFormExplainComponent.length>0)'
  },
  styles             : [
      `
      nz-form-item {
        display: block;
      }
    `
  ]
})
export class NzFormItemComponent extends NzRowDirective implements AfterContentInit, OnDestroy {
  private _flex = false;
  @ContentChildren(NzFormExplainComponent, { descendants: true }) listOfNzFormExplainComponent: QueryList<NzFormExplainComponent>;

  @Input()
  set nzFlex(value: boolean) {
    this._flex = toBoolean(value);
    if (this._flex) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
    } else {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
    }
  }

  constructor(elementRef: ElementRef, renderer: Renderer2, nzUpdateHostClassService: NzUpdateHostClassService, mediaMatcher: MediaMatcher, ngZone: NgZone, platform: Platform, private cdr: ChangeDetectorRef) {
    super(elementRef, renderer, nzUpdateHostClassService, mediaMatcher, ngZone, platform);
    renderer.addClass(elementRef.nativeElement, 'ant-form-item');
  }

  ngAfterContentInit(): void {
    if (this.listOfNzFormExplainComponent) {
      this.listOfNzFormExplainComponent.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.cdr.markForCheck();
      });
    }
  }
}
