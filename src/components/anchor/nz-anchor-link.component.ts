import {
  Component,
  ViewEncapsulation,
  Input,
  TemplateRef,
  ContentChild,
  HostBinding,
  HostListener,
  ElementRef
} from '@angular/core';

import { NzAnchorComponent } from './nz-anchor.component';

@Component({
  selector: 'nz-link',
  encapsulation: ViewEncapsulation.None,
  template: `
    <a (click)="goToClick($event)" href="{{nzHref}}" class="ant-anchor-link-title">
      <span *ngIf="!nzTemplate">{{nzTitle}}</span>
      <ng-template *ngIf="nzTemplate" [ngTemplateOutlet]="nzTemplate"></ng-template>
    </a>
    <ng-content></ng-content>
  `
})
export class NzAnchorLinkComponent {

  @Input() nzHref: string;

  @Input() nzTitle: string;

  @ContentChild('nzTemplate') nzTemplate: TemplateRef<any>;

  @HostBinding('class.ant-anchor-link') _nzAnchorLink = true;

  @HostBinding('class.ant-anchor-link-active') active: boolean = false;

  @HostListener('click')
  _onClick() {
    this._anchorComp.scrollTo(this);
  }

  constructor(public el: ElementRef, private _anchorComp: NzAnchorComponent) {
    this._anchorComp.add(this);
  }

  goToClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this._anchorComp.scrollTo(this);
    // return false;
  }
}
