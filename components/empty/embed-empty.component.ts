/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ComponentPortal, Portal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

import { NzConfigService, onConfigChangeEventForComponent } from 'ng-zorro-antd/core/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NZ_EMPTY_COMPONENT_NAME, NzEmptyCustomContent, NzEmptySize } from './config';
import { NzEmptyComponent } from './empty.component';

function getEmptySize(componentName: string): NzEmptySize {
  switch (componentName) {
    case 'table':
    case 'list':
      return 'normal';
    case 'select':
    case 'tree-select':
    case 'cascader':
    case 'transfer':
      return 'small';
    default:
      return '';
  }
}

type NzEmptyContentType = 'component' | 'template' | 'string';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-embed-empty',
  exportAs: 'nzEmbedEmpty',
  template: `
    @if (content) {
      @if (contentType === 'string') {
        {{ content }}
      } @else {
        <ng-template [cdkPortalOutlet]="contentPortal" />
      }
    } @else {
      @if (specificContent !== null) {
        @switch (size) {
          @case ('normal') {
            <nz-empty class="ant-empty-normal" nzNotFoundImage="simple" />
          }
          @case ('small') {
            <nz-empty class="ant-empty-small" nzNotFoundImage="simple" />
          }
          @default {
            <nz-empty />
          }
        }
      }
    }
  `,
  imports: [NzEmptyComponent, PortalModule]
})
export class NzEmbedEmptyComponent implements OnChanges, OnInit {
  private configService = inject(NzConfigService);
  private viewContainerRef = inject(ViewContainerRef);
  private cdr = inject(ChangeDetectorRef);
  private injector = inject(Injector);

  @Input() nzComponentName?: string;
  @Input() specificContent?: NzEmptyCustomContent;

  content?: NzEmptyCustomContent;
  contentType: NzEmptyContentType = 'string';
  contentPortal?: Portal<NzSafeAny>;
  size: NzEmptySize = '';

  constructor() {
    onConfigChangeEventForComponent('empty', () => {
      this.content = this.specificContent || this.getUserDefaultEmptyContent();
      this.renderEmpty();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzComponentName) {
      this.size = getEmptySize(changes.nzComponentName.currentValue);
    }

    if (changes.specificContent && !changes.specificContent.isFirstChange()) {
      this.content = changes.specificContent.currentValue;
      this.renderEmpty();
    }
  }

  ngOnInit(): void {
    this.content = this.specificContent || this.getUserDefaultEmptyContent();
    this.renderEmpty();
  }

  private renderEmpty(): void {
    const content = this.content;

    if (typeof content === 'string') {
      this.contentType = 'string';
    } else if (content instanceof TemplateRef) {
      const context = { $implicit: this.nzComponentName } as NzSafeAny;
      this.contentType = 'template';
      this.contentPortal = new TemplatePortal(content, this.viewContainerRef, context);
    } else if (content instanceof Type) {
      const injector = Injector.create({
        parent: this.injector,
        providers: [{ provide: NZ_EMPTY_COMPONENT_NAME, useValue: this.nzComponentName }]
      });
      this.contentType = 'component';
      this.contentPortal = new ComponentPortal(content, this.viewContainerRef, injector);
    } else {
      this.contentType = 'string';
      this.contentPortal = undefined;
    }

    this.cdr.detectChanges();
  }

  private getUserDefaultEmptyContent(): Type<NzSafeAny> | TemplateRef<string> | string | undefined {
    return (this.configService.getConfigForComponent('empty') || {}).nzDefaultEmptyContent;
  }
}
