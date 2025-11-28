import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';

@Component({
  selector: 'div[app-footer-col]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>{{ title() }}</h2>
    <ng-content></ng-content>
  `,
  host: {
    class: 'rc-footer-column'
  }
})
export class FooterColComponent {
  title = input<string>();
}
