import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-footer-item',
  imports: [NzIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (link()) {
      <a [attr.href]="link()" target="_blank" rel="noopener">
        @if (icon()) {
          <nz-icon [nzType]="icon()!" class="rc-footer-item-icon" />
        }
        {{ title() }}
      </a>
    }
    @if (description()) {
      <span class="rc-footer-item-separator">-</span>
      <span class="rc-footer-item-description">{{ description() }}</span>
    }
    <ng-content></ng-content>
  `,
  host: {
    class: 'rc-footer-item',
    '[style.display]': '"block"'
  }
})
export class FooterItemComponent {
  icon = input<string>();
  link = input<string>();
  title = input<string>();
  description = input<string>();
}
