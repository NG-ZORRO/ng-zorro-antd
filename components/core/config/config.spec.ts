import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzConfigService, NZ_CONFIG, WithConfig } from 'ng-zorro-antd/core';

@Component({
  template: ''
})
export class NzGlobalConfigTestBindTwiceComponent {
  @WithConfig('button', 'b') @WithConfig('button', 'a') v: string;

  constructor(public nzConfigService: NzConfigService) {}
}

@Component({
  template: `
    <button nz-button nzType="primary" [nzSize]="size">Global Config</button>
  `
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

  describe('decorator', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [NzGlobalConfigTestBindTwiceComponent]
      }).compileComponents();
    }));

    it('should not decorate a property twice', () => {
      expect(() => {
        TestBed.createComponent(NzGlobalConfigTestBasicComponent);
      }).toThrowError();
    });
  });

  describe('without config', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule],
        declarations: [NzGlobalConfigTestBasicComponent]
      }).compileComponents();
    }));

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
    beforeEach(async(() => {
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

    // It would fail silently. User cannot input a component name wrong - TypeScript comes to help!
    // it('should raise error when the component with given name is not defined', () => {
    //   expect(() => {
    //     testComponent.nzConfigService.set('nzNotExist' as any, {}); // tslint:disable-line no-any
    //   }).toThrowError();
    // });
  });
});
