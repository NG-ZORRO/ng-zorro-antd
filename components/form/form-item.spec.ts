import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzFormItemComponent } from './form-item.component';
import { NzFormModule } from './form.module';

const testBedOptions = { imports: [NzFormModule, NoopAnimationsModule] };

describe('nz-form-item', () => {
  describe('default', () => {
    let testBed: ComponentBed<NzTestFormItemComponent>;
    let formItem: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(NzTestFormItemComponent, testBedOptions);
      formItem = testBed.fixture.debugElement.query(By.directive(NzFormItemComponent));
    });
    it('should className correct', () => {
      expect(formItem.nativeElement.classList).toContain('ant-form-item');
    });
  });
});

@Component({
  template: `
    <nz-form-item></nz-form-item>
  `
})
export class NzTestFormItemComponent {}
