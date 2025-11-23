/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzFormTextComponent } from 'ng-zorro-antd/form/form-text.component';

describe('nz-form-text', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
    });
  });

  it('should className correct', () => {
    const fixture = TestBed.createComponent(NzFormTextComponent);
    expect(fixture.nativeElement.classList).toContain('ant-form-text');
  });
});
