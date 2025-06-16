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

import { NzIsMenuInsideDropDownToken } from './menu.token';

export function MenuGroupFactory(): boolean {
  const isMenuInsideDropDownToken = inject(NzIsMenuInsideDropDownToken, { optional: true, skipSelf: true });
  return isMenuInsideDropDownToken ?? false;
}
@Component({
  selector: '[nz-menu-group]',
  exportAs: 'nzMenuGroup',
  providers: [
    /** check if menu inside dropdown-menu component **/
    {
      provide: NzIsMenuInsideDropDownToken,
      useFactory: MenuGroupFactory
    }
  ],
  template: `
    <div
      [class.ant-menu-item-group-title]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-item-group-title]="isMenuInsideDropDown"
      #titleElement
    >
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      @if (!nzTitle) {
        <ng-content select="[title]" />
      }
    </div>
    <ng-content></ng-content>
  `,
  imports: [NzOutletModule],
  host: {
    '[class.ant-menu-item-group]': '!isMenuInsideDropDown',
    '[class.ant-dropdown-menu-item-group]': 'isMenuInsideDropDown'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzMenuGroupComponent implements AfterViewInit {
  private readonly renderer = inject(Renderer2);
  protected readonly isMenuInsideDropDown = inject(NzIsMenuInsideDropDownToken);

  @Input() nzTitle?: string | TemplateRef<void>;
  @ViewChild('titleElement') titleElement?: ElementRef;

  ngAfterViewInit(): void {
    const ulElement = this.titleElement!.nativeElement.nextElementSibling;
    if (ulElement) {
      /** add classname to ul **/
      const className = this.isMenuInsideDropDown ? 'ant-dropdown-menu-item-group-list' : 'ant-menu-item-group-list';
      this.renderer.addClass(ulElement, className);
    }
  }
}
