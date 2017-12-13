/* tslint:disable:no-any */
import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import { createNzRootInitializer, NzRootConfig, NZ_ROOT_CONFIG } from './nz-root-config';

@Component({
  selector : '[nz-root],nz-root',
  template : `
    <ng-content></ng-content>
  `,
})
export class NzRootComponent implements OnInit {
  private _document: Document;
  private options: NzRootConfig;
  // Extra font definition
  @Input() nzExtraFontName: string;
  @Input() nzExtraFontUrl: string;

  // Cannot use type annotation here due to https://github.com/angular/angular-cli/issues/2034
  // Should be revisited after AOT being made the only option
  constructor(
    @Inject(DOCUMENT) _document: any,
    @Inject(NZ_ROOT_CONFIG) @Optional() options: any,
  ) {
    this._document = _document;
    this.options = options;
  }

  ngOnInit(): void {
    if (this.nzExtraFontName && this.nzExtraFontUrl && !this.options) {
      const options: NzRootConfig = { extraFontName: this.nzExtraFontName, extraFontUrl: this.nzExtraFontUrl };
      const initializer = createNzRootInitializer(this._document, options);
      initializer();
    }
  }
}
