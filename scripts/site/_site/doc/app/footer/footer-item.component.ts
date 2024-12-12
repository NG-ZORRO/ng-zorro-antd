import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-footer-item',
  imports: [NzIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [href]="link" target="_blank" rel="noopener">
      @if (icon || imgSrc) {
        <span class="rc-footer-item-icon">
          @if (icon) {
            <nz-icon [nzType]="icon" />
          } @else {
            <img [src]="imgSrc" [attr.alt]="imgAlt" />
          }
        </span>
      }
      {{ title }}
      <ng-content></ng-content>
    </a>
    @if (description) {
      <span class="rc-footer-item-separator">-</span>
      <span class="rc-footer-item-description">{{ description }}</span>
    }
  `,
  host: {
    class: 'rc-footer-item'
  },
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class FooterItemComponent {
  @Input() imgSrc!: string;
  @Input() imgAlt!: string;
  @Input() icon!: string;
  @Input() link!: string;
  @Input() title!: string;
  @Input() description!: string;
}
