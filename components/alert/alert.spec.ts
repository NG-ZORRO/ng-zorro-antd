/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { ChangeDetectorRef, Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

import { NzConfigService } from 'ng-zorro-antd/core/config';
import { updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzAlertComponent, NzAlertType } from './alert.component';
import { NzAlertModule } from './alert.module';

describe('alert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  describe('basic alert', () => {
    let fixture: ComponentFixture<NzDemoTestBasicComponent>;
    let testComponent: NzDemoTestBasicComponent;
    let alert: DebugElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzDemoTestBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      alert = fixture.debugElement.query(By.directive(NzAlertComponent));
      fixture.autoDetectChanges();
      await fixture.whenStable();
    });

    it('should className correct', () => {
      expect(alert.nativeElement.firstElementChild!.classList).toContain('ant-alert');
    });

    it('should banner work', async () => {
      expect(alert.nativeElement.firstElementChild!.classList).not.toContain('ant-alert-banner');
      expect(alert.nativeElement.querySelector('.ant-alert').classList).toContain(`ant-alert-info`);
      expect(alert.nativeElement.querySelector('.ant-alert-icon')).toBeNull();
      testComponent.banner = true;
      await updateNonSignalsInput(fixture);
      expect(alert.nativeElement.firstElementChild!.classList).toContain('ant-alert-banner');
      expect(alert.nativeElement.querySelector('.ant-alert').classList).toContain(`ant-alert-info`);
      expect(alert.nativeElement.querySelector('.ant-alert-icon')).toBeNull();
    });

    it('should closeable work', async () => {
      testComponent.closeable = true;
      await updateNonSignalsInput(fixture);
      expect(testComponent.onClose).toHaveBeenCalledTimes(0);
      expect(alert.nativeElement.querySelector('.anticon-close')).toBeDefined();
      alert.nativeElement.querySelector('.ant-alert-close-icon').click();
      await fixture.whenStable();
      alert = fixture.debugElement.query(By.directive(NzAlertComponent));
      expect(alert.nativeElement.innerText).toBe('');
      expect(testComponent.onClose).toHaveBeenCalledTimes(1);
    });

    it('should closeText work', async () => {
      expect(alert.nativeElement.querySelector('.ant-alert-close-icon')).toBeNull();
      testComponent.closeText = 'closeText';
      await updateNonSignalsInput(fixture);
      expect(alert.nativeElement.querySelector('.ant-alert-close-icon').innerText).toBe('closeText');
      testComponent.closeText = testComponent.template;
      await updateNonSignalsInput(fixture);
      expect(alert.nativeElement.querySelector('.ant-alert-close-icon').innerText).toBe('template');
    });

    it('should description work', async () => {
      expect(alert.nativeElement.querySelector('.ant-alert-description').innerText).toBe('description');
      testComponent.description = testComponent.template;
      await updateNonSignalsInput(fixture);
      expect(alert.nativeElement.querySelector('.ant-alert-description').innerText).toBe('template');
    });

    it('should message work', async () => {
      expect(alert.nativeElement.querySelector('.ant-alert-message').innerText).toBe('message');
      testComponent.message = testComponent.template;
      await updateNonSignalsInput(fixture);
      expect(alert.nativeElement.querySelector('.ant-alert-message').innerText).toBe('template');
    });

    it('should showIcon work', async () => {
      expect(alert.nativeElement.querySelector('.ant-alert-icon')).toBeNull();
      testComponent.showIcon = true;
      await updateNonSignalsInput(fixture);
      expect(alert.nativeElement.querySelector('.ant-alert-icon')).toBeDefined();
    });

    it('should iconType work', async () => {
      testComponent.showIcon = true;
      testComponent.iconType = 'lock';
      await updateNonSignalsInput(fixture);
      expect(alert.nativeElement.querySelector('.ant-alert-icon').firstElementChild.classList).toContain('anticon');
      expect(alert.nativeElement.querySelector('.ant-alert-icon').firstElementChild.classList).toContain(
        'anticon-lock'
      );
    });

    it('should type work', async () => {
      const listOfType: NzAlertType[] = ['success', 'info', 'warning', 'error'];
      for (const type of listOfType) {
        testComponent.type = type;
        await updateNonSignalsInput(fixture);
        expect(alert.nativeElement.querySelector('.ant-alert').classList).toContain(`ant-alert-${type}`);
      }
    });

    it('should action work', async () => {
      testComponent.action = testComponent.template;
      await updateNonSignalsInput(fixture);
      expect(alert.nativeElement.querySelector('.ant-alert-action').classList).not.toBeNull();
    });
  });

  describe('banner alert', () => {
    let fixture: ComponentFixture<NzDemoTestBannerComponent>;
    let alert: DebugElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzDemoTestBannerComponent);
      alert = fixture.debugElement.query(By.directive(NzAlertComponent));
      fixture.autoDetectChanges();
    });

    it('should banner work', async () => {
      await fixture.whenStable();
      expect(alert.nativeElement.querySelector('.ant-alert').classList).toContain(`ant-alert-warning`);
      expect(alert.nativeElement.querySelector('.ant-alert-icon')).toBeDefined();
    });
  });

  describe('RTL', () => {
    it('should className correct on dir change', async () => {
      const fixture = TestBed.createComponent(NzTestAlertRtlComponent);
      const alert = fixture.debugElement.query(By.directive(NzAlertComponent));
      await fixture.whenStable();
      expect(alert.nativeElement.firstElementChild!.classList).toContain('ant-alert-rtl');

      fixture.componentInstance.direction = 'ltr';
      await updateNonSignalsInput(fixture);
      expect(alert.nativeElement.firstElementChild!.classList).not.toContain('ant-alert-rtl');
    });
  });

  describe('custom icon', () => {
    it('should custom icon work', async () => {
      const fixture = TestBed.createComponent(NzTestAlertCustomIconComponent);
      const alert = fixture.debugElement.query(By.directive(NzAlertComponent));
      await fixture.whenStable();
      expect(alert.nativeElement.querySelector('.ant-alert-icon')).toBeDefined();
      expect(alert.nativeElement.querySelector('.ant-alert-icon').firstElementChild).not.toContain('anticon');
    });
  });
});

