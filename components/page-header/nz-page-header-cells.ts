import { Directive } from '@angular/core';

@Directive({
  selector: 'nz-page-header-title, [nz-page-header-title]',
  host: {
    class: 'ant-page-header-title-view-title'
  }
})
export class NzPageHeaderTitleDirective {}

@Directive({
  selector: 'nz-page-header-subtitle, [nz-page-header-subtitle]',
  host: {
    class: 'ant-page-header-title-view-sub-title'
  }
})
export class NzPageHeaderSubtitleDirective {}

@Directive({
  selector: 'nz-page-header-content, [nz-page-header-content]',
  host: {
    class: 'ant-page-header-content-view'
  }
})
export class NzPageHeaderContentDirective {}

@Directive({
  selector: 'nz-page-header-tags, [nz-page-header-tags]',
  host: {
    class: 'ant-page-header-title-view-tags'
  }
})
export class NzPageHeaderTagDirective {}

@Directive({
  selector: 'nz-page-header-extra, [nz-page-header-extra]',
  host: {
    class: 'ant-page-header-title-view-extra'
  }
})
export class NzPageHeaderExtraDirective {}

@Directive({
  selector: 'nz-page-header-footer, [nz-page-header-footer]',
  host: {
    class: 'ant-page-header-footer'
  }
})
export class NzPageHeaderFooterDirective {}

@Directive({
  selector: 'nz-breadcrumb[nz-page-header-breadcrumb]'
})
export class NzPageHeaderBreadcrumbDirective {}
