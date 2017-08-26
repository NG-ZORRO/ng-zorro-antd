import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  TemplateRef,
  EventEmitter,
  Output,
  Renderer2,
  OnDestroy,
  ContentChild
} from '@angular/core';

import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';
// import { Observable } from 'rxjs/Observable';
import { RxChain } from '@angular/cdk';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { throttleTime } from 'rxjs/operator/throttleTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';

import { NzScrollService } from "../core/scroll/nz-scroll.service";

@Component({
  selector: 'nz-back-top',
  encapsulation: ViewEncapsulation.None,
  animations: [
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
  template: `
  <div class="ant-back-top" (click)="clickBackTop()" [@enterLeave] *ngIf="_display">
    <ng-template #defaultContent>
      <div class="ant-back-top-content"><i class="anticon anticon-to-top ant-back-top-icon"></i></div>
    </ng-template>
    <ng-template [ngTemplateOutlet]="nzTemplate || defaultContent"></ng-template>
  </div>
  `,
  styleUrls: [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzBackTopComponent implements OnInit, OnDestroy {

  private scroll$: Subscription = null;
  private target: HTMLElement = null;

  _display: boolean = false;

  @ContentChild('nzTemplate') nzTemplate: TemplateRef<any>;

  @Input() nzVisibilityHeight: number = 400;

  @Input()
  set nzTarget(el: HTMLElement) {
    this.target = el;
    this.registerScrollEvent();
  }

  @Output() nzClick: EventEmitter<boolean> = new EventEmitter();

  constructor(private scrollSrv: NzScrollService, private _renderer: Renderer2) { }

  ngOnInit(): void {
    if (!this.scroll$) this.registerScrollEvent();
  }

  clickBackTop() {
    this.scrollSrv.scrollTo(this.getTarget(), 0);
    this.nzClick.emit(true);
  }

  private getTarget() {
    return this.target || window;
  }

  private handleScroll() {
    this._display = this.scrollSrv.getScroll(this.getTarget()) > this.nzVisibilityHeight;
  }

  private removeListen() {
    if (this.scroll$) this.scroll$.unsubscribe();
  }

  private registerScrollEvent() {
    this.removeListen();
    this.handleScroll();
    this.scroll$ = (RxChain.from(fromEvent(this.getTarget(), 'scroll')) as RxChain<any>)
      .call(throttleTime, 50)
      .call(distinctUntilChanged)
      .subscribe(e => {
        this.handleScroll();
      });
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

}
