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
  selector           : 'nz-list-item-meta',
  templateUrl        : './nz-list-item-meta.component.html',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None
})
export class NzListItemMetaComponent {

  avatarStr = '';
  avatarTpl: TemplateRef<void>;

  @Input()
  set nzAvatar(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.avatarStr = '';
      this.avatarTpl = value;
    } else {
      this.avatarStr = value;
    }
  }

  @Input() nzTitle: string | TemplateRef<void>;

  @Input() nzDescription: string | TemplateRef<void>;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-list-item-meta');
  }
}
