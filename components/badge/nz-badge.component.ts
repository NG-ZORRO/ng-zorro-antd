import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { zoomBadgeMotion } from '../core/animation/zoom';
import { isEmpty } from '../core/util/check';
import { InputBoolean } from '../core/util/convert';

export type NzBadgeStatusType = 'success' | 'processing' | 'default' | 'error' | 'warning';

@Component({
  selector           : 'nz-badge',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  animations         : [ zoomBadgeMotion ],
  templateUrl        : './nz-badge.component.html',
  host               : {
    '[class.ant-badge]'       : 'true',
    '[class.ant-badge-status]': 'nzStatus'
  }
})
export class NzBadgeComponent implements OnInit, AfterViewInit {
  maxNumberArray = [];
  countArray = [];
  countSingleArray = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
  @ViewChild('contentElement') contentElement: ElementRef;
  @Input() @InputBoolean() nzShowZero = false;
  @Input() @InputBoolean() nzShowDot = true;
  @Input() @InputBoolean() nzDot = false;
  @Input() nzOverflowCount = 99;
  @Input() nzText: string;
  @Input() nzStyle: { [ key: string ]: string };
  @Input() nzStatus: NzBadgeStatusType;

  @Input()
  set nzCount(value: number) {
    if (value < 0) {
      this._count = 0;
    } else {
      this._count = value;
    }
    this.countArray = this._count.toString().split('');
  }

  get nzCount(): number {
    return this._count;
  }

  get showSup(): boolean {
    return (this.nzShowDot && this.nzDot) || this.nzCount > 0 || ((this.nzCount === 0) && this.nzShowZero);
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {

  }

  private _count: number;

  checkContent(): void {
    if (isEmpty(this.contentElement.nativeElement)) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-badge-not-a-wrapper');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-badge-not-a-wrapper');
    }
  }

  ngOnInit(): void {
    this.maxNumberArray = this.nzOverflowCount.toString().split('');
  }

  ngAfterViewInit(): void {
    this.checkContent();
  }
}
