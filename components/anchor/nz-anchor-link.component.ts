import {
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef
} from '@angular/core';

import { NzAnchorComponent } from './nz-anchor.component';

@Component({
  selector           : 'nz-link',
  preserveWhitespaces: false,
  template           : `
    <a (click)="goToClick($event)" href="{{nzHref}}" class="ant-anchor-link-title" title="{{titleStr}}">
      <span *ngIf="titleStr; else (titleTpl || nzTemplate)">{{ titleStr }}</span>
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

  titleStr = '';
  titleTpl: TemplateRef<void>;
  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.titleTpl = value;
    } else {
      this.titleStr = value;
    }
  }

  @ContentChild('nzTemplate') nzTemplate: TemplateRef<void>;

  @HostBinding('class.ant-anchor-link-active') active: boolean = false;

  constructor(public el: ElementRef, private anchorComp: NzAnchorComponent) {
  }

  ngOnInit(): void {
    this.anchorComp.registerLink(this);
  }

  goToClick(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.anchorComp.handleScrollTo(this);
  }

  ngOnDestroy(): void {
    this.anchorComp.unregisterLink(this);
  }

}
