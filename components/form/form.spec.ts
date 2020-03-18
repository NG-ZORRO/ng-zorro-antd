import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzFormItemComponent } from './form-item.component';
import { NzFormLabelComponent } from './form-label.component';
import { NzFormDirective } from './form.directive';

const testBedOptions = {
  imports: [NoopAnimationsModule],
  declarations: [NzFormDirective, NzFormLabelComponent, NzFormItemComponent]
};

describe('nz-form', () => {
  describe('default', () => {
    let testBed: ComponentBed<NzTestFormDirectiveComponent>;
    let testComponent: NzTestFormDirectiveComponent;
    let form: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(NzTestFormDirectiveComponent, testBedOptions);
      testComponent = testBed.component;
      form = testBed.fixture.debugElement.query(By.directive(NzFormDirective));
    });
    it('should className correct', () => {
      expect(form.nativeElement.classList).toContain('ant-form');
      expect(form.nativeElement.classList).toContain('ant-form-horizontal');
    });
    it('should layout work', () => {
      testComponent.layout = 'vertical';

      testBed.fixture.detectChanges();

      expect(form.nativeElement.classList).toContain('ant-form-vertical');
      expect(form.nativeElement.classList).not.toContain('ant-form-horizontal');

      testComponent.layout = 'inline';

      testBed.fixture.detectChanges();

      expect(form.nativeElement.classList).not.toContain('ant-form-vertical');
      expect(form.nativeElement.classList).not.toContain('ant-form-horizontal');
      expect(form.nativeElement.classList).toContain('ant-form-inline');
    });
  });

  describe('label integrate', () => {
    let testBed: ComponentBed<NzTestFormLabelIntegrateComponent>;
    let testComponent: NzTestFormLabelIntegrateComponent;
    let form: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(NzTestFormLabelIntegrateComponent, testBedOptions);
      testComponent = testBed.component;
      form = testBed.fixture.debugElement.query(By.directive(NzFormDirective));
    });

    afterEach(() => {
      testComponent.defaultNoColon = false;
      testComponent.noColon = false;
      testComponent.testPriority = false;
    });

    it('should set default `NoColon` value', () => {
      const labels = (form.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>('.ant-form-item-label label');
      labels.forEach(label => expect(label.classList).not.toContain('ant-form-item-no-colon'));

      testComponent.defaultNoColon = true;

      testBed.fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('ant-form-item-no-colon'));
    });

    it('should label have high priority', () => {
      const labels = (form.nativeElement as HTMLElement).querySelectorAll<HTMLLabelElement>('.ant-form-item-label label');
      labels.forEach(label => expect(label.classList).not.toContain('ant-form-item-no-colon'));

      testComponent.defaultNoColon = true;

      testBed.fixture.detectChanges();

      labels.forEach(label => expect(label.classList).toContain('ant-form-item-no-colon'));
      testComponent.testPriority = true;

      testBed.fixture.detectChanges();

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

      testBed.fixture.detectChanges();

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
  template: `
    <form nz-form [nzLayout]="layout"></form>
  `
})
export class NzTestFormDirectiveComponent {
  layout = 'horizontal';
}

@Component({
  template: `
    <form nz-form [nzNoColon]="defaultNoColon">
      <nz-form-item>
        <nz-form-label>Label</nz-form-label>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Label</nz-form-label>
      </nz-form-item>
      <nz-form-item *ngIf="testPriority">
        <nz-form-label [nzNoColon]="noColon">TEST_PRIORITY</nz-form-label>
      </nz-form-item>
    </form>
  `
})
export class NzTestFormLabelIntegrateComponent {
  defaultNoColon = false;
  testPriority = false;
  noColon = false;
}
