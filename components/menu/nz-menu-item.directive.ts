import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { merge, EMPTY, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { isNotNil } from '../core/util';

import { InputBoolean } from '../core/util/convert';
import { NzMenuService } from './nz-menu.service';
import { NzSubmenuService } from './nz-submenu.service';

@Directive({
  selector : '[nz-menu-item]',
  providers: [ NzUpdateHostClassService ],
  host     : {
    '(click)': 'clickMenuItem($event)'
  }
})
export class NzMenuItemDirective implements OnInit, OnChanges, OnDestroy {
  private el: HTMLElement = this.elementRef.nativeElement;
  private destroy$ = new Subject();
  private originalPadding: number | null = null;
  selected$ = new Subject<boolean>();
  @Input() nzPaddingLeft: number;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzSelected = false;

  /** clear all item selected status except this */
  clickMenuItem(e: MouseEvent): void {
    if (this.nzDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.nzMenuService.onMenuItemClick(this);
    if (this.nzSubmenuService) {
      this.nzSubmenuService.onMenuItemClick();
    }
  }

  setClassMap(): void {
    const prefixName = this.nzMenuService.isInDropDown ? 'ant-dropdown-menu-item' : 'ant-menu-item';
    this.nzUpdateHostClassService.updateHostClass(this.el, {
      [ `${prefixName}` ]         : true,
      [ `${prefixName}-selected` ]: this.nzSelected,
      [ `${prefixName}-disabled` ]: this.nzDisabled
    });
  }

  setSelectedState(value: boolean): void {
    this.nzSelected = value;
    this.selected$.next(value);
    this.setClassMap();
  }

  constructor(private nzUpdateHostClassService: NzUpdateHostClassService,
              private nzMenuService: NzMenuService,
              @Optional() private nzSubmenuService: NzSubmenuService,
              private renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    /** store origin padding in padding */
    const paddingLeft = this.el.style.paddingLeft;
    if (paddingLeft) {
      this.originalPadding = parseInt(paddingLeft, 10);
    }
    merge(
      this.nzMenuService.mode$,
      this.nzMenuService.inlineIndent$,
      this.nzSubmenuService ? this.nzSubmenuService.level$ : EMPTY
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      let padding: number | null = null;
      if (this.nzMenuService.mode === 'inline') {
        if (isNotNil(this.nzPaddingLeft)) {
          padding = this.nzPaddingLeft;
        } else {
          const level = this.nzSubmenuService ? this.nzSubmenuService.level + 1 : 1;
          padding = level * this.nzMenuService.inlineIndent;
        }
      } else {
        padding = this.originalPadding;
      }
      if (padding) {
        this.renderer.setStyle(this.el, 'padding-left', `${padding}px`);
      } else {
        this.renderer.removeStyle(this.el, 'padding-left');
      }
    });
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzSelected) {
      this.setSelectedState(this.nzSelected);
    }
    if (changes.nzDisabled) {
      this.setClassMap();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
