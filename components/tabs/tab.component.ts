/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';

import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';

import { NzTabLinkDirective } from './tab-link.directive';
import { NzTabDirective } from './tab.directive';

@Component({
  selector: 'nz-tab',
  exportAs: 'nzTab',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #titleTpl>
      <ng-content select="[nz-tab-link]"></ng-content>
    </ng-template>
    <ng-template #bodyTpl>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class NzTabComponent implements OnChanges, OnDestroy {
  static ngAcceptInputType_nzForceRender: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;

  position: number | null = null;
  origin: number | null = null;
  isActive = false;
  readonly stateChanges = new Subject<void>();
  @ViewChild('bodyTpl', { static: true }) content!: TemplateRef<void>;
  @ViewChild('titleTpl', { static: true }) title!: TemplateRef<void>;
  @ContentChild(NzTabDirective, { static: false, read: TemplateRef }) template!: TemplateRef<void>;
  @ContentChild(NzTabLinkDirective, { static: false }) linkDirective!: NzTabLinkDirective;
  @Input() nzTitle?: string | TemplateRef<void>;
  @Input() nzRouterIdentifier?: string;
  @Input() @InputBoolean() nzForceRender = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Output() readonly nzClick = new EventEmitter<void>();
  @Output() readonly nzSelect = new EventEmitter<void>();
  @Output() readonly nzDeselect = new EventEmitter<void>();

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-tabs-tabpane');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzTitle || changes.nzForceRender || changes.nzDisabled) {
      this.stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
}
