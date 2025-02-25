/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzFloatButtonTopComponent } from './float-button-top.component';
import { NzFloatButtonComponent } from './float-button.component';

@Component({
  selector: 'nz-float-button-group',
  exportAs: 'nzFloatButtonGroup',
  imports: [NzFloatButtonComponent, NzIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeMotion],
  template: `
    @if (!nzTrigger || isOpen || nzOpen === true) {
      <div [class.ant-float-btn-group-wrap]="!!nzTrigger" @fadeMotion><ng-content></ng-content></div>
    }
    @if (!!nzTrigger) {
      @if (!isOpen && !nzOpen) {
        <nz-float-button
          [nzType]="nzType"
          [nzIcon]="nzIcon"
          [nzShape]="nzShape"
          [nzDescription]="nzDescription"
          (nzOnClick)="clickOpenMenu()"
          (mouseover)="hoverOpenMenu()"
        ></nz-float-button>
      } @else {
        <nz-float-button
          [nzType]="nzType"
          [nzIcon]="close"
          [nzShape]="nzShape"
          (nzOnClick)="clickCloseMenu()"
        ></nz-float-button>
      }
    }
    <ng-template #close>
      <nz-icon nzType="close" nzTheme="outline" />
    </ng-template>
  `,
  host: {
    class: 'ant-float-btn-group',
    '(mouseleave)': 'hoverCloseMenu()',
    '[class.ant-float-btn-group-circle]': `nzShape === 'circle'`,
    '[class.ant-float-btn-group-circle-shadow]': `nzShape === 'circle'`,
    '[class.ant-float-btn-group-square]': `nzShape === 'square'`,
    '[class.ant-float-btn-group-square-shadow]': `nzShape === 'square' && !nzTrigger`,
    '[class.ant-float-btn-group-rtl]': `dir === 'rtl'`
  },
  providers: [NzDestroyService]
})
export class NzFloatButtonGroupComponent implements OnInit, AfterContentInit {
  @ContentChildren(NzFloatButtonComponent) nzFloatButtonComponent!: QueryList<NzFloatButtonComponent>;
  @ContentChildren(NzFloatButtonTopComponent) nzFloatButtonTopComponents!: QueryList<NzFloatButtonTopComponent>;
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
    private directionality: Directionality,
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

  ngAfterContentInit(): void {
    if (this.nzFloatButtonComponent) {
      this.nzFloatButtonComponent.forEach(item => {
        item.nzShape = this.nzShape;
      });
    }
    if (this.nzFloatButtonTopComponents) {
      this.nzFloatButtonTopComponents.forEach(item => {
        item.nzShape = this.nzShape;
        item.detectChanges();
      });
    }
  }

  clickOpenMenu(): void {
    if (this.nzTrigger !== 'click' || this.nzOpen !== null) {
      return;
    }
    this.isOpen = true;
    this.nzOnOpenChange.emit(true);
    this.cdr.markForCheck();
  }

  hoverOpenMenu(): void {
    if (this.nzTrigger !== 'hover' || this.nzOpen !== null) {
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
