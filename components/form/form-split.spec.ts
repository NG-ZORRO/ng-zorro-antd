import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzFormModule } from 'ng-zorro-antd/form/form.module';

import { NzFormSplitComponent } from './form-split.component';

const testBedOptions = { imports: [NoopAnimationsModule] };

describe('nz-form-split', () => {
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormSplitComponent>;
    let split: DebugElement;
    beforeEach(() => {
      TestBed.configureTestingModule(testBedOptions);
      fixture = TestBed.createComponent(NzTestFormSplitComponent);
      fixture.detectChanges();
      split = fixture.debugElement.query(By.directive(NzFormSplitComponent));
    });
    it('should className correct', () => {
      expect(split.nativeElement.classList).toContain('ant-form-split');
    });
  });
});

@Component({
  standalone: true,
  imports: [NzFormModule],
  template: `<nz-form-split></nz-form-split>`
})
export class NzTestFormSplitComponent {}
