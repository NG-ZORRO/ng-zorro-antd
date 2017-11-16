import {
  Component,
  Input,
  OnInit,
  Inject,
  Optional,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NZ_ROOT_CONFIG, NzRootConfig, createNzRootInitializer} from './nz-root-config';

@Component({
  selector : '[nz-root],nz-root',
  template : `
    <ng-content></ng-content>
  `,
})
export class NzRootComponent implements OnInit {

  // Extra font definition
  @Input() nzExtraFontName: string;
  @Input() nzExtraFontUrl: string;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    // Cannot use type annotation here due to https://github.com/angular/angular-cli/issues/2034
    // Should be revisited after AOT being made the only option
    @Inject(NZ_ROOT_CONFIG) @Optional() private options: any | undefined,
  ) { }

  ngOnInit() {
    if (this.nzExtraFontName && this.nzExtraFontUrl && !this.options) {
      const options: NzRootConfig = { extraFontName: this.nzExtraFontName, extraFontUrl: this.nzExtraFontUrl };
      const initializer = createNzRootInitializer(this._document, options);
      initializer();
    }
  }
}
