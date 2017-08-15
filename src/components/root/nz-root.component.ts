import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector     : '[nz-root],nz-root',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  styleUrls    : [
    '../style/index.less',
    './style/index.less',
  ]
})
export class NzRootComponent implements OnInit {

  // Extra font definition
  @Input() nzExtraFontName: string;
  @Input() nzExtraFontUrl: string;

  constructor(@Inject(DOCUMENT) private _document: Document) { }

  ngOnInit() {
    if (this.nzExtraFontName && this.nzExtraFontUrl) {
      const style = this._document.createElement('style');
      style.innerHTML = `
        @font-face {
          font-family: '${this.nzExtraFontName}';
          src: url('${this.nzExtraFontUrl}.eot'); /* IE9*/
          src:
            /* IE6-IE8 */
            url('${this.nzExtraFontUrl}.eot?#iefix') format('embedded-opentype'),
            /* chrome、firefox */
            url('${this.nzExtraFontUrl}.woff') format('woff'),
            /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
            url('${this.nzExtraFontUrl}.ttf') format('truetype'),
            /* iOS 4.1- */
            url('${this.nzExtraFontUrl}.svg#iconfont') format('svg');
        }
      `;
      this._document.head.appendChild(style);
    }
  }
}
