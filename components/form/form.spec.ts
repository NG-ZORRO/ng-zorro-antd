/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzFormModule } from 'ng-zorro-antd/form/form.module';

import { NzFormDirective, NzFormLayoutType } from './form.directive';

const testBedOptions = {
  imports: [NoopAnimationsModule]
};

describe('nz-form', () => {
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormDirectiveComponent>;
    let testComponent: NzTestFormDirectiveComponent;
    let form: DebugElement;
    beforeEach(() => {
      TestBed.configureTestingModule(testBedOptions);
      fixture = TestBed.createComponent(NzTestFormDirectiveComponent);
      testComponent = fixture.componentInstance;
      form = fixture.debugElement.query(By.directive(NzFormDirective));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(form.nativeElement.classList).toContain('ant-form');
      expect(form.nativeElement.classList).toContain('ant-form-horizontal');
    });
    it('should layout work', () => {
      testComponent.layout = 'vertical';

      fixture.detectChanges();

      expect(form.nativeElement.classList).toContain('ant-form-vertical');
      expect(form.nativeElement.classList).not.toContain('ant-form-horizontal');

      testComponent.layout = 'inline';

      fixture.detectChanges();

      expect(form.nativeElement.classList).not.toContain('ant-form-vertical');
      expect(form.nativeElement.classList).not.toContain('ant-form-horizontal');
      expect(form.nativeElement.classList).toContain('ant-form-inline');
    });
  });

  describe('label integrate', () => {
    let fixture: ComponentFixture<NzTestFormLabelIntegrateComponent>;
    let testComponent: NzTestFormLabelIntegrateComponent;
    let form: DebugElement;
    beforeEach(() => {
      TestBed.configureTestingModule(testBedOptions);
      fixture = TestBed.createComponent(NzTestFormLabelIntegrateComponent);
      testComponent = fixture.componentInstance;
      form = fixture.debugElement.query(By.directive(NzFormDirective));
    });

    afterEach(() => {
      testComponent.defaultNoColon = false;
      testComponent.noColon = false;
      testComponent.testPriority = false;
    });

    it('should set default `NoColon` value', () => {
      const labels = (form.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>(
        '.ant-form-item-label label'
      );
      labels.forEach(label => expect(label.classList).not.toContain('ant-form-item-no-colon'));

      testComponent.defaultNoColon = true;

      fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('ant-form-item-no-colon'));
    });

    it('should label have high priority', () => {
      const labels = (form.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>(
        '.ant-form-item-label label'
      );
      labels.forEach(label => expect(label.classList).not.toContain('ant-form-item-no-colon'));

      testComponent.defaultNoColon = true;

      fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('ant-form-item-no-colon'));
      testComponent.testPriority = true;

      fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('ant-form-item-no-colon'));
      labels.forEach(label => {
        if (label.innerText === 'TEST_PRIORITY') {
          expect(label.classList).not.toContain('ant-form-item-no-colon');
        } else {
          expect(label.classList).toContain('ant-form-item-no-colon');
        }
      });

      testComponent.defaultNoColon = false;
      testComponent.noColon = true;

      fixture.detectChanges();

      labels.forEach(label => {
        if (label.innerText === 'TEST_PRIORITY') {
          expect(label.classList).toContain('ant-form-item-no-colon');
        } else {
          expect(label.classList).not.toContain('ant-form-item-no-colon');
        }
      });
    });
  });
});

@Component({
  imports: [NzFormModule],
  template: `<form nz-form [nzLayout]="layout"></form>`
})
export class NzTestFormDirectiveComponent {
  layout: NzFormLayoutType = 'horizontal';
}

@Component({
  imports: [NzFormModule],
  template: `
    <form nz-form [nzNoColon]="defaultNoColon">
      <nz-form-item>
        <nz-form-label>Label</nz-form-label>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Label</nz-form-label>
      </nz-form-item>
      @if (testPriority) {
        <nz-form-item>
          <nz-form-label [nzNoColon]="noColon">TEST_PRIORITY</nz-form-label>
        </nz-form-item>
      }
    </form>
  `
})
export class NzTestFormLabelIntegrateComponent {
  defaultNoColon = false;
  testPriority = false;
  noColon = false;
}
