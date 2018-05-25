import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';

import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';

import { NzScrollService } from '../core/scroll/nz-scroll.service';
import { toNumber } from '../core/util/convert';

@Component({
  selector           : 'nz-back-top',
  animations         : [
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
  templateUrl        : './nz-back-top.component.html',
  changeDetection    : ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class NzBackTopComponent implements OnInit, OnDestroy {

  private scroll$: Subscription = null;
  private target: HTMLElement = null;

  visible: boolean = false;

  @Input() nzTemplate: TemplateRef<void>;

  private _visibilityHeight: number = 400;

  @Input()
  set nzVisibilityHeight(value: number) {
    this._visibilityHeight = toNumber(value, 400);
  }

  get nzVisibilityHeight(): number {
    return this._visibilityHeight;
  }

  @Input()
  set nzTarget(el: HTMLElement) {
    this.target = el;
    this.registerScrollEvent();
  }

  @Output() nzClick: EventEmitter<boolean> = new EventEmitter();

  constructor(private scrollSrv: NzScrollService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (!this.scroll$) {
      this.registerScrollEvent();
    }
  }

  clickBackTop(): void {
    this.scrollSrv.scrollTo(this.getTarget(), 0);
    this.nzClick.emit(true);
  }

  private getTarget(): HTMLElement | Window {
    return this.target || window;
  }

  private handleScroll(): void {
    if (this.visible === this.scrollSrv.getScroll(this.getTarget()) > this.nzVisibilityHeight) {
      return;
    }
    this.visible = !this.visible;
    this.cd.detectChanges();
  }

  private removeListen(): void {
    if (this.scroll$) {
      this.scroll$.unsubscribe();
    }
  }

  private registerScrollEvent(): void {
    this.removeListen();
    this.handleScroll();
    this.scroll$ = fromEvent(this.getTarget(), 'scroll').pipe(throttleTime(50), distinctUntilChanged())
    .subscribe(e => this.handleScroll());
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

}
