import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from '../core/util/convert';
import { NzCardTabComponent } from './nz-card-tab.component';

@Component({
  selector: 'nz-card',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-card.component.html',
  styles: [
    `
      nz-card {
        display: block;
      }
    `
  ],
  host: {
    '[class.ant-card-loading]': 'nzLoading',
    '[class.ant-card-bordered]': 'nzBordered',
    '[class.ant-card-hoverable]': 'nzHoverable',
    '[class.ant-card-type-inner]': `nzType === 'inner'`,
    '[class.ant-card-contain-tabs]': '!!tab'
  }
})
export class NzCardComponent {
  @Input() @InputBoolean() nzBordered = true;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzHoverable = false;
  @Input() nzBodyStyle: { [key: string]: string };
  @Input() nzCover: TemplateRef<void>;
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzType: string;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzExtra: string | TemplateRef<void>;
  @ContentChild(NzCardTabComponent) tab: NzCardTabComponent;

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-card');
  }
}
