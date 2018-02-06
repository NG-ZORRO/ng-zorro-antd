// tslint:disable:no-any
import {
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';

import { NzAnchorComponent } from './nz-anchor.component';

@Component({
  selector           : 'nz-link',
  preserveWhitespaces: false,
  template           : `
    <a (click)="goToClick($event)" href="{{nzHref}}" class="ant-anchor-link-title">
      <span *ngIf="_title; else (_titleTpl || nzTemplate)">{{ _title }}</span>
    </a>
    <ng-content></ng-content>
  `,
  host               : {
    '[class.ant-anchor-link]': 'true',
    'style'                  : 'display:block'
  }
})
export class NzAnchorLinkComponent implements OnInit, OnDestroy {

  @Input() nzHref = '#';

  _title = '';
  _titleTpl: TemplateRef<any>;
  isTitleString = true;
  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this._titleTpl = value;
    } else {
      this._title = value;
    }
  }

  @ContentChild('nzTemplate') nzTemplate: TemplateRef<void>;

  @HostBinding('class.ant-anchor-link-active') active: boolean = false;

  constructor(public el: ElementRef, private _anchorComp: NzAnchorComponent) {
  }

  ngOnInit(): void {
    this._anchorComp.registerLink(this);
  }

  goToClick(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this._anchorComp.handleScrollTo(this);
  }

  ngOnDestroy(): void {
    this._anchorComp.unregisterLink(this);
  }

}
