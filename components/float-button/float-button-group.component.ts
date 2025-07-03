/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChildren,
  DestroyRef,
  inject,
  input,
  linkedSignal,
  OnInit,
  output,
  QueryList,
  signal,
  TemplateRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzFloatButtonTopComponent } from './float-button-top.component';
import { NzFloatButtonComponent } from './float-button.component';

@Component({
  selector: 'nz-float-button-group',
  exportAs: 'nzFloatButtonGroup',
  imports: [NzFloatButtonComponent, NzIconModule, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeMotion],
  template: `
    @if (!isMenuMode()) {
      <ng-container *ngTemplateOutlet="menu"></ng-container>
    } @else {
      @if (open()) {
        <div class="ant-float-btn-group-wrap" @fadeMotion><ng-container *ngTemplateOutlet="menu"></ng-container></div>
      }
      <nz-float-button
        class="ant-float-btn-group-trigger"
        [nzType]="nzType()"
        [nzIcon]="open() ? close : nzIcon()"
        [nzShape]="nzShape()"
        [nzDescription]="open() ? null : nzDescription()"
        (nzOnClick)="open() ? clickCloseMenu() : clickOpenMenu()"
        (mouseover)="hoverOpenMenu()"
      ></nz-float-button>
    }
    <ng-template #menu><ng-content></ng-content></ng-template>
    <ng-template #close>
      <nz-icon nzType="close" nzTheme="outline" />
    </ng-template>
  `,
  host: {
    class: 'ant-float-btn-group',
    '(mouseleave)': 'hoverCloseMenu()',
    '[class.ant-float-btn-group-circle]': `nzShape() === 'circle'`,
    '[class.ant-float-btn-group-circle-shadow]': `nzShape() === 'circle' && !isMenuMode()`,
    '[class.ant-float-btn-group-square]': `nzShape() === 'square'`,
    '[class.ant-float-btn-group-square-shadow]': `nzShape() === 'square' && !isMenuMode()`,
    '[class.ant-float-btn-group-rtl]': `dir() === 'rtl'`,
    '[class.ant-float-btn-group-top]': `isMenuMode() && nzPlacement() === 'top'`,
    '[class.ant-float-btn-group-bottom]': `isMenuMode() && nzPlacement() === 'bottom'`,
    '[class.ant-float-btn-group-left]': `isMenuMode() && nzPlacement() === 'left'`,
    '[class.ant-float-btn-group-right]': `isMenuMode() && nzPlacement() === 'right'`
  }
})
export class NzFloatButtonGroupComponent implements OnInit, AfterContentInit {
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);

  @ContentChildren(NzFloatButtonComponent) nzFloatButtonComponents!: QueryList<NzFloatButtonComponent>;
  @ContentChildren(NzFloatButtonTopComponent) nzFloatButtonTopComponents!: QueryList<NzFloatButtonTopComponent>;
  nzHref = input<string | null>(null);
  nzTarget = input<string | null>(null);
  nzType = input<'default' | 'primary'>('default');
  nzIcon = input<TemplateRef<void> | null>(null);
  nzDescription = input<TemplateRef<void> | null>(null);
  nzShape = input<'circle' | 'square'>('circle');
  nzTrigger = input<'click' | 'hover' | null>(null);
  nzOpen = input<boolean | null>(null);
  nzPlacement = input<'top' | 'right' | 'bottom' | 'left'>('top');
  readonly nzOnOpenChange = output<boolean>();

  open = linkedSignal<boolean>(() => !!this.nzOpen());
  isMenuMode = computed(() => !!this.nzTrigger() && ['click', 'hover'].includes(this.nzTrigger() as string));
  isControlledMode = computed(() => this.nzOpen() !== null);
  dir = signal<Direction>('ltr');

  ngOnInit(): void {
    this.dir.set(this.directionality.value);

    this.directionality.change
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((direction: Direction) => this.dir.set(direction));
  }

  ngAfterContentInit(): void {
    if (this.nzFloatButtonComponents) {
      this.nzFloatButtonComponents.forEach(item => {
        item.nzShape = this.nzShape();
      });
    }
    if (this.nzFloatButtonTopComponents) {
      this.nzFloatButtonTopComponents.forEach(item => {
        item.nzShape = this.nzShape();
        item.detectChanges();
      });
    }
  }

  clickOpenMenu(): void {
    this.handleEvent('click', true);
  }

  hoverOpenMenu(): void {
    this.handleEvent('hover', true);
  }

  clickCloseMenu(): void {
    this.handleEvent('click', false);
  }

  hoverCloseMenu(): void {
    this.handleEvent('hover', false);
  }

  private handleEvent(type: 'click' | 'hover', isOpen: boolean): void {
    if (this.nzTrigger() !== type || this.isControlledMode() || this.open() === isOpen) {
      return;
    }
    this.open.set(isOpen);
    this.nzOnOpenChange.emit(isOpen);
  }
}
