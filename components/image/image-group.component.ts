/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { NzImageDirective } from './image.directive';

@Component({
  selector: 'nz-image-group',
  exportAs: 'nzImageGroup',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzImageGroupComponent {
  @Input() nzScaleStep: number | null = null;

  images: NzImageDirective[] = [];

  addImage(image: NzImageDirective): void {
    this.images.push(image);
  }
}
