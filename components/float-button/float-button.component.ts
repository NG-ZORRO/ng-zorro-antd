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
  inject,
  input,
  linkedSignal,
  output,
  TemplateRef
} from '@angular/core';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzShapeSCType } from 'ng-zorro-antd/core/types';
import { generateClassName } from 'ng-zorro-antd/core/util';

import { NzFloatButtonContentComponent } from './float-button-content.component';
import { NzFloatButtonBadge, NzFloatButtonType } from './typings';

const CLASS_NAME = 'ant-float-btn';

@Component({
  selector: 'nz-float-button',
  exportAs: 'nzFloatButton',
  imports: [NzButtonModule, NzFloatButtonContentComponent, NzBadgeModule, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!!nzHref()) {
      <a
        [target]="nzTarget()"
        [href]="nzHref()"
        nz-button
        [nzType]="nzType()"
        [class.ant-float-btn-default]="nzType() === 'default'"
        class="ant-float-btn-inner"
        (click)="nzOnClick.emit(true)"
      >
        <ng-container *ngTemplateOutlet="contentTemplate" />
      </a>
    } @else {
      <button
        nz-button
        [nzType]="nzType()"
        [class.ant-float-btn-default]="nzType() === 'default'"
        class="ant-float-btn-inner"
        (click)="nzOnClick.emit(true)"
      >
        <ng-container *ngTemplateOutlet="contentTemplate" />
      </button>
    }
    <ng-template #contentTemplate>
      <nz-float-button-content
        [nzBadge]="nzBadge()"
        [nzIcon]="nzIcon()"
        [nzDescription]="nzDescription()"
        [nzShape]="shape()"
      />
    </ng-template>
  `,
  host: {
    '[class]': 'class()'
  }
})
export class NzFloatButtonComponent {
  readonly nzHref = input<string | null>(null);
  readonly nzTarget = input<string | null>(null);
  readonly nzType = input<NzFloatButtonType>('default');
  readonly nzIcon = input<string | TemplateRef<void> | null>(null);
  readonly nzDescription = input<string | TemplateRef<void> | null>(null);
  readonly nzShape = input<NzShapeSCType>('circle');
  readonly nzBadge = input<NzFloatButtonBadge | null>(null);
  readonly nzOnClick = output<boolean>();

  readonly shape = linkedSignal(() => this.nzShape());
  protected readonly dir = inject(Directionality).valueSignal;
  protected readonly class = computed<string[]>(() => {
    const dir = this.dir();
    const classes = [CLASS_NAME, this.generateClass(this.shape())];
    if (dir === 'rtl') {
      classes.push(this.generateClass(dir));
    }
    return classes;
  });

  private generateClass(suffix: string): string {
    return generateClassName(CLASS_NAME, suffix);
  }
}
