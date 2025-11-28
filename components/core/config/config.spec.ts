/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ElementRef, inject, input, Input, inputBinding, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NzButtonSize } from 'ng-zorro-antd/button';

import { NzConfigKey, provideNzConfig } from './config';
import { NzConfigService, withConfigFactory, WithConfig } from './config.service';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'button';
const withConfig = withConfigFactory(NZ_CONFIG_MODULE_NAME);

@Component({
  selector: 'nz-with-config',
  template: ``
})
class NzWithConfigTestComponent {
  readonly elementRef = inject(ElementRef);
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input() @WithConfig() nzSize: NzButtonSize = 'default';
}

@Component({
  selector: 'nz-with-config-signal',
  template: ``
})
class NzWithConfigSignalTestComponent {
  readonly elementRef = inject(ElementRef);

  readonly nzSize = input<NzButtonSize>();
  readonly innerSize = withConfig('nzSize', this.nzSize, 'default');
}

describe('nz global config', () => {
  const size = signal<NzButtonSize | undefined>(undefined);

  // resign to unassigned value
  afterEach(() => {
    size.set(undefined);
  });

  describe('@WithConfig', () => {
    it('should render with in-component props', async () => {
      const fixture = TestBed.createComponent(NzWithConfigTestComponent, {
        bindings: [inputBinding('nzSize', size)]
      });
      const component = fixture.debugElement.componentInstance as NzWithConfigTestComponent;
      await fixture.whenStable();

      fixture.detectChanges();
      expect(component.nzSize).toBe('default');

      size.set('large');
      fixture.detectChanges();
      expect(component.nzSize).toBe('large');
    });

    describe('with config', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            provideNzConfig({
              button: {
                nzSize: 'large'
              }
            })
          ]
        });
      });

      it('should static config work', async () => {
        const fixture = TestBed.createComponent(NzWithConfigTestComponent, {
          bindings: [inputBinding('nzSize', size)]
        });
        const component = fixture.debugElement.componentInstance as NzWithConfigTestComponent;
        await fixture.whenStable();

        fixture.detectChanges();
        expect(component.nzSize).toBe('large');

        size.set('default');
        fixture.detectChanges();
        expect(component.nzSize).toBe('default');
      });

      it('should dynamic config work', async () => {
        const fixture = TestBed.createComponent(NzWithConfigTestComponent, {
          bindings: [inputBinding('nzSize', size)]
        });
        const component = fixture.debugElement.componentInstance as NzWithConfigTestComponent;
        const nzConfigService = TestBed.inject(NzConfigService);
        await fixture.whenStable();

        fixture.detectChanges();
        expect(component.nzSize).toBe('large');

        nzConfigService.set('button', { nzSize: 'small' });
        fixture.detectChanges();
        expect(component.nzSize).toBe('small');

        size.set('default');
        fixture.detectChanges();
        expect(component.nzSize).toBe('default');
      });
    });
  });

  describe('withConfig signal', () => {
    it('should render with in-component props', async () => {
      const fixture = TestBed.createComponent(NzWithConfigSignalTestComponent, {
        bindings: [inputBinding('nzSize', size)]
      });
      const component = fixture.debugElement.componentInstance as NzWithConfigSignalTestComponent;
      await fixture.whenStable();

      fixture.detectChanges();
      expect(component.nzSize()).toBeUndefined();
      expect(component.innerSize()).toBe('default');

      size.set('large');
      fixture.detectChanges();
      expect(component.nzSize()).toBe('large');
      expect(component.innerSize()).toBe('large');
    });

    describe('with config', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            provideNzConfig({
              button: {
                nzSize: 'large'
              }
            })
          ]
        });
      });

      it('should static config work', async () => {
        const fixture = TestBed.createComponent(NzWithConfigSignalTestComponent, {
          bindings: [inputBinding('nzSize', size)]
        });
        const component = fixture.debugElement.componentInstance as NzWithConfigSignalTestComponent;
        await fixture.whenStable();

        fixture.detectChanges();
        expect(component.nzSize()).toBeUndefined();
        expect(component.innerSize()).toBe('large');

        size.set('default');
        fixture.detectChanges();
        expect(component.nzSize()).toBe('default');
        expect(component.innerSize()).toBe('default');
      });

      it('should dynamic config work', async () => {
        const fixture = TestBed.createComponent(NzWithConfigSignalTestComponent, {
          bindings: [inputBinding('nzSize', size)]
        });
        const component = fixture.debugElement.componentInstance as NzWithConfigSignalTestComponent;
        const nzConfigService = TestBed.inject(NzConfigService);
        await fixture.whenStable();

        fixture.detectChanges();
        expect(component.nzSize()).toBeUndefined();
        expect(component.innerSize()).toBe('large');

        nzConfigService.set('button', { nzSize: 'small' });
        fixture.detectChanges();
        expect(component.nzSize()).toBeUndefined();
        expect(component.innerSize()).toBe('small');

        size.set('default');
        fixture.detectChanges();
        expect(component.nzSize()).toBe('default');
        expect(component.innerSize()).toBe('default');
      });
    });
  });

  describe('theme config', () => {
    let nzConfigService: NzConfigService;

    beforeEach(() => {
      nzConfigService = TestBed.inject(NzConfigService);
    });

    function getComputedStylePropertyValue(property: string): string {
      return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
    }

    it('should dynamic theme colors config work', () => {
      nzConfigService.set('theme', { primaryColor: '#0000FF' });
      expect(getComputedStylePropertyValue('--ant-primary-color')).toEqual('rgb(0, 0, 255)');
    });

    it('should dynamic theme colors config with custom prefix work', () => {
      nzConfigService.set('prefixCls', { prefixCls: 'custom-variable' });
      nzConfigService.set('theme', { primaryColor: '#0000FF' });
      expect(getComputedStylePropertyValue('--custom-variable-primary-color')).toEqual('rgb(0, 0, 255)');
    });
  });
});