@Component({
  imports: [NzAlertModule],
  selector: 'nz-test-basic-alert',
  template: `
    <ng-template #template>template</ng-template>
    <nz-alert
      [nzBanner]="banner"
      [nzCloseable]="closeable"
      [nzCloseText]="closeText"
      [nzDescription]="description"
      [nzMessage]="message"
      [nzShowIcon]="showIcon"
      [nzIconType]="iconType"
      [nzType]="type"
      [nzAction]="action"
      (nzOnClose)="onClose($event)"
    ></nz-alert>
  `
})
export class NzDemoTestBasicComponent {
  @ViewChild('template', { static: false }) template!: TemplateRef<void>;
  action: string | TemplateRef<void> | null = null;
  banner = false;
  closeable = false;
  closeText: string | TemplateRef<void> | null = null;
  description: string | TemplateRef<void> = 'description';
  message: string | TemplateRef<void> = 'message';
  showIcon = false;
  iconType: string | null = null;
  type: NzAlertType = 'info';
  onClose = jasmine.createSpy('close callback');
}

@Component({
  imports: [NzAlertModule],
  template: `<nz-alert nzBanner></nz-alert>`
})
export class NzDemoTestBannerComponent {}

@Component({
  imports: [NzDemoTestBasicComponent, BidiModule],
  template: `
    <div [dir]="direction">
      <nz-test-basic-alert></nz-test-basic-alert>
    </div>
  `
})
export class NzTestAlertRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}

