import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';

import { NZ_CONFIG } from './config';
import { NzConfigService } from './config.service';

@Component({
  template: ` <button nz-button nzType="primary" [nzSize]="size">Global Config</button> `
})
export class NzGlobalConfigTestBasicComponent {
  size?: 'large' | 'default' | 'small';

  constructor(public nzConfigService: NzConfigService) {}
}

describe('nz global config', () => {
  let fixture: ComponentFixture<NzGlobalConfigTestBasicComponent>;
  let testComponent: NzGlobalConfigTestBasicComponent;
  let button: DebugElement;
  let buttonEl: HTMLButtonElement;

  describe('without config', () => {
    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [NzButtonModule],
          declarations: [NzGlobalConfigTestBasicComponent]
        }).compileComponents();
      })
    );

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
    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [NzButtonModule],
          declarations: [NzGlobalConfigTestBasicComponent],
          providers: [
            {
              provide: NZ_CONFIG,
              useValue: {
                button: {
                  nzSize: 'large'
                }
              }
            }
          ]
        }).compileComponents();
      })
    );

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
    // eslint-disable-line  @typescript-eslint/no-explicit-any
    //   }).toThrowError();
    // });
  });
});
