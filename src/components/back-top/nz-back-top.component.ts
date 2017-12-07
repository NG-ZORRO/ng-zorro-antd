import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { throttleTime } from 'rxjs/operators/throttleTime';

import { NzScrollService } from '../core/scroll/nz-scroll.service';

@Component({
  selector     : 'nz-back-top',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    trigger('enterLeave', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ],
  template     : `
    <div class="ant-back-top" (click)="clickBackTop()" [@enterLeave] *ngIf="_display">
      <ng-template #defaultContent>
        <div class="ant-back-top-content"><i class="anticon anticon-to-top ant-back-top-icon"></i></div>
      </ng-template>
      <ng-template [ngTemplateOutlet]="nzTemplate || defaultContent"></ng-template>
    </div>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzBackTopComponent implements OnInit, OnDestroy {

  private scroll$: Subscription = null;
  private target: HTMLElement = null;

  _display: boolean = false;

  @ContentChild('nzTemplate') nzTemplate: TemplateRef<void>;

  @Input() nzVisibilityHeight: number = 400;

  @Input()
  set nzTarget(el: HTMLElement) {
    this.target = el;
    this.registerScrollEvent();
  }

  @Output() nzClick: EventEmitter<boolean> = new EventEmitter();

  constructor(private scrollSrv: NzScrollService, private _renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (!this.scroll$) this.registerScrollEvent();
  }

  clickBackTop(): void {
    this.scrollSrv.scrollTo(this.getTarget(), 0);
    this.nzClick.emit(true);
  }

  private getTarget(): HTMLElement | Window {
    return this.target || window;
  }

  private handleScroll(): void {
    this._display = this.scrollSrv.getScroll(this.getTarget()) > this.nzVisibilityHeight;
  }

  private removeListen(): void {
    if (this.scroll$) this.scroll$.unsubscribe();
  }

  private registerScrollEvent(): void {
    this.removeListen();
    this.handleScroll();
    this.scroll$ = fromEvent(this.getTarget(), 'scroll').pipe(throttleTime(50), distinctUntilChanged())
      .subscribe(e => {
        this.handleScroll();
      });
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

}