@Component({
  imports: [NzAlertModule],
  template: `
    <nz-alert
      nzType="success"
      nzMessage="Success Tips"
      nzDescription="Detailed description and advices about successful copywriting."
      [nzIcon]="customIconTemplate"
      nzShowIcon
    ></nz-alert>

    <ng-template #customIconTemplate>
      <div> S </div>
    </ng-template>
  `
})
export class NzTestAlertCustomIconComponent {}

describe('NzAlertComponent', () => {
  let component: NzAlertComponent;
  let fixture: ComponentFixture<NzAlertComponent>;
  let cdr: ChangeDetectorRef;
  let configChangeEvent$: Subject<string>;

  beforeEach(() => {
    configChangeEvent$ = new Subject<string>();
    const nzConfigServiceSpy = jasmine.createSpyObj('NzConfigService', {
      getConfigChangeEventForComponent: configChangeEvent$.asObservable(),
      getConfigForComponent: {}
    });

    TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        { provide: NzConfigService, useValue: nzConfigServiceSpy },
        {
          provide: ChangeDetectorRef,
          useValue: jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck', 'detectChanges'])
        }
      ]
    });

    fixture = TestBed.createComponent(NzAlertComponent);
    component = fixture.componentInstance;
    cdr = TestBed.inject(ChangeDetectorRef);
    fixture.detectChanges();
    cdr.markForCheck();
  });

  it('should set iconTheme based on nzDescription', () => {
    component.nzDescription = 'Test Description';

    component.ngOnChanges({
      nzDescription: {
        currentValue: 'Test Description',
        firstChange: true,
        isFirstChange: () => true,
        previousValue: undefined
      }
    });

    expect(component.iconTheme).toBe('outline');

    component.nzDescription = null;
    component.ngOnChanges({
      nzDescription: {
        currentValue: null,
        firstChange: false,
        isFirstChange: () => false,
        previousValue: 'Test Description'
      }
    });

    expect(component.iconTheme).toBe('fill');
  });

  it('should call cdr.markForCheck on config change event', async () => {
    fixture.detectChanges();
    spyOn(cdr, 'markForCheck');

    configChangeEvent$.next('alert');
    await fixture.whenStable();
    expect(cdr.markForCheck).toHaveBeenCalled();
  });
});

describe('NzAlertComponent Animation', () => {
  let component: NzAlertComponent;
  let fixture: ComponentFixture<NzAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()],
      animationsEnabled: true
    });

    fixture = TestBed.createComponent(NzAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add animation classes and emit onClose when animation ends', () => {
    spyOn(component.nzOnClose, 'emit');
    const element = fixture.nativeElement.querySelector('.ant-alert');
    const mockEvent = {
      target: element,
      animationComplete: jasmine.createSpy('animationComplete')
    } as NzSafeAny;

    component.onLeaveAnimationDone(mockEvent);

    expect(element.classList).toContain('ant-alert-motion-leave');
    expect(element.classList).toContain('ant-alert-motion-leave-active');
    expect(component.nzOnClose.emit).not.toHaveBeenCalled();
    expect(mockEvent.animationComplete).not.toHaveBeenCalled();

    const transitionEndEvent = new Event('transitionend');
    element.dispatchEvent(transitionEndEvent);

    expect(component.nzOnClose.emit).toHaveBeenCalledWith(true);
    expect(mockEvent.animationComplete).toHaveBeenCalled();
  });

  it('should handle no animation', () => {
    component.nzNoAnimation = true;
    spyOn(component.nzOnClose, 'emit');
    const element = fixture.nativeElement.querySelector('.ant-alert');
    const mockEvent = {
      target: element,
      animationComplete: jasmine.createSpy('animationComplete')
    } as NzSafeAny;

    component.onLeaveAnimationDone(mockEvent);

    expect(element.classList).not.toContain('ant-alert-motion-leave');
    expect(mockEvent.animationComplete).toHaveBeenCalled();
  });
});
