/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import {
  NzListItemMetaDescriptionComponent as DescriptionComponent,
  NzListItemMetaTitleComponent as TitleComponent
} from './list-item-meta-cell';

@Component({
  selector: 'nz-list-item-meta, [nz-list-item-meta]',
  exportAs: 'nzListItemMeta',
  template: `
    <!--Old API Start-->
    @if (avatarStr) {
      <nz-list-item-meta-avatar [nzSrc]="avatarStr"></nz-list-item-meta-avatar>
    }
    @if (avatarTpl) {
      <nz-list-item-meta-avatar>
        <ng-container [ngTemplateOutlet]="avatarTpl"></ng-container>
      </nz-list-item-meta-avatar>
    }
    <!--Old API End-->

    <ng-content select="nz-list-item-meta-avatar"></ng-content>

    @if (nzTitle || nzDescription || descriptionComponent || titleComponent) {
      <div class="ant-list-item-meta-content">
        <!--Old API Start-->
        @if (nzTitle && !titleComponent) {
          <nz-list-item-meta-title>
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </nz-list-item-meta-title>
        }
        @if (nzDescription && !descriptionComponent) {
          <nz-list-item-meta-description>
            <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
          </nz-list-item-meta-description>
        }
        <!--Old API End-->

        <ng-content select="nz-list-item-meta-title"></ng-content>
        <ng-content select="nz-list-item-meta-description"></ng-content>
      </div>
    }
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-list-item-meta'
  }
})
export class NzListItemMetaComponent {
  avatarStr = '';
  avatarTpl?: TemplateRef<void>;

  @Input()
  set nzAvatar(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.avatarStr = '';
      this.avatarTpl = value;
    } else {
      this.avatarStr = value;
    }
  }

  @Input() nzTitle?: string | TemplateRef<void>;

  @Input() nzDescription?: string | TemplateRef<void>;

  @ContentChild(DescriptionComponent) descriptionComponent?: DescriptionComponent;
  @ContentChild(TitleComponent) titleComponent?: TitleComponent;

  constructor(public elementRef: ElementRef) {}
}
