/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzOutletModule } from './outlet.module';
import { NzStringTemplateOutletDirective } from './string-template-outlet.directive';

describe('string template outlet', () => {
  let fixture: ComponentFixture<StringTemplateOutletTestComponent>;
  let component: StringTemplateOutletTestComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(StringTemplateOutletTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('null', () => {
    it('should no error when null', () => {
      expect(fixture.nativeElement.innerText).toBe('TargetText');
    });
  });

  describe('outlet change', () => {
    it('should work when switch between null and string', () => {
      component.stringTemplateOutlet = 'String Testing';
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText String Testing');
      component.stringTemplateOutlet = null;
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText');
    });

    it('should work when switch between null and template', () => {
      component.stringTemplateOutlet = component.stringTpl;
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText The data is');
      component.stringTemplateOutlet = null;
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText');
    });

    it('should work when switch between string', () => {
      component.stringTemplateOutlet = 'String Testing';
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText String Testing');
      component.stringTemplateOutlet = 'String String';
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText String String');
    });

    it('should work when switch between string and template', () => {
      component.stringTemplateOutlet = 'String Testing';
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText String Testing');
      component.stringTemplateOutlet = component.stringTpl;
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText The data is');
      component.stringTemplateOutlet = 'String Testing';
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText String Testing');
    });

    it('should work when switch between template', () => {
      component.stringTemplateOutlet = component.stringTpl;
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText The data is');
      component.stringTemplateOutlet = component.emptyTpl;
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText Empty Template');
    });
  });

  describe('context shape change', () => {
    it('should work when context shape change', () => {
      component.stringTemplateOutlet = component.dataTimeTpl;
      const spyOnUpdateContext = spyOn(
        component.nzStringTemplateOutletDirective as NzSafeAny,
        'updateContext'
      ).and.callThrough();
      const spyOnRecreateView = spyOn(
        component.nzStringTemplateOutletDirective as NzSafeAny,
        'recreateView'
      ).and.callThrough();
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText The data is , The time is');
      component.context = { $implicit: 'data', time: 'time' };
      fixture.detectChanges();
      expect(spyOnUpdateContext).toHaveBeenCalledTimes(0);
      expect(spyOnRecreateView).toHaveBeenCalledTimes(2);
      expect(fixture.nativeElement.innerText).toBe('TargetText The data is data, The time is time');
    });
  });

  describe('context data change', () => {
    it('should work when context implicit change', () => {
      component.stringTemplateOutlet = component.stringTpl;
      const spyOnUpdateContext = spyOn(
        component.nzStringTemplateOutletDirective as NzSafeAny,
        'updateContext'
      ).and.callThrough();
      const spyOnRecreateView = spyOn(
        component.nzStringTemplateOutletDirective as NzSafeAny,
        'recreateView'
      ).and.callThrough();
      fixture.detectChanges();
      expect(fixture.nativeElement.innerText).toBe('TargetText The data is');
      component.context = { $implicit: 'data' };
      fixture.detectChanges();
      expect(spyOnUpdateContext).toHaveBeenCalledTimes(1);
      expect(spyOnRecreateView).toHaveBeenCalledTimes(1);
      expect(fixture.nativeElement.innerText).toBe('TargetText The data is data');
    });
  });
});

@Component({
  imports: [NzOutletModule],
  template: `
    TargetText
    <ng-container *nzStringTemplateOutlet="stringTemplateOutlet; context: context; let stringTemplateOutlet">
      {{ stringTemplateOutlet }}
    </ng-container>
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
