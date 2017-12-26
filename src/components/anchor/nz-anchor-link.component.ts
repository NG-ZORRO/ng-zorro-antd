import {
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { NzAnchorComponent } from './nz-anchor.component';

@Component({
  selector: 'nz-link',
  encapsulation: ViewEncapsulation.None,
  template: `
    <a (click)="goToClick($event)" href="{{nzHref}}" class="ant-anchor-link-title">
      <span *ngIf="!nzTemplate">{{ nzTitle }}</span>
      <ng-template *ngIf="nzTemplate" [ngTemplateOutlet]="nzTemplate"></ng-template>
    </a>
    <ng-content></ng-content>
  `,
  host: {
    '[class.ant-anchor-link]': 'true'
  }
})
export class NzAnchorLinkComponent {

  @Input() nzHref: string;

  @Input() nzTitle: string;

  @ContentChild('nzTemplate') nzTemplate: TemplateRef<void>;

  @HostBinding('class.ant-anchor-link-active') active: boolean = false;

  @HostListener('click')
  _onClick(): void {
    this._anchorComp.scrollTo(this);
  }

  constructor(public el: ElementRef, private _anchorComp: NzAnchorComponent) {
    this._anchorComp.add(this);
  }

  goToClick(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this._anchorComp.scrollTo(this);
    // return false;
  }
}
