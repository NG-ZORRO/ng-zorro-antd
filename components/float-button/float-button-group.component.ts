/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  TemplateRef
} from '@angular/core';

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
    '[class]': 'class()',
    '(mouseleave)': 'hoverCloseMenu()'
  }
})
export class NzFloatButtonGroupComponent {
  readonly nzFloatButtonComponents = contentChildren(NzFloatButtonComponent);
  readonly nzFloatButtonTopComponents = contentChildren(NzFloatButtonTopComponent);

  readonly nzHref = input<string | null>(null);
  readonly nzTarget = input<string | null>(null);
  readonly nzType = input<'default' | 'primary'>('default');
  readonly nzIcon = input<string | TemplateRef<void> | null>(null);
  readonly nzDescription = input<TemplateRef<void> | null>(null);
  readonly nzShape = input<'circle' | 'square'>('circle');
  readonly nzTrigger = input<'click' | 'hover' | null>(null);
  readonly nzOpen = input<boolean | null>(null);
  readonly nzPlacement = input<'top' | 'right' | 'bottom' | 'left'>('top');
  readonly nzOnOpenChange = output<boolean>();

  protected dir = inject(Directionality).valueSignal;
  protected open = linkedSignal<boolean>(() => !!this.nzOpen());
  protected isMenuMode = computed(() => !!this.nzTrigger() && ['click', 'hover'].includes(this.nzTrigger() as string));
  protected isControlledMode = computed(() => this.nzOpen() !== null);
  protected class = computed<string[]>(() => {
    const shape = this.nzShape();
    const dir = this.dir();
    const classes = ['ant-float-btn-group', this.generateClass(shape)];
    if (!this.isMenuMode()) {
      classes.push(this.generateClass(`${shape}-shadow`));
    } else {
      classes.push(this.generateClass(this.nzPlacement()));
    }
    if (dir === 'rtl') {
      classes.push(this.generateClass(dir));
    }
    return classes;
  });

  constructor() {
    effect(() => {
      if (this.nzFloatButtonComponents()) {
        this.nzFloatButtonComponents().forEach(item => {
          item.nzShape = this.nzShape();
        });
      }
      if (this.nzFloatButtonTopComponents()) {
        this.nzFloatButtonTopComponents().forEach(item => {
          item.nzShape = this.nzShape();
          item.detectChanges();
        });
      }
    });
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

  private generateClass(suffix: string): string {
    return `ant-float-btn-group-${suffix}`;
  }
}
