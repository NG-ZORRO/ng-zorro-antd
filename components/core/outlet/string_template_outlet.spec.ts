import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzOutletModule } from './outlet.module';
import { NzStringTemplateOutletDirective } from './string_template_outlet.directive';

describe('string template outlet', () => {
  describe('null', () => {
    it('should no error when null', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, { imports: [NzOutletModule] });
      expect(testBed.nativeElement.innerText).toBe('TargetText');
    });
  });
  describe('outlet change', () => {
    it('should work when switch between null and string', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, { imports: [NzOutletModule] });
      testBed.component.stringTemplateOutlet = 'String Testing';
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText String Testing');
      testBed.component.stringTemplateOutlet = null;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText');
    });
    it('should work when switch between null and template', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, { imports: [NzOutletModule] });
      testBed.component.stringTemplateOutlet = testBed.component.stringTpl;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is');
      testBed.component.stringTemplateOutlet = null;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText');
    });
    it('should work when switch between string', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, { imports: [NzOutletModule] });
      testBed.component.stringTemplateOutlet = 'String Testing';
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText String Testing');
      testBed.component.stringTemplateOutlet = 'String String';
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText String String');
    });
    it('should work when switch between string and template', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, { imports: [NzOutletModule] });
      testBed.component.stringTemplateOutlet = 'String Testing';
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText String Testing');
      testBed.component.stringTemplateOutlet = testBed.component.stringTpl;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is');
      testBed.component.stringTemplateOutlet = 'String Testing';
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText String Testing');
    });
    it('should work when switch between template', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, { imports: [NzOutletModule] });
      testBed.component.stringTemplateOutlet = testBed.component.stringTpl;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is');
      testBed.component.stringTemplateOutlet = testBed.component.emptyTpl;
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText Empty Template');
    });
  });
  describe('context shape change', () => {
    it('should work when context shape change', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, { imports: [NzOutletModule] });
      testBed.component.stringTemplateOutlet = testBed.component.dataTimeTpl;
      const spyOnUpdateContext = spyOn(testBed.component.nzStringTemplateOutletDirective as NzSafeAny, 'updateContext').and.callThrough();
      const spyOnRecreateView = spyOn(testBed.component.nzStringTemplateOutletDirective as NzSafeAny, 'recreateView').and.callThrough();
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is , The time is');
      testBed.component.context = { $implicit: 'data', time: 'time' };
      testBed.fixture.detectChanges();
      expect(spyOnUpdateContext).toHaveBeenCalledTimes(0);
      expect(spyOnRecreateView).toHaveBeenCalledTimes(2);
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is data, The time is time');
    });
  });
  describe('context data change', () => {
    it('should work when context implicit change', () => {
      const testBed = createComponentBed(StringTemplateOutletTestComponent, { imports: [NzOutletModule] });
      testBed.component.stringTemplateOutlet = testBed.component.stringTpl;
      const spyOnUpdateContext = spyOn(testBed.component.nzStringTemplateOutletDirective as NzSafeAny, 'updateContext').and.callThrough();
      const spyOnRecreateView = spyOn(testBed.component.nzStringTemplateOutletDirective as NzSafeAny, 'recreateView').and.callThrough();
      testBed.fixture.detectChanges();
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is');
      testBed.component.context = { $implicit: 'data' };
      testBed.fixture.detectChanges();
      expect(spyOnUpdateContext).toHaveBeenCalledTimes(1);
      expect(spyOnRecreateView).toHaveBeenCalledTimes(1);
      expect(testBed.nativeElement.innerText).toBe('TargetText The data is data');
    });
  });
});

@Component({
  template: `
    TargetText
    <ng-container *nzStringTemplateOutlet="stringTemplateOutlet; context: context; let stringTemplateOutlet">{{
      stringTemplateOutlet
    }}</ng-container>
    <ng-template #stringTpl let-data>The data is {{ data }}</ng-template>
    <ng-template #emptyTpl>Empty Template</ng-template>
    <ng-template #dataTimeTpl let-data let-time="time">The data is {{ data }}, The time is {{ time }}</ng-template>
  `
})
export class StringTemplateOutletTestComponent {
  @ViewChild('stringTpl') stringTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('emptyTpl') emptyTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('dataTimeTpl') dataTimeTpl!: TemplateRef<NzSafeAny>;
  @ViewChild(NzStringTemplateOutletDirective) nzStringTemplateOutletDirective!: NzStringTemplateOutletDirective;
  stringTemplateOutlet: TemplateRef<NzSafeAny> | string | null = null;
  context: NzSafeAny = { $implicit: '' };
}
