/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ComponentPortal, Portal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
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
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { simpleEmptyImage, NzEmptyCustomContent, NzEmptySize, NZ_EMPTY_COMPONENT_NAME } from './nz-empty-config';
import { NzEmptyService } from './nz-empty.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-embed-empty',
  exportAs: 'nzEmbedEmpty',
  templateUrl: './nz-embed-empty.component.html'
})
export class NzEmbedEmptyComponent implements OnChanges, OnInit, OnDestroy {
  @Input() nzComponentName: string;
  @Input() specificContent: NzEmptyCustomContent;

  content?: NzEmptyCustomContent;
  contentType: 'component' | 'template' | 'string' = 'string';
  contentPortal?: Portal<any>; // tslint:disable-line:no-any
  defaultSvg = this.sanitizer.bypassSecurityTrustResourceUrl(simpleEmptyImage);
  size: NzEmptySize = '';
  subs_ = new Subscription();

  constructor(
    public emptyService: NzEmptyService,
    private sanitizer: DomSanitizer,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private injector: Injector
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzComponentName) {
      this.size = this.getEmptySize(changes.nzComponentName.currentValue);
    }

    if (changes.specificContent && !changes.specificContent.isFirstChange()) {
      this.content = changes.specificContent.currentValue;
      this.renderEmpty();
    }
  }

  ngOnInit(): void {
    const userContent_ = this.emptyService.userDefaultContent$.subscribe(content => {
      this.content = this.specificContent || content;
      this.renderEmpty();
    });

    this.subs_.add(userContent_);
  }

  ngOnDestroy(): void {
    this.subs_.unsubscribe();
  }

  private getEmptySize(componentName: string): NzEmptySize {
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

  private renderEmpty(): void {
    const content = this.content;

    if (typeof content === 'string') {
      this.contentType = 'string';
    } else if (content instanceof TemplateRef) {
      const context = { $implicit: this.nzComponentName } as any; // tslint:disable-line:no-any
      this.contentType = 'template';
      this.contentPortal = new TemplatePortal(content, this.viewContainerRef, context);
    } else if (content instanceof Type) {
      const context = new WeakMap([[NZ_EMPTY_COMPONENT_NAME, this.nzComponentName]]);
      const injector = new PortalInjector(this.injector, context);
      this.contentType = 'component';
      this.contentPortal = new ComponentPortal(content, this.viewContainerRef, injector);
    } else {
      this.contentType = 'string';
      this.contentPortal = undefined;
    }

    this.cdr.markForCheck();
  }
}
