/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { testDirectionality } from 'ng-zorro-antd/core/testing';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzResultComponent, NzResultStatusType } from './result.component';
import { NzResultModule } from './result.module';

@Component({
  selector: 'nz-test-basic-result',
  imports: [NzIconModule, NzResultModule],
  template: `
    <nz-result
      [nzIcon]="icon()"
      [nzStatus]="status()"
      [nzTitle]="title()"
      [nzSubTitle]="subtitle()"
      [nzExtra]="extra()"
    >
      <nz-icon nz-result-icon nzType="up" nzTheme="outline" />
      <div nz-result-title>Content Title</div>
      <div nz-result-subtitle>Content SubTitle</div>
      <div nz-result-content>Content</div>
      <div nz-result-extra>Content Extra</div>
    </nz-result>
  `
})
export class NzTestResultBasicComponent {
  readonly icon = signal<string | undefined>('success');
  readonly title = signal<string | undefined>('Title');
  readonly status = signal<NzResultStatusType>('error');
  readonly subtitle = signal<string | undefined>('SubTitle');
  readonly extra = signal<string | undefined>('Extra');
}

@Component({
  selector: 'nz-test-status-icon-result',
  imports: [NzResultModule],
  template: `<nz-result [nzStatus]="status()" nzTitle="Test Title" />`
})
export class NzTestResultStatusIconComponent {
  readonly status = signal<NzResultStatusType>('success');
}

describe('nz-result', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<NzTestResultBasicComponent>;
    let testComponent: NzTestResultBasicComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNzIconsTesting()]
      });

      fixture = TestBed.createComponent(NzTestResultBasicComponent);
      testComponent = fixture.componentInstance;
      resultEl = fixture.debugElement.query(By.directive(NzResultComponent));
    });

    it('should props work and overlap contents', () => {
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.ant-result-icon');
      const titleView = resultEl.nativeElement.querySelector('.ant-result-title');
      const subTitleView = resultEl.nativeElement.querySelector('.ant-result-subtitle');
      const extraView = resultEl.nativeElement.querySelector('.ant-result-extra');

      expect(resultEl.nativeElement.classList).toContain('ant-result');
      expect(resultEl.nativeElement.classList).toContain('ant-result-error'); // should status work
      expect(iconView.firstElementChild.classList).toContain('anticon-check-circle'); // icon overlap status
      expect(titleView.innerText).toBe('Title');
      expect(subTitleView.innerText).toBe('SubTitle');
      expect(extraView.innerText).toBe('Extra');
    });

    it('should content work', () => {
      testComponent.icon.set(undefined);
      testComponent.title.set(undefined);
      testComponent.subtitle.set(undefined);
      testComponent.extra.set(undefined);
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.ant-result-icon');
      const titleView = resultEl.nativeElement.querySelector('.ant-result-title');
      const subTitleView = resultEl.nativeElement.querySelector('.ant-result-subtitle');
      const contentView = resultEl.nativeElement.querySelector('.ant-result-content');
      const extraView = resultEl.nativeElement.querySelector('.ant-result-extra');

      expect(resultEl.nativeElement.classList).toContain('ant-result');
      expect(iconView.firstElementChild.classList).toContain('anticon-up');
      expect(titleView.innerText).toBe('Content Title');
      expect(subTitleView.innerText).toBe('Content SubTitle');
      expect(contentView.innerText).toBe('Content');
      expect(extraView.innerText).toBe('Content Extra');
    });

    it('should icon overlap status', () => {
      testComponent.icon.set('smile-o');
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.ant-result-icon');

      expect(resultEl.nativeElement.classList).toContain('ant-result');
      expect(resultEl.nativeElement.classList).toContain('ant-result-error'); // should status work
      expect(iconView.firstElementChild.classList).toContain('anticon-smile-o');
    });
  });

  testDirectionality(() => NzTestResultBasicComponent, By.directive(NzResultComponent), 'ant-result');

  describe('default icon from status', () => {
    let fixture: ComponentFixture<NzTestResultStatusIconComponent>;
    let testComponent: NzTestResultStatusIconComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNzIconsTesting()]
      });

      fixture = TestBed.createComponent(NzTestResultStatusIconComponent);
      testComponent = fixture.componentInstance;
      resultEl = fixture.debugElement.query(By.directive(NzResultComponent));
    });

    it('should show default icon based on status when nzIcon is not provided', () => {
      testComponent.status.set('success');
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.ant-result-icon');
      expect(iconView.firstElementChild.classList).toContain('anticon-check-circle');
    });

    it('should show info icon when status is info', () => {
      testComponent.status.set('info');
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.ant-result-icon');
      expect(iconView.firstElementChild.classList).toContain('anticon-exclamation-circle');
    });

    it('should show warning icon when status is warning', () => {
      testComponent.status.set('warning');
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.ant-result-icon');
      expect(iconView.firstElementChild.classList).toContain('anticon-warning');
    });

    it('should show error icon when status is error', () => {
      testComponent.status.set('error');
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.ant-result-icon');
      expect(iconView.firstElementChild.classList).toContain('anticon-close-circle');
    });
  });
});
