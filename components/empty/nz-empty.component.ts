import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { emptyImage } from './nz-empty.config';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  selector       : 'nz-empty',
  templateUrl    : './nz-empty.component.html',
  styles         : [ 'nz-empty { display: block; }' ],
  host           : {
    'class': 'ant-empty'
  }
})
export class NzEmptyComponent implements OnChanges {
  @Input() nzNotFoundImage: string | TemplateRef<void>;
  @Input() nzNotFoundContent: string | TemplateRef<void>;
  @Input() nzNotFoundFooter: string | TemplateRef<void>;

  // NOTE: It would be very hack to use `ContentChild`, because Angular could tell if user actually pass something to
  // <ng-content>. See: https://github.com/angular/angular/issues/12530.
  // I can use a directive but this would expose the name `footer`.
  // @ContentChild(TemplateRef) nzNotFoundFooter: TemplateRef<void>;

  defaultSvg = this.sanitizer.bypassSecurityTrustResourceUrl(emptyImage);
  isContentString = false;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzNotFoundContent) {
      this.isContentString = typeof changes.nzNotFoundContent.currentValue === 'string';
    }
  }
}
