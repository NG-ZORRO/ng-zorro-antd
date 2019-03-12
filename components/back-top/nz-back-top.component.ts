import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { fadeMotion } from '../core/animation/fade';

import { NzScrollService } from '../core/scroll/nz-scroll.service';
import { toNumber } from '../core/util/convert';

@Component({
  selector           : 'nz-back-top',
  animations         : [ fadeMotion ],
  templateUrl        : './nz-back-top.component.html',
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class NzBackTopComponent implements OnInit, OnDestroy {

  private scroll$: Subscription | null = null;
  private target: HTMLElement | null = null;

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
  set nzTarget(el: string | HTMLElement) {
    this.target = typeof el === 'string' ? this.doc.querySelector(el) : el;
    this.registerScrollEvent();
  }

  @Output() readonly nzClick: EventEmitter<boolean> = new EventEmitter();

  // tslint:disable-next-line:no-any
  constructor(private scrollSrv: NzScrollService, @Inject(DOCUMENT) private doc: any, private cd: ChangeDetectorRef) {
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
    this.cd.markForCheck();
  }

  private removeListen(): void {
    if (this.scroll$) {
      this.scroll$.unsubscribe();
    }
  }

  private registerScrollEvent(): void {
    this.removeListen();
    this.handleScroll();
    this.scroll$ = fromEvent(this.getTarget(), 'scroll').pipe(
      throttleTime(50),
      distinctUntilChanged()
    ).subscribe(() => this.handleScroll());
  }

  ngOnDestroy(): void {
    this.removeListen();
  }

}
