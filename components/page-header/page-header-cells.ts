/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

@Directive({
  selector: 'nz-page-header-title, [nz-page-header-title]',
  exportAs: 'nzPageHeaderTitle',
  host: {
    class: 'ant-page-header-heading-title'
  }
})
export class NzPageHeaderTitleDirective {}

@Directive({
  selector: 'nz-page-header-subtitle, [nz-page-header-subtitle]',
  exportAs: 'nzPageHeaderSubtitle',
  host: {
    class: 'ant-page-header-heading-sub-title'
  }
})
export class NzPageHeaderSubtitleDirective {}

@Directive({
  selector: 'nz-page-header-content, [nz-page-header-content]',
  exportAs: 'nzPageHeaderContent',
  host: {
    class: 'ant-page-header-content'
  }
})
export class NzPageHeaderContentDirective {}

@Directive({
  selector: 'nz-page-header-tags, [nz-page-header-tags]',
  exportAs: 'nzPageHeaderTags',
  host: {
    class: 'ant-page-header-heading-tags'
  }
})
export class NzPageHeaderTagDirective {}

@Directive({
  selector: 'nz-page-header-extra, [nz-page-header-extra]',
  exportAs: 'nzPageHeaderExtra',
  host: {
    class: 'ant-page-header-heading-extra'
  }
})
export class NzPageHeaderExtraDirective {}

@Directive({
  selector: 'nz-page-header-footer, [nz-page-header-footer]',
  exportAs: 'nzPageHeaderFooter',
  host: {
    class: 'ant-page-header-footer'
  }
})
export class NzPageHeaderFooterDirective {}

@Directive({
  selector: 'nz-breadcrumb[nz-page-header-breadcrumb]',
  exportAs: 'nzPageHeaderBreadcrumb'
})
export class NzPageHeaderBreadcrumbDirective {}

@Directive({
  selector: 'nz-avatar[nz-page-header-avatar]',
  exportAs: 'nzPageHeaderAvatar'
})
export class NzPageHeaderAvatarDirective {}
