/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Injector,
  Optional,
  Renderer2,
  Self,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {
  slideMotion,
  NzDropdownHigherOrderServiceToken,
  NzMenuBaseService,
  NzNoAnimationDirective
} from 'ng-zorro-antd/core';

import { Subject } from 'rxjs';
import { NzMenuDropdownService } from './nz-menu-dropdown.service';

export type NzPlacementType = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';

export function dropdownMenuServiceFactory(injector: Injector): NzMenuBaseService {
  return injector.get(NzMenuDropdownService);
}

@Component({
  selector: `nz-dropdown-menu`,
  templateUrl: './nz-dropdown-menu.component.html',
  exportAs: `nzDropdownMenu`,
  animations: [slideMotion],
  providers: [
    NzMenuDropdownService,
    {
      provide: NzDropdownHigherOrderServiceToken,
      useFactory: dropdownMenuServiceFactory,
      deps: [[new Self(), Injector]]
    }
  ],
  styles: [
    `
      :root .ant-dropdown.nz-dropdown {
        top: 0;
        left: 0;
        position: relative;
        width: 100%;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    `
  ],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzDropdownMenuComponent implements AfterContentInit {
  open = false;
  triggerWidth = 0;
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  visible$ = new Subject<boolean>();
  nzTrigger: 'click' | 'hover' = 'hover';
  nzPlacement: NzPlacementType = 'bottomLeft';
  nzOverlayClassName = '';
  nzOverlayStyle: { [key: string]: string } = {};
  nzTableFilter = false;
  // tslint:disable-next-line:no-any
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  setVisibleStateWhen(visible: boolean, trigger: 'click' | 'hover' | 'all' = 'all'): void {
    if (this.nzTrigger === trigger || trigger === 'all') {
      this.visible$.next(visible);
    }
  }

  setValue<T extends keyof NzDropdownMenuComponent>(key: T, value: this[T]): void {
    this[key] = value;
    this.cdr.markForCheck();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public viewContainerRef: ViewContainerRef,
    public nzMenuDropdownService: NzMenuDropdownService,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}

  ngAfterContentInit(): void {
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
  }
}
