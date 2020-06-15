/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  Optional,
  Renderer2,
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NzIsMenuInsideDropDownToken } from './menu.token';

export function MenuGroupFactory(isMenuInsideDropDownToken: boolean): boolean {
  return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}
@Component({
  selector: '[nz-menu-group]',
  exportAs: 'nzMenuGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    /** check if menu inside dropdown-menu component **/
    {
      provide: NzIsMenuInsideDropDownToken,
      useFactory: MenuGroupFactory,
      deps: [[new SkipSelf(), new Optional(), NzIsMenuInsideDropDownToken]]
    }
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      [class.ant-menu-item-group-title]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-item-group-title]="isMenuInsideDropDown"
      #titleElement
    >
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      <ng-content select="[title]" *ngIf="!nzTitle"></ng-content>
    </div>
    <ng-content></ng-content>
  `,
  preserveWhitespaces: false
})
export class NzMenuGroupComponent implements AfterViewInit {
  @Input() nzTitle?: string | TemplateRef<void>;
  @ViewChild('titleElement') titleElement?: ElementRef;

  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(NzIsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean
  ) {
    const className = this.isMenuInsideDropDown ? 'ant-dropdown-menu-item-group' : 'ant-menu-item-group';
    this.renderer.addClass(elementRef.nativeElement, className);
  }

  ngAfterViewInit(): void {
    const ulElement = this.titleElement!.nativeElement.nextElementSibling;
    if (ulElement) {
      /** add classname to ul **/
      const className = this.isMenuInsideDropDown ? 'ant-dropdown-menu-item-group-list' : 'ant-menu-item-group-list';
      this.renderer.addClass(ulElement, className);
    }
  }
}
