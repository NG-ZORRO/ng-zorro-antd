/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, inject } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzButtonComponent, NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';

import { provideNzConfig } from './config';
import { NzConfigService } from './config.service';

@Component({
  imports: [NzButtonModule],
  template: `<button nz-button nzType="primary" [nzSize]="size">Global Config</button>`
})
export class NzGlobalConfigTestBasicComponent {
  public nzConfigService = inject(NzConfigService);
  size!: NzButtonSize;
}

describe('nz global config', () => {
  let fixture: ComponentFixture<NzGlobalConfigTestBasicComponent>;
  let testComponent: NzGlobalConfigTestBasicComponent;
  let button: DebugElement;
  let buttonEl: HTMLButtonElement;

  describe('without config', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzGlobalConfigTestBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      button = fixture.debugElement.query(By.directive(NzButtonComponent));
      buttonEl = button.nativeElement;
    });

    it('should render with in-component props', () => {
      fixture.detectChanges();
      expect(buttonEl.className).toContain('ant-btn ant-btn-primary');

      testComponent.size = 'large';
      fixture.detectChanges();
      expect(buttonEl.classList).toContain('ant-btn-lg');
    });
  });

  describe('with config', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          provideNzConfig({
            button: {
              nzSize: 'large'
            }
          })
        ]
      });
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzGlobalConfigTestBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      button = fixture.debugElement.query(By.directive(NzButtonComponent));
      buttonEl = button.nativeElement;
    });

    it('should static config work', () => {
      fixture.detectChanges();
      expect(buttonEl.classList).toContain('ant-btn-lg');

      testComponent.size = 'default';
      fixture.detectChanges();
      expect(buttonEl.classList).not.toContain('ant-btn-lg');
    });

    it('should dynamic config work', () => {
      fixture.detectChanges();
      expect(buttonEl.classList).toContain('ant-btn-lg');

      testComponent.nzConfigService.set('button', { nzSize: 'small' });
      fixture.detectChanges();
      expect(buttonEl.classList).toContain('ant-btn-sm');

      testComponent.size = 'default';
      fixture.detectChanges();
      expect(buttonEl.classList).not.toContain('ant-btn-lg');
      expect(buttonEl.classList).not.toContain('ant-btn-sm');
    });

    it('should dynamic theme colors config work', () => {
      fixture.detectChanges();
      testComponent.nzConfigService.set('theme', { primaryColor: '#0000FF' });
      fixture.detectChanges();
      expect(getComputedStyle(document.documentElement).getPropertyValue('--ant-primary-color').trim()).toEqual(
        'rgb(0, 0, 255)'
      );
    });

    it('should dynamic theme colors config with custom prefix work', () => {
      fixture.detectChanges();
      testComponent.nzConfigService.set('prefixCls', { prefixCls: 'custom-variable' });
      testComponent.nzConfigService.set('theme', { primaryColor: '#0000FF' });
      fixture.detectChanges();
      expect(
        getComputedStyle(document.documentElement).getPropertyValue('--custom-variable-primary-color').trim()
      ).toEqual('rgb(0, 0, 255)');
    });

    // It would fail silently. User cannot input a component name wrong - TypeScript comes to help!
    // it('should raise error when the component with given name is not defined', () => {
    //   expect(() => {
    //   }).toThrowError();
    // });
  });
});
