/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NZ_EMPTY_COMPONENT_NAME, NzEmptyCustomContent, NzEmptySize } from './config';
import { NzEmptyComponent } from './empty.component';
import { AnimationDuration } from 'ng-zorro-antd/core/animation';

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
        <ng-container #dynamicContent></ng-container>
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
  imports: [NzEmptyComponent]
})
export class NzEmbedEmptyComponent implements OnChanges, OnInit, OnDestroy {
  @Input() nzComponentName?: string;
  @Input() specificContent?: NzEmptyCustomContent;

  @ViewChild('dynamicContent', { read: ViewContainerRef, static: true })
  dynamicContentRef!: ViewContainerRef;

  content?: NzEmptyCustomContent;
  contentType: NzEmptyContentType = 'string';
  size: NzEmptySize = '';

  private destroy$ = new Subject<void>();
  private embeddedContentRef: any;

  constructor(
    private configService: NzConfigService,
    private cdr: ChangeDetectorRef,
    private injector: Injector
  ) {}

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
    this.subscribeDefaultEmptyContentChange();
  }

  ngOnDestroy(): void {
    this.destroyEmbeddedContent();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private renderEmpty(): void {
    this.destroyEmbeddedContent(true);

    const content = this.content;

    if (typeof content === 'string') {
      this.contentType = 'string';
    } else if (content instanceof TemplateRef) {
      this.contentType = 'template';
      this.embeddedContentRef = this.dynamicContentRef.createEmbeddedView(content, {
        $implicit: this.nzComponentName
      });
    } else if (content instanceof Type) {
      this.contentType = 'component';
      this.embeddedContentRef = this.dynamicContentRef.createComponent(content, {
        injector: Injector.create({
          parent: this.injector,
          providers: [{ provide: NZ_EMPTY_COMPONENT_NAME, useValue: this.nzComponentName }]
        })
      });
    } else {
      this.contentType = 'string';
    }

    this.cdr.detectChanges();
  }

  private subscribeDefaultEmptyContentChange(): void {
    this.configService
      .getConfigChangeEventForComponent('empty')
      .pipe(startWith(true), takeUntil(this.destroy$))
      .subscribe(() => {
        this.content = this.specificContent || this.getUserDefaultEmptyContent();
        this.renderEmpty();
      });
  }

  private getUserDefaultEmptyContent(): Type<NzSafeAny> | TemplateRef<string> | string | undefined {
    return (this.configService.getConfigForComponent('empty') || {}).nzDefaultEmptyContent;
  }
  /**
   * 手动销毁嵌入的内容，以控制销毁顺序
   */
  private destroyEmbeddedContent(immediately: boolean = false): void {
    if (this.embeddedContentRef) {
      if (immediately) {
        this.embeddedContentRef.destroy();
        this.embeddedContentRef = null;
      } else {
        setTimeout(() => {
          this.embeddedContentRef.destroy();
          this.embeddedContentRef = null;
        }, (parseFloat(AnimationDuration.SLOW) || 0) * 1000);
      }
    }
  }
}
