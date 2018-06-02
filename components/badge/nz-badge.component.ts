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
  templateUrl        : './nz-badge.component.html',
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
  @Input() nzStyle: { [ key: string ]: string };
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
