import {
  Component,
  ContentChild,
  HostBinding,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-badge',
  encapsulation: ViewEncapsulation.None,
  animations   : [
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
  template     : `
    <ng-template *ngIf="content" [ngTemplateOutlet]="content"></ng-template>
    <span class="ant-badge-status-dot ant-badge-status-{{nzStatus}}" *ngIf="nzStatus"></span>
    <span class="ant-badge-status-text" *ngIf="nzText">{{ nzText }}</span>
    <sup [@enterLeave]
         [ngStyle]="nzStyle"
         *ngIf="(nzDot)||(nzCount>0)||((nzCount==0)&&nzShowZero)"
         data-show="true"
         class="ant-scroll-number"
         [class.ant-badge-count]="!nzDot"
         [class.ant-badge-dot]="nzDot">
      <ng-template ngFor
                   [ngForOf]="maxNumberArray"
                   let-number
                   let-i="index"><span *ngIf="nzCount<=nzOverflowCount"
                                       class="ant-scroll-number-only"
                                       [style.transform]="'translateY('+((-countArray[i]*100))+'%)'">
        <ng-template [ngIf]="(!nzDot)&&(countArray[i]!=null)">
          <p *ngFor="let p of countSingleArray" [class.current]="p==countArray[i]">{{ p }}</p>
        </ng-template>
        </span></ng-template>
      <ng-template [ngIf]="nzCount>nzOverflowCount">{{ nzOverflowCount }}+</ng-template>
    </sup>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ],
  host: {
    '[class.ant-badge]': 'true'
  }
})
export class NzBadgeComponent implements OnInit {
  private _showDot = false;
  private _showZero = false;
  count: number;
  maxNumberArray;
  countArray = [];
  countSingleArray = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
  @ContentChild('content') content: TemplateRef<void>;

  @HostBinding('class.ant-badge-not-a-wrapper')
  get setNoWrapper(): boolean {
    return !this.content;
  }

  @Input() nzOverflowCount = 99;

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

  @Input() nzText: string;
  @Input() nzStyle;
  @Input() @HostBinding('class.ant-badge-status') nzStatus: string;

  @Input()
  set nzCount(value: number) {
    if (value < 0) {
      this.count = 0;
    } else {
      this.count = value;
    }
    this.countArray = this.count.toString().split('');
  }

  get nzCount(): number {
    return this.count;
  }

  ngOnInit(): void {
    this.maxNumberArray = this.nzOverflowCount.toString().split('');
  }
}
