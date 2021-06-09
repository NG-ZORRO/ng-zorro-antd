/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAffixModule } from 'ng-zorro-antd/affix';

import { NzAnchorLinkComponent } from './anchor-link.component';
import { NzAnchorComponent } from './anchor.component';

@NgModule({
  declarations: [NzAnchorComponent, NzAnchorLinkComponent],
  exports: [NzAnchorComponent, NzAnchorLinkComponent],
  imports: [BidiModule, CommonModule, NzAffixModule, PlatformModule]
})
export class NzAnchorModule {}
