/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzFormModule } from 'ng-zorro-antd/form/form.module';

import { NzFormTextComponent } from './form-text.component';

const testBedOptions = { imports: [NoopAnimationsModule] };

describe('nz-form-text', () => {
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormTextComponent>;
    let text: DebugElement;
    beforeEach(() => {
      TestBed.configureTestingModule(testBedOptions);
      fixture = TestBed.createComponent(NzTestFormTextComponent);
      fixture.detectChanges();
      text = fixture.debugElement.query(By.directive(NzFormTextComponent));
    });
    it('should className correct', () => {
      expect(text.nativeElement.classList).toContain('ant-form-text');
    });
  });
});

@Component({
  imports: [NzFormModule],
  template: `<nz-form-text></nz-form-text>`
})
export class NzTestFormTextComponent {}
