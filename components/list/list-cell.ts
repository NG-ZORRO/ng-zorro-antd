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
  template: ` <nz-embed-empty [nzComponentName]="'list'" [specificContent]="nzNoResult"></nz-embed-empty> `,
  host: {
    class: 'ant-list-empty-text'
  },
  imports: [NzEmptyModule],
  standalone: true
})
export class NzListEmptyComponent {
  @Input() nzNoResult?: string | TemplateRef<void>;
}

@Component({
  selector: 'nz-list-header',
  exportAs: 'nzListHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'ant-list-header'
  },
  standalone: true
})
export class NzListHeaderComponent {}

@Component({
  selector: 'nz-list-footer',
  exportAs: 'nzListFooter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'ant-list-footer'
  },
  standalone: true
})
export class NzListFooterComponent {}

@Component({
  selector: 'nz-list-pagination',
  exportAs: 'nzListPagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'ant-list-pagination'
  },
  standalone: true
})
export class NzListPaginationComponent {}

@Directive({
  selector: 'nz-list-load-more',
  exportAs: 'nzListLoadMoreDirective',
  standalone: true
})
export class NzListLoadMoreDirective {}

@Directive({
  selector: 'nz-list[nzGrid]',
  host: {
    class: 'ant-list-grid'
  },
  standalone: true
})
export class NzListGridDirective {}
