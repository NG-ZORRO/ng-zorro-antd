import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';

import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

import { isEmpty } from '../core/util/check';
import { toBoolean } from '../core/util/convert';

export type NzBadgeStatusType = 'success' | 'processing' | 'default' | 'error' | 'warning';

@Component({
  selector           : 'nz-badge',
  preserveWhitespaces: false,
  animations         : [
    trigger('enterLeave', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46)')
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46)')
      ])
    ])
  ],
  template           : `
    <span (cdkObserveContent)="checkContent()" #contentElement><ng-content></ng-content></span>
    <span class="ant-badge-status-dot ant-badge-status-{{nzStatus}}" *ngIf="nzStatus"></span>
    <span class="ant-badge-status-text" *ngIf="nzStatus">{{ nzText }}</span>
    <sup
      *ngIf="showSup"
      [@enterLeave]
      [ngStyle]="nzStyle"
      class="ant-scroll-number"
      [class.ant-badge-count]="!nzDot"
      [class.ant-badge-dot]="nzDot"
      [class.ant-badge-multiple-words]="countArray.length>=2">
      <ng-template ngFor
        [ngForOf]="maxNumberArray"
        let-number
        let-i="index">
        <span
          *ngIf="nzCount<=nzOverflowCount"
          class="ant-scroll-number-only"
          [style.transform]="'translateY('+((-countArray[i]*100))+'%)'">
            <ng-template [ngIf]="(!nzDot)&&(countArray[i]!=null)">
              <p *ngFor="let p of countSingleArray" [class.current]="p==countArray[i]">{{ p }}</p>
            </ng-template>
        </span>
      </ng-template>
      <ng-template [ngIf]="nzCount>nzOverflowCount">{{ nzOverflowCount }}+</ng-template>
    </sup>
  `,
  host               : {
    '[class.ant-badge]'       : 'true',
    '[class.ant-badge-status]': 'nzStatus'
  },
  styles             : [
      `
      :host:not(.ant-badge-not-a-wrapper) .ant-badge-count {
        position: absolute;
        transform: translateX(50%);
        right: 0;
      }

      :host .ant-badge-dot {
        position: absolute;
        transform: translateX(50%);
        right: 0;
      }
    `
  ]
})
export class NzBadgeComponent implements OnInit, AfterViewInit {
  private _showDot = false;
  private _showZero = false;
  private _count: number;
  maxNumberArray = [];
  countArray = [];
  countSingleArray = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
  @ViewChild('contentElement') contentElement: ElementRef;
  @Input() nzOverflowCount = 99;
  @Input() nzText: string;
  @Input() nzStyle: { [key: string]: string };
  @Input() nzStatus: NzBadgeStatusType;

  @Input()
  set nzShowZero(value: boolean) {
    this._showZero = toBoolean(value);
  }

  get nzShowZero(): boolean {
    return this._showZero;
  }

  @Input()
  set nzDot(value: boolean) {
    this._showDot = toBoolean(value);
  }

  get nzDot(): boolean {
    return this._showDot;
  }

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
    return this.nzDot || this.nzCount > 0 || ((this.nzCount === 0) && this.nzShowZero);
  }

  checkContent(): void {
    if (isEmpty(this.contentElement.nativeElement)) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-badge-not-a-wrapper');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-badge-not-a-wrapper');
    }
  }

  constructor(private zone: NgZone, private renderer: Renderer2, private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.maxNumberArray = this.nzOverflowCount.toString().split('');
  }

  ngAfterViewInit(): void {
    this.checkContent();
  }
}
