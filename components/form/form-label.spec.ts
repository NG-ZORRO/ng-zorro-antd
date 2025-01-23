/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzLabelAlignType } from 'ng-zorro-antd/form/form.directive';
import { NzFormModule } from 'ng-zorro-antd/form/form.module';

import { NzFormLabelComponent, NzFormTooltipIcon } from './form-label.component';

const testBedOptions = { imports: [NoopAnimationsModule] };

describe('nz-form-label', () => {
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormLabelComponent>;
    let testComponent: NzTestFormLabelComponent;
    let label: DebugElement;
    beforeEach(() => {
      TestBed.configureTestingModule(testBedOptions);
      fixture = TestBed.createComponent(NzTestFormLabelComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      label = fixture.debugElement.query(By.directive(NzFormLabelComponent));
    });
    it('should className correct', () => {
      expect(label.nativeElement.classList).toContain('ant-form-item-label');
    });
    it('should label for work', () => {
      expect(label.nativeElement.querySelector('label').attributes.getNamedItem('for').value).toBe('test');
    });
    it('should required work', () => {
      expect(label.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-required');

      testComponent.required = true;

      fixture.detectChanges();

      expect(label.nativeElement.querySelector('label').classList).toContain('ant-form-item-required');
    });

    it('should no colon work', () => {
      expect(label.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-no-colon');

      testComponent.noColon = true;

      fixture.detectChanges();

      expect(label.nativeElement.querySelector('label').classList).toContain('ant-form-item-no-colon');
    });

    it('should tooltip work', () => {
      expect(label.nativeElement.querySelector('.ant-form-item-tooltip')).toBeNull();

      testComponent.tooltipTitle = 'tooltip';
      fixture.detectChanges();

      expect(label.nativeElement.querySelector('.ant-form-item-tooltip')).toBeDefined();
      expect(label.nativeElement.querySelector('.anticon-question-circle')).toBeDefined();

      testComponent.tooltipIcon = 'info-circle';
      fixture.detectChanges();

      expect(label.nativeElement.querySelector('.ant-form-item-tooltip')).toBeDefined();
      expect(label.nativeElement.querySelector('.anticon-info-circle')).toBeDefined();
    });
    it('should label align work', () => {
      expect(label.nativeElement.classList).not.toContain('ant-form-item-label-left');

      testComponent.align = 'left';

      fixture.detectChanges();

      expect(label.nativeElement.classList).toContain('ant-form-item-label-left');
    });

    it('should label wrap work', () => {
      expect(label.nativeElement.classList).not.toContain('ant-form-item-label-wrap');

      testComponent.labelWrap = true;
      fixture.detectChanges();

      expect(label.nativeElement.classList).toContain('ant-form-item-label-wrap');
    });
  });
});

@Component({
  imports: [NzFormModule],
  template: `
    <nz-form-label
      [nzFor]="forValue"
      [nzNoColon]="noColon"
      [nzRequired]="required"
      [nzTooltipTitle]="tooltipTitle"
      [nzTooltipIcon]="tooltipIcon"
      [nzLabelAlign]="align"
      [nzLabelWrap]="labelWrap"
    ></nz-form-label>
  `
})
export class NzTestFormLabelComponent {
  forValue = 'test';
  required = false;
  noColon = false;
  tooltipTitle?: string;
  tooltipIcon!: string | NzFormTooltipIcon;
  align: NzLabelAlignType = 'right';
  labelWrap = false;
}
