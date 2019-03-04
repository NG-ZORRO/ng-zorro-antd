import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector           : 'nz-card-meta',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-card-meta.component.html',
  styles             : [ `
    nz-card-meta {
      display: block;
    }
  ` ]
})
export class NzCardMetaComponent {
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzDescription: string | TemplateRef<void>;
  @Input() nzAvatar: TemplateRef<void>;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-card-meta');
  }
}
