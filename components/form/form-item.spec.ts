import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzFormItemComponent } from './form-item.component';
import { NzFormModule } from './form.module';

const testBedOptions = { imports: [NoopAnimationsModule] };

describe('nz-form-item', () => {
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormItemComponent>;
    let formItem: DebugElement;
    beforeEach(() => {
      TestBed.configureTestingModule(testBedOptions);
      fixture = TestBed.createComponent(NzTestFormItemComponent);
      formItem = fixture.debugElement.query(By.directive(NzFormItemComponent));
    });
    it('should className correct', () => {
      expect(formItem.nativeElement.classList).toContain('ant-form-item');
    });
  });
});

@Component({
  standalone: true,
  imports: [NzFormModule],
  template: `<nz-form-item></nz-form-item>`
})
export class NzTestFormItemComponent {}
