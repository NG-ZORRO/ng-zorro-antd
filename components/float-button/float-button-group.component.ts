/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  TemplateRef
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { NzDestroyService } from 'ng-zorro-antd/core/services';

@Component({
  selector: 'nz-float-button-group',
  exportAs: 'nzFloatButtonGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeMotion],
  template: `
    <ng-container *ngIf="!nzTrigger || isOpen || nzOpen === true">
      <div [class.ant-float-btn-group-wrap]="!!nzTrigger" @fadeMotion><ng-content></ng-content></div>
    </ng-container>
    <ng-container *ngIf="!!nzTrigger">
      <ng-container [ngSwitch]="getOpen()">
        <ng-container *ngSwitchDefault>
          <nz-float-button
            *ngIf="!isOpen"
            [nzType]="nzType"
            [nzIcon]="nzIcon"
            [nzDescription]="nzDescription"
            (nzOnClick)="clickOpenMenu()"
            (mouseover)="hoverOpenMenu()"
          ></nz-float-button>
          <nz-float-button
            *ngIf="isOpen"
            [nzType]="nzType"
            [nzIcon]="close"
            (nzOnClick)="clickCloseMenu()"
          ></nz-float-button>
        </ng-container>
        <nz-float-button
          *ngSwitchCase="'close'"
          [nzType]="nzType"
          [nzIcon]="nzIcon"
          [nzDescription]="nzDescription"
        ></nz-float-button>
        <nz-float-button *ngSwitchCase="'open'" [nzType]="nzType" [nzIcon]="close"></nz-float-button>
      </ng-container>
    </ng-container>
    <ng-template #close>
      <span nz-icon nzType="close" nzTheme="outline"></span>
    </ng-template>
  `,
  host: {
    class: 'ant-float-btn-group',
    '(mouseleave)': 'hoverCloseMenu()',
    '[class.ant-float-btn-group-circle]': `nzShape === 'circle'`,
    '[class.ant-float-btn-group-circle-shadow]': `nzShape === 'circle'`,
    '[class.ant-float-btn-group-square]': `nzShape === 'square'`,
    '[class.ant-float-btn-group-square-shadow]': `nzShape === 'square'`,
    '[class.ant-float-btn-group-rtl]': `dir === 'rtl'`
  },
  providers: [NzDestroyService]
})
export class NzFloatButtonGroupComponent implements OnInit {
  @Input() nzHref: string | null = null;
  @Input() nzTarget: string | null = null;
  @Input() nzType: 'default' | 'primary' = 'default';
  @Input() nzIcon: TemplateRef<void> | null = null;
  @Input() nzDescription: TemplateRef<void> | null = null;

  @Input() nzShape: 'circle' | 'square' = 'circle';
  @Input() nzTrigger: 'click' | 'hover' | null = null;
  @Input() nzOpen: boolean | null = null;
  @Output() readonly nzOnOpenChange = new EventEmitter<boolean>();
  isOpen: boolean = false;
  dir: Direction = 'ltr';

  constructor(
    private destroy$: NzDestroyService,
    @Optional() private directionality: Directionality,
    private cdr: ChangeDetectorRef
  ) {
    this.dir = this.directionality.value;
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  getOpen(): 'default' | 'open' | 'close' {
    if (typeof this.nzOpen === 'boolean') {
      if (this.nzOpen) {
        return 'open';
      } else {
        return 'close';
      }
    } else {
      return 'default';
    }
  }

  clickOpenMenu(): void {
    if (this.nzTrigger !== 'click') {
      return;
    }
    this.isOpen = true;
    this.nzOnOpenChange.emit(true);
    this.cdr.markForCheck();
  }

  hoverOpenMenu(): void {
    if (this.nzTrigger !== 'hover') {
      return;
    }
    this.isOpen = true;
    this.nzOnOpenChange.emit(true);
    this.cdr.markForCheck();
  }

  clickCloseMenu(): void {
    if (this.nzTrigger !== 'click') {
      return;
    }
    this.isOpen = false;
    this.nzOnOpenChange.emit(false);
    this.cdr.markForCheck();
  }

  hoverCloseMenu(): void {
    if (this.nzTrigger !== 'hover' || typeof this.nzOpen === 'boolean') {
      return;
    }
    this.isOpen = false;
    this.nzOnOpenChange.emit(false);
    this.cdr.markForCheck();
  }
}
