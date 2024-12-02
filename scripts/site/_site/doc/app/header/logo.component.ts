import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a href="/" id="logo">
      <img width="32" height="28.27" alt="logo" src="./assets/img/logo.svg"/>
      <strong>NG-ZORRO</strong>
    </a>
  `,
  styles: [
    `
      #logo strong {
        font-weight: 500;
      }
    `
  ]
})
export class LogoComponent {}
