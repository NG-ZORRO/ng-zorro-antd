import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'div[app-footer-col]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>
      @if (imgSrc) {
        <span class="rc-footer-column-icon">
          <img [src]="imgSrc" [attr.alt]="imgAlt" />
        </span>
      }
      {{ title }}
    </h2>
    <ng-content></ng-content>
  `,
  host: {
    class: 'rc-footer-column'
  }
})
export class FooterColComponent {
  @Input() title!: string;
  @Input() imgSrc!: string;
  @Input() imgAlt!: string;
}
