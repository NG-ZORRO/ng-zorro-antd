/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzFormItemComponent } from './form-item.component';

describe('nz-form-item', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
    });
  });

  it('should className correct', () => {
    const fixture = TestBed.createComponent(NzFormItemComponent);
    expect(fixture.nativeElement.classList).toContain('ant-form-item');
  });
});
