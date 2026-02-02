/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

import { NzIsMenuInsideDropdownToken } from './menu.token';

function MenuGroupFactory(): boolean {
  const isMenuInsideDropdownToken = inject(NzIsMenuInsideDropdownToken, { optional: true, skipSelf: true });
  return isMenuInsideDropdownToken ?? false;
}

@Component({
  selector: '[nz-menu-group]',
  exportAs: 'nzMenuGroup',
  providers: [
    /** check if menu inside dropdown-menu component **/
    {
      provide: NzIsMenuInsideDropdownToken,
      useFactory: MenuGroupFactory
    }
  ],
  template: `
    <div
      [class.ant-menu-item-group-title]="!isMenuInsideDropdown"
      [class.ant-dropdown-menu-item-group-title]="isMenuInsideDropdown"
      #titleElement
    >
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      @if (!nzTitle) {
        <ng-content select="[title]" />
      }
    </div>
    <ng-content />
  `,
  imports: [NzOutletModule],
  host: {
    '[class.ant-menu-item-group]': '!isMenuInsideDropdown',
    '[class.ant-dropdown-menu-item-group]': 'isMenuInsideDropdown'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzMenuGroupComponent implements AfterViewInit {
  private readonly renderer = inject(Renderer2);
  protected readonly isMenuInsideDropdown = inject(NzIsMenuInsideDropdownToken);

  @Input() nzTitle?: string | TemplateRef<void>;
  @ViewChild('titleElement') titleElement?: ElementRef;

  ngAfterViewInit(): void {
    const ulElement = this.titleElement!.nativeElement.nextElementSibling;
    if (ulElement) {
      /** add classname to ul **/
      const className = this.isMenuInsideDropdown ? 'ant-dropdown-menu-item-group-list' : 'ant-menu-item-group-list';
      this.renderer.addClass(ulElement, className);
    }
  }
}
