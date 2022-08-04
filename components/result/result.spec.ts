import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzResultComponent } from './result.component';
import { NzResultModule } from './result.module';

@Component({
  // eslint-disable-next-line
  selector: 'nz-test-basic-result',
  template: `
    <nz-result [nzIcon]="icon" [nzStatus]="status" [nzTitle]="title" [nzSubTitle]="subtitle" [nzExtra]="extra">
      <span nz-icon nz-result-icon nzType="up" nzTheme="outline"></span>
      <div nz-result-title>Content Title</div>
      <div nz-result-subtitle>Content SubTitle</div>
      <div nz-result-content>Content</div>
      <div nz-result-extra>Content Extra</div>
    </nz-result>
  `
})
export class NzTestResultBasicComponent {
  icon?: string = 'success';
  title?: string = 'Title';
  status?: string = 'error';
  subtitle?: string = 'SubTitle';
  extra?: string = 'Extra';
}

@Component({
  template: `
    <div [dir]="direction">
      <nz-test-basic-result></nz-test-basic-result>
    </div>
  `
})
export class NzTestResultRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}

describe('nz-result', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzTestResultBasicComponent>;
    let fixture: ComponentFixture<NzTestResultBasicComponent>;
    let testComponent: NzTestResultBasicComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzTestResultBasicComponent, {
        imports: [NzResultModule, NzIconModule]
      });
      fixture = testBed.fixture;
      testComponent = testBed.component;
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
      testComponent.icon =
        testComponent.title =
        testComponent.subtitle =
        testComponent.status =
        testComponent.extra =
          undefined;
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
      testComponent.icon = undefined;
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.ant-result-icon');

      expect(resultEl.nativeElement.classList).toContain('ant-result');
      expect(resultEl.nativeElement.classList).toContain('ant-result-error'); // should status work
      expect(iconView.firstElementChild.classList).toContain('anticon-close-circle');
    });
  });

  describe('RTL', () => {
    let testBed: ComponentBed<NzTestResultRtlComponent>;
    let fixture: ComponentFixture<NzTestResultRtlComponent>;
    let resultEl: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzTestResultRtlComponent, {
        imports: [BidiModule, NzResultModule, NzIconModule],
        declarations: [NzTestResultBasicComponent]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      resultEl = fixture.debugElement.query(By.directive(NzResultComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-result-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(resultEl.nativeElement.className).not.toContain('ant-result-rtl');
    });
  });
});
