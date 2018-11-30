import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzAnchorComponent } from './nz-anchor.component';

@Component({
  selector           : 'nz-link',
  preserveWhitespaces: false,
  templateUrl        : './nz-anchor-link.component.html',
  host               : {
    '[class.ant-anchor-link]': 'true'
  },
  styles             : [ `
    nz-link {
      display: block;
    }
  ` ],
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush
})
export class NzAnchorLinkComponent implements OnInit, OnDestroy {

  @Input() nzHref = '#';

  titleStr = '';
  titleTpl: TemplateRef<void>;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.titleStr = null;
      this.titleTpl = value;
    } else {
      this.titleStr = value;
    }
  }

  @ContentChild('nzTemplate') nzTemplate: TemplateRef<void>;

  @HostBinding('class.ant-anchor-link-active') active: boolean = false;

  constructor(public el: ElementRef, private anchorComp: NzAnchorComponent, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.anchorComp.registerLink(this);
  }

  goToClick(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.anchorComp.handleScrollTo(this);
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.anchorComp.unregisterLink(this);
  }

}
