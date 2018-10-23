import { Component, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzAlertComponent } from './nz-alert.component';
import { NzAlertModule } from './nz-alert.module';

describe('alert', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzAlertModule, NoopAnimationsModule ],
      declarations: [ NzDemoTestBasicComponent, NzDemoTestBannerComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('basic alert', () => {
    let fixture;
    let testComponent;
    let alert;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoTestBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      alert = fixture.debugElement.query(By.directive(NzAlertComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.firstElementChild.classList).toContain('ant-alert');
    });
    it('should banner work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.firstElementChild.classList).not.toContain('ant-alert-banner');
      expect(alert.nativeElement.querySelector('.ant-alert').classList).toContain(`ant-alert-info`);
      expect(alert.nativeElement.querySelector('.ant-alert-icon')).toBeNull();
      testComponent.banner = true;
      fixture.detectChanges();
      expect(alert.nativeElement.firstElementChild.classList).toContain('ant-alert-banner');
      expect(alert.nativeElement.querySelector('.ant-alert').classList).toContain(`ant-alert-info`);
      expect(alert.nativeElement.querySelector('.ant-alert-icon')).toBeNull();
    });
    it('should closeable work', fakeAsync(() => {
      testComponent.closeable = true;
      fixture.detectChanges();
      expect(testComponent.onClose).toHaveBeenCalledTimes(0);
      expect(alert.nativeElement.querySelector('.anticon-close')).toBeDefined();
      alert.nativeElement.querySelector('.ant-alert-close-icon').click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      alert = fixture.debugElement.query(By.directive(NzAlertComponent));
      expect(alert.nativeElement.innerText).toBe('');
      expect(testComponent.onClose).toHaveBeenCalledTimes(1);
    }));
    it('should closeText work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.ant-alert-close-icon')).toBeNull();
      testComponent.closeText = 'closeText';
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.ant-alert-close-icon').innerText).toBe('closeText');
      testComponent.closeText = testComponent.template;
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.ant-alert-close-icon').innerText).toBe('template');
    });
    it('should description work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.ant-alert-description').innerText).toBe('description');
      testComponent.description = testComponent.template;
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.ant-alert-description').innerText).toBe('template');
    });
    it('should message work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.ant-alert-message').innerText).toBe('message');
      testComponent.message = testComponent.template;
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.ant-alert-message').innerText).toBe('template');
    });
    it('should showIcon work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.ant-alert-icon')).toBeNull();
      testComponent.showIcon = true;
      expect(alert.nativeElement.querySelector('.ant-alert-icon')).toBeDefined();
    });
    it('should iconType work', () => {
      fixture.detectChanges();
      testComponent.showIcon = true;
      testComponent.iconType = 'anticon anticon-lock';
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.ant-alert-icon').classList).toContain('anticon');
      expect(alert.nativeElement.querySelector('.ant-alert-icon').classList).toContain('anticon-lock');
    });
    it('should type work', () => {
      const listOfType = [ 'success', 'info', 'warning', 'error' ];
      listOfType.forEach(type => {
        testComponent.type = type;
        fixture.detectChanges();
        expect(alert.nativeElement.querySelector('.ant-alert').classList).toContain(`ant-alert-${type}`);
      });
    });
  });
  describe('banner alert', () => {
    let fixture;
    let testComponent;
    let alert;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoTestBannerComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      alert = fixture.debugElement.query(By.directive(NzAlertComponent));
    });
    it('should banner work', () => {
      fixture.detectChanges();
      expect(alert.nativeElement.querySelector('.ant-alert').classList).toContain(`ant-alert-warning`);
      expect(alert.nativeElement.querySelector('.ant-alert-icon')).toBeDefined();
    });
  });
});

@Component({
  selector: 'nz-test-alert-basic',
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
      (nzOnClose)="onClose($event)">
    </nz-alert>
  `
})
export class NzDemoTestBasicComponent {
  @ViewChild('template') template: TemplateRef<void>;
  banner = false;
  closeable = false;
  closeText;
  description = 'description';
  message = 'message';
  showIcon = false;
  iconType;
  type = 'info';
  onClose = jasmine.createSpy('close callback');
}

@Component({
  selector: 'nz-test-alert-banner',
  template: `
    <nz-alert nzBanner>
    </nz-alert>
  `
})
export class NzDemoTestBannerComponent {
}
