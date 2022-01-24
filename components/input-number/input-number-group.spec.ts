import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzInputNumberGroupComponent } from 'ng-zorro-antd/input-number/input-number-group.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number/input-number.module';

describe('input number group', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzInputNumberModule, NzIconTestModule],
      declarations: [NzTestInputNumberGroupBasicComponent]
    });
    TestBed.compileComponents();
  }));
  describe('input number group basic', () => {
    let fixture: ComponentFixture<NzTestInputNumberGroupBasicComponent>;
    let testComponent: NzTestInputNumberGroupBasicComponent;
    let inputNumberGroup: DebugElement;
    let inputNumberGroupElement: HTMLInputElement;
    let inputNumberElement: HTMLInputElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputNumberGroupBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      inputNumberGroup = fixture.debugElement.query(By.directive(NzInputNumberGroupComponent));
      inputNumberGroupElement = inputNumberGroup.nativeElement;
      inputNumberElement = inputNumberGroup.nativeElement.querySelector('nz-input-number');
    });
    it('should basic className correct', () => {
      fixture.detectChanges();
      expect(inputNumberGroup.nativeElement.classList).toContain('ant-input-number-group');
    });
    it('should nzSize work', () => {
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(inputNumberElement.classList).toContain('ant-input-number-lg');
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(inputNumberElement.classList).toContain('ant-input-number-sm');
    });
    it('should nzAddonBefore work', () => {
      testComponent.addonBefore = 'test';
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-group-addon')).not.toBe(null);
      testComponent.addonBefore = testComponent.testTemplate;
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-group-addon')).not.toBe(null);
      testComponent.addonBefore = undefined;
      fixture.detectChanges();
      expect(inputNumberElement.querySelector('.ant-input-number-group-addon')).toBe(null);
    });
    it('should nzAddonAfter work', () => {
      testComponent.addonAfter = 'test';
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-group-addon')).not.toBe(null);
      testComponent.addonAfter = testComponent.testTemplate;
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-group-addon')).not.toBe(null);
      testComponent.addonAfter = undefined;
      fixture.detectChanges();
      expect(inputNumberElement.querySelector('.ant-input-number-group-addon')).toBe(null);
    });
    it('should nzPrefix work', () => {
      testComponent.prefix = 'test';
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-prefix')).not.toBe(null);
      testComponent.prefix = testComponent.testTemplate;
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-prefix')).not.toBe(null);
      testComponent.prefix = undefined;
      fixture.detectChanges();
      expect(inputNumberElement.querySelector('.ant-input-number-prefix')).toBe(null);
    });
    it('should nzAddonBeforeIcon work', () => {
      testComponent.addonBeforeIcon = 'setting';
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-group-addon')).not.toBe(null);
      expect(inputNumberGroupElement.querySelector('i.anticon.anticon-setting')).not.toBe(null);
      testComponent.addonBeforeIcon = undefined;
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-group-addon')).toBe(null);
      expect(inputNumberElement.querySelector('i.anticon.anticon-setting')).toBe(null);
    });
    it('should nzAddonAfterIcon work', () => {
      testComponent.addonAfterIcon = 'setting';
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-group-addon')).not.toBe(null);
      expect(inputNumberGroupElement.querySelector('i.anticon.anticon-setting')).not.toBe(null);
      testComponent.addonAfterIcon = undefined;
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-group-addon')).toBe(null);
      expect(inputNumberElement.querySelector('i.anticon.anticon-setting')).toBe(null);
    });
    it('should nzPrefixIcon work', () => {
      testComponent.prefixIcon = 'setting';
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-prefix')).not.toBe(null);
      expect(inputNumberGroupElement.querySelector('i.anticon.anticon-setting')).not.toBe(null);
      testComponent.prefixIcon = undefined;
      fixture.detectChanges();
      expect(inputNumberGroupElement.querySelector('.ant-input-number-prefix')).toBe(null);
      expect(inputNumberElement.querySelector('i.anticon.anticon-setting')).toBe(null);
    });
  });
});

@Component({
  template: `
    <nz-input-number-group
      [nzSize]="size"
      [nzAddOnBefore]="addonBefore"
      [nzAddOnAfter]="addonAfter"
      [nzPrefix]="prefix"
      [nzAddOnAfterIcon]="addonAfterIcon"
      [nzAddOnBeforeIcon]="addonBeforeIcon"
      [nzPrefixIcon]="prefixIcon"
    >
      <nz-input-number></nz-input-number>
    </nz-input-number-group>
    <ng-template #testTemplate>
      <span>test</span>
    </ng-template>
  `
})
export class NzTestInputNumberGroupBasicComponent {
  @ViewChild('testTemplate', { static: false }) testTemplate!: TemplateRef<{}>;
  size: NzSizeLDSType = 'default';
  addonBefore?: string | TemplateRef<{}>;
  addonAfter?: string | TemplateRef<{}>;
  prefix?: string | TemplateRef<{}>;
  addonBeforeIcon?: string;
  addonAfterIcon?: string;
  prefixIcon?: string;
}
