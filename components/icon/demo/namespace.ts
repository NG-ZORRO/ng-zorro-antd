import { Component } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd';

const ngZorroIconLiteral = '<svg viewBox="0 0 191.51 200.02"><defs><style>.cls-1{fill:url(#gradient);}.cls-2{fill:url(#gradient_2);}.cls-3{fill:url(#gradient_3);}.cls-4{fill:url(#gradient_4);}</style><linearGradient id="gradient" x1="-707.73" y1="-878.65" x2="-708.33" y2="-876.24" gradientTransform="translate(37930.58 45419.66) scale(53.42 51.67)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fa8e7d"/><stop offset="0.51" stop-color="#f74a5c"/><stop offset="1" stop-color="#f51d2c"/></linearGradient><linearGradient id="gradient_2" x1="-705.58" y1="-878.66" x2="-705.71" y2="-876.05" gradientTransform="translate(32954.36 51169) scale(46.48 58.25)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fa816e"/><stop offset="0.41" stop-color="#f74a5c"/><stop offset="1" stop-color="#f51d2c"/></linearGradient><linearGradient id="gradient_3" x1="-716.36" y1="-876.62" x2="-715.52" y2="-876.95" gradientTransform="translate(81756.69 109702) scale(114.08 125)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4285eb"/><stop offset="1" stop-color="#2ec7ff"/></linearGradient><linearGradient id="gradient_4" x1="-716.42" y1="-877.48" x2="-715.45" y2="-876.08" gradientTransform="translate(81756.69 97845.48) scale(114.08 111.47)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#29cdff"/><stop offset="0.38" stop-color="#148eff"/><stop offset="1" stop-color="#0a60ff"/></linearGradient></defs><title>ng-icon</title><path class="cls-1" d="M122.4,121.6l-4.4-10H80.7l-4.4,10.3a34,34,0,0,1-4.4,8.1c-1.2,1.3-3.2,2.1-6,2.1a9.78,9.78,0,0,1-6.3-2.3,6.27,6.27,0,0,1-2.7-5.1,9.28,9.28,0,0,1,.7-3.3c.4-1,1.1-2.8,2.1-4.8L83.2,64.7c.7-1.5,1.5-3.3,2.4-5.3a21,21,0,0,1,3.1-5.2A12,12,0,0,1,93,50.9a15.17,15.17,0,0,1,6.4-1.3,14.22,14.22,0,0,1,6.5,1.3,13,13,0,0,1,4.3,3.3,17.94,17.94,0,0,1,2.7,4.4c.7,1.6,1.6,3.6,2.8,6.1l24,51.6c1.9,3.9,2.8,6.8,2.8,8.5a6.55,6.55,0,0,1-2.7,5.1,9,9,0,0,1-6.4,2.3,9.75,9.75,0,0,1-3.7-.7,7.36,7.36,0,0,1-2.7-1.9,17.34,17.34,0,0,1-2.3-3.6,27.11,27.11,0,0,1-2.3-4.4ZM85.5,99.3H113L99.1,66.4Z" transform="translate(-3.87 -0.08)"/><path class="cls-2" d="M181.1,27.7l-45-16.18a10.24,10.24,0,0,0-4.5-.72c-4.91.36-10.7,4.64-10.7,10.7a10.7,10.7,0,0,0,7.3,10.1l45.7,16.3-4.77,42.32a11.26,11.26,0,0,0,0,3.13c.66,4.35,4.3,10.57,10.44,10.76,5.67.17,9.56-5.13,10.87-8.79a12.49,12.49,0,0,0,.71-3.56L195.3,50.1a21.85,21.85,0,0,0-14.2-22.4Z" transform="translate(-3.87 -0.08)"/><path class="cls-3" d="M186.3,132a10.24,10.24,0,0,0,0-2.6c-.59-4.57-4.62-10.71-10.7-10.7-6.27,0-9.94,6.56-10.7,10.7a11.05,11.05,0,0,0-.18,1.66l-1.22,14-64,33.5-64-33.5L25.1,47.8,98.9,21.61c.32-.12,1.32-.43,1.5-.47,5.19-1.92,8.37-5.6,8.4-10.34,0-6.14-5.87-10.3-10.7-10.7a14.6,14.6,0,0,0-4.51.67L18,27.8A21.19,21.19,0,0,0,4,50.2l10.4,97.3a21.45,21.45,0,0,0,11.3,16.7l64,33.5a21.41,21.41,0,0,0,19.7,0l64-33.5a21.53,21.53,0,0,0,11.3-16.7l1.6-14.9Z" transform="translate(-3.87 -0.08)"/><path class="cls-4" d="M186.44,132a14.11,14.11,0,0,0-.14-2.58,13.89,13.89,0,0,0-2.25-5.87c-.35-.49-3.56-4.84-8.45-4.83-5.76,0-9.86,6.08-10.7,10.7a15.33,15.33,0,0,0-.18,1.94c-.21,3.28-.58,7.91-1.22,13.76l-64,33.5-64-33.5L25.1,47.8c-1.1-10.9,2.3-19.6,10-26.1l-17,6.1a21.19,21.19,0,0,0-14,22.4l10.4,97.3a21.45,21.45,0,0,0,11.3,16.7l64,33.5a21.41,21.41,0,0,0,19.7,0l64-33.5a21.53,21.53,0,0,0,11.3-16.7Z" transform="translate(-3.87 -0.08)"/></svg>';

@Component({
  selector: 'nz-demo-icon-namespace',
  template: `
    <div class="icons-list">
      <i nz-icon type="ng-zorro:antd"></i>
    </div>
  `,
  styles: [ `
    [nz-icon] {
      margin-right: 6px;
      font-size: 24px;
    }
  ` ]
})
export class NzDemoIconNamespaceComponent {
  constructor(private _iconService: NzIconService) {
    this._iconService.addIconLiteral('ng-zorro:antd', ngZorroIconLiteral);
  }
}
