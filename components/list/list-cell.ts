/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Directive, Input, TemplateRef } from '@angular/core';

import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'nz-list-empty',
  exportAs: 'nzListHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<nz-embed-empty nzComponentName="list" [specificContent]="nzNoResult" />`,
  host: {
    class: 'ant-list-empty-text'
  },
  imports: [NzEmptyModule]
})
export class NzListEmptyComponent {
  @Input() nzNoResult?: string | TemplateRef<void>;
}

@Component({
  selector: 'nz-list-header',
  exportAs: 'nzListHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    class: 'ant-list-header'
  }
})
export class NzListHeaderComponent {}

@Component({
  selector: 'nz-list-footer',
  exportAs: 'nzListFooter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    class: 'ant-list-footer'
  }
})
export class NzListFooterComponent {}

@Component({
  selector: 'nz-list-pagination',
  exportAs: 'nzListPagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    class: 'ant-list-pagination'
  }
})
export class NzListPaginationComponent {}

@Directive({
  selector: 'nz-list-load-more',
  exportAs: 'nzListLoadMoreDirective'
})
export class NzListLoadMoreDirective {}

@Directive({
  selector: 'nz-list[nzGrid]',
  host: {
    class: 'ant-list-grid'
  }
})
export class NzListGridDirective {}
