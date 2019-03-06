import { CdkConnectedOverlay, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter, Host,
  Input,
  OnChanges,
  OnDestroy, Optional,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { combineLatest, merge, EMPTY, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mapTo, takeUntil } from 'rxjs/operators';
import { slideMotion } from '../core/animation/slide';
import { NzNoAnimationDirective } from '../core/no-animation/nz-no-animation.directive';
import { DEFAULT_DROPDOWN_POSITIONS, POSITION_MAP } from '../core/overlay/overlay-position';
import { InputBoolean } from '../core/util/convert';
import { NzMenuDirective } from '../menu/nz-menu.directive';
import { NzDropDownDirective } from './nz-dropdown.directive';
import { NzMenuDropdownService } from './nz-menu-dropdown.service';

export type NzPlacement = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';

@Component({
  selector           : 'nz-dropdown',
  preserveWhitespaces: false,
  providers          : [ NzMenuDropdownService ],
  animations         : [ slideMotion ],
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-dropdown.component.html',
  styles             : [
      `
      .ant-dropdown {
        top: 100%;
        left: 0;
        position: relative;
        width: 100%;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    `
  ]
})

export class NzDropDownComponent implements OnDestroy, AfterContentInit, OnChanges {
  triggerWidth = 0;
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  positions: ConnectionPositionPair[] = [ ...DEFAULT_DROPDOWN_POSITIONS ];
  visible$ = new Subject<boolean>();
  private destroy$ = new Subject<void>();
  @ContentChild(NzDropDownDirective) nzDropDownDirective: NzDropDownDirective;
  @ContentChild(NzMenuDirective) nzMenuDirective: NzMenuDirective;
  @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay: CdkConnectedOverlay;
  @Input() nzTrigger: 'click' | 'hover' = 'hover';
  @Input() nzOverlayClassName = '';
  @Input() nzOverlayStyle: { [ key: string ]: string } = {};
  @Input() nzPlacement: NzPlacement = 'bottomLeft';
  @Input() @InputBoolean() nzClickHide = true;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzVisible = false;
  @Input() @InputBoolean() nzTableFilter = false;
  @Output() readonly nzVisibleChange: EventEmitter<boolean> = new EventEmitter();

  setVisibleStateWhen(visible: boolean, trigger: 'click' | 'hover' | 'all' = 'all'): void {
    if (this.nzTrigger === trigger || trigger === 'all') {
      this.visible$.next(visible);
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
    this.cdr.markForCheck();
  }

  startSubscribe(observable$: Observable<boolean>): void {
    const click$ = this.nzClickHide ? this.nzMenuDropdownService.menuItemClick$.pipe(mapTo(false)) : EMPTY;
    combineLatest(
      merge(observable$, click$),
      this.nzMenuDropdownService.menuOpen$
    ).pipe(
      map(value => value[ 0 ] || value[ 1 ]),
      debounceTime(50),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((visible) => {
      if (!this.nzDisabled && this.nzVisible !== visible) {
        this.nzVisible = visible;
        this.nzVisibleChange.emit(this.nzVisible);
        this.triggerWidth = this.nzDropDownDirective.elementRef.nativeElement.getBoundingClientRect().width;
        this.cdr.markForCheck();
      }
    });
  }

  updateDisabledState(): void {
    if (this.nzDropDownDirective) {
      this.nzDropDownDirective.setDisabled(this.nzDisabled);
    }
  }

  constructor(protected cdr: ChangeDetectorRef, private nzMenuDropdownService: NzMenuDropdownService,
              @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterContentInit(): void {
    this.startSubscribe(merge(this.visible$, this.nzTrigger === 'hover' ? this.nzDropDownDirective.hover$ : this.nzDropDownDirective.$click));
    this.updateDisabledState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzVisible) {
      this.visible$.next(this.nzVisible);
    }
    if (changes.nzDisabled) {
      this.updateDisabledState();
    }
    if (changes.nzPlacement) {
      this.dropDownPosition = this.nzPlacement.indexOf('top') !== -1 ? 'top' : 'bottom';
      this.positions = [ POSITION_MAP[ this.nzPlacement ], ...this.positions ];
    }
  }
}
