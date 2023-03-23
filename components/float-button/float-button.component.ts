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

import { NzDestroyService } from 'ng-zorro-antd/core/services';

@Component({
  selector: 'nz-float-button',
  exportAs: 'nzFloatButton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="!!nzHref; else buttonTemplate">
      <a
        [target]="nzTarget"
        [href]="nzHref"
        nz-button
        [nzType]="nzType"
        [class.ant-float-btn-default]="nzType === 'default'"
        class="ant-float-btn-inner"
        (click)="nzOnClick.emit()"
      >
        <nz-float-button-content
          [nzIcon]="nzIcon"
          [nzDescription]="nzDescription"
          [nzShape]="nzShape"
        ></nz-float-button-content>
      </a>
    </ng-container>
    <ng-template #buttonTemplate>
      <button
        nz-button
        [nzType]="nzType"
        [class.ant-float-btn-default]="nzType === 'default'"
        class="ant-float-btn-inner"
        (click)="nzOnClick.emit()"
      >
        <nz-float-button-content
          [nzIcon]="nzIcon"
          [nzDescription]="nzDescription"
          [nzShape]="nzShape"
        ></nz-float-button-content>
      </button>
    </ng-template>
  `,
  host: {
    class: 'ant-float-btn',
    '[class.ant-float-btn-circle]': `nzShape === 'circle'`,
    '[class.ant-float-btn-square]': `nzShape === 'square'`,
    '[class.ant-float-btn-rtl]': `dir === 'rtl'`
  },
  providers: [NzDestroyService]
})
export class NzFloatButtonComponent implements OnInit {
  @Input() nzHref: string | null = null;
  @Input() nzTarget: string | null = null;
  @Input() nzType: 'default' | 'primary' = 'default';
  @Input() nzShape: 'circle' | 'square' = 'circle';
  @Input() nzIcon: TemplateRef<void> | null = null;
  @Input() nzDescription: TemplateRef<void> | null = null;
  @Output() readonly nzOnClick = new EventEmitter<void>();
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
}
