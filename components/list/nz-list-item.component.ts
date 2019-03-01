import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList, Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzListItemMetaComponent } from './nz-list-item-meta.component';

@Component({
  selector           : 'nz-list-item',
  templateUrl        : './nz-list-item.component.html',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush
})
export class NzListItemComponent {
  @ContentChildren(NzListItemMetaComponent) metas !: QueryList<NzListItemMetaComponent>;
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzContent: string | TemplateRef<void>;
  @Input() nzExtra: TemplateRef<void>;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-list-item');
  }
}
