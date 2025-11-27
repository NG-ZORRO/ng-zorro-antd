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

import { withAnimationCheck } from 'ng-zorro-antd/core/animation';
import { NzFourDirectionType, NzShapeSCType } from 'ng-zorro-antd/core/types';
import { generateClassName } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzFloatButtonTopComponent } from './float-button-top.component';
import { NzFloatButtonComponent } from './float-button.component';
import { NzFloatButtonType } from './typings';

const CLASS_NAME = 'ant-float-btn-group';

@Component({
  selector: 'nz-float-button-group',
  exportAs: 'nzFloatButtonGroup',
  imports: [NzFloatButtonComponent, NzIconModule, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!isMenuMode()) {
      <ng-container *ngTemplateOutlet="menu"></ng-container>
    } @else {
      @if (open()) {
        <div class="ant-float-btn-group-wrap" [animate.enter]="enterAnimation()" [animate.leave]="leaveAnimation()">
          <ng-container *ngTemplateOutlet="menu"></ng-container>
        </div>
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
  readonly nzType = input<NzFloatButtonType>('default');
  readonly nzIcon = input<string | TemplateRef<void> | null>(null);
  readonly nzDescription = input<string | TemplateRef<void> | null>(null);
  readonly nzShape = input<NzShapeSCType>('circle');
  readonly nzTrigger = input<'click' | 'hover' | null>(null);
  readonly nzOpen = input<boolean | null>(null);
  readonly nzPlacement = input<NzFourDirectionType>('top');
  readonly nzOnOpenChange = output<boolean>();

  protected readonly dir = inject(Directionality).valueSignal;
  protected readonly open = linkedSignal<boolean>(() => !!this.nzOpen());
  protected readonly isMenuMode = computed(
    () => !!this.nzTrigger() && ['click', 'hover'].includes(this.nzTrigger() as string)
  );
  protected readonly isControlledMode = computed(() => this.nzOpen() !== null);
  protected readonly class = computed<string[]>(() => {
    const shape = this.nzShape();
    const dir = this.dir();
    const classes = [CLASS_NAME, this.generateClass(shape)];
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
  protected readonly enterAnimation = withAnimationCheck(() => `ant-float-btn-enter-${this.nzPlacement()}`);
  protected readonly leaveAnimation = withAnimationCheck(() => `ant-float-btn-leave-${this.nzPlacement()}`);

  constructor() {
    effect(() => {
      if (this.nzFloatButtonComponents()) {
        this.nzFloatButtonComponents().forEach(item => {
          item.shape.set(this.nzShape());
        });
      }
      if (this.nzFloatButtonTopComponents()) {
        this.nzFloatButtonTopComponents().forEach(item => {
          item.shape.set(this.nzShape());
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
    return generateClassName(CLASS_NAME, suffix);
  }
}
