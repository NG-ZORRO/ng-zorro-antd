import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit,
  Renderer2, SimpleChanges, TemplateRef,
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
    '[class.ant-badge-status]': 'nzStatus'
  }
})
export class NzBadgeComponent implements OnInit, AfterViewInit, OnChanges {
  maxNumberArray: string[] = [];
  countArray: number[] = [];
  countSingleArray = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
  count: number;
  @ViewChild('contentElement') contentElement: ElementRef;
  @Input() @InputBoolean() nzShowZero = false;
  @Input() @InputBoolean() nzShowDot = true;
  @Input() @InputBoolean() nzDot = false;
  @Input() nzOverflowCount = 99;
  @Input() nzText: string;
  @Input() nzStyle: { [ key: string ]: string };
  @Input() nzStatus: NzBadgeStatusType;
  @Input() nzCount: number | TemplateRef<void>;

  checkContent(): void {
    if (isEmpty(this.contentElement.nativeElement)) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-badge-not-a-wrapper');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-badge-not-a-wrapper');
    }
  }

  get showSup(): boolean {
    return (this.nzShowDot && this.nzDot) || this.count > 0 || (this.count === 0 && this.nzShowZero);
  }

  generateMaxNumberArray(): void {
    this.maxNumberArray = this.nzOverflowCount.toString().split('');
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-badge');
  }

  ngOnInit(): void {
    this.generateMaxNumberArray();
  }

  ngAfterViewInit(): void {
    this.checkContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzOverflowCount, nzCount } = changes;
    if (nzCount && !(nzCount.currentValue instanceof TemplateRef)) {
      this.count = Math.max(0, nzCount.currentValue);
      this.countArray = this.count.toString().split('').map(item => +item);
    }
    if (nzOverflowCount) {
      this.generateMaxNumberArray();
    }
  }
}
