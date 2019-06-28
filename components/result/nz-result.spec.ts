import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzIconModule } from '../icon';

import { NzResultComponent } from './nz-result.component';
import { NzResultModule } from './nz-result.module';

@Component({
  template: `
    <nz-result [nzIcon]="icon" [nzTitle]="title" [nzSubTitle]="subtitle" [nzExtra]="extra">
      <i nz-icon nz-result-icon type="up" theme="outline"></i>
      <div nz-result-title>Content Title</div>
      <nz-result-subtitle>Content Subtitle</nz-result-subtitle>
      <nz-result-content>
        Content
      </nz-result-content>
      <nz-result-extra>Content Extra</nz-result-extra>
    </nz-result>
  `
})
export class NzTestResultBasicComponent {
  icon?: string = 'success';
  title?: string = 'Title';
  subtitle?: string = 'Subtitle';
  extra?: string = 'Extra';
}

describe('nz-result', () => {
  let fixture: ComponentFixture<NzTestResultBasicComponent>;
  let testComponent: NzTestResultBasicComponent;
  let resultEl: DebugElement;

  describe('basic', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule, NzResultModule, NzIconModule],
        declarations: [NzTestResultBasicComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(NzTestResultBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      resultEl = fixture.debugElement.query(By.directive(NzResultComponent));
    });

    it('should props work', () => {
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.ant-result-icon-view');
      const titleView = resultEl.nativeElement.querySelector('.ant-result-title-view');
      const contentView = resultEl.nativeElement.querySelector('.ant-result-content');
      const extraView = resultEl.nativeElement.querySelector('.ant-result-extra-view');
      expect(resultEl.nativeElement.classList).toContain('ant-result');
      expect(iconView.classList).toContain('success');
      expect(iconView.firstElementChild.tagName).toBe('I');
      expect(iconView.firstElementChild.classList).toContain('anticon-check-circle');
      expect(titleView.querySelector('.ant-result-title-view-title').innerText).toBe('Title');
      expect(titleView.querySelector('.ant-result-title-view-subtitle').innerText).toBe('Subtitle');
      expect(contentView.tagName).toBe('NZ-RESULT-CONTENT');
      expect(contentView.innerText).toBe('Content');
      expect(extraView.innerText).toBe('Extra');
    });

    it('should content work', () => {
      testComponent.icon = testComponent.title = testComponent.subtitle = testComponent.extra = undefined;
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.ant-result-icon-view');
      const titleView = resultEl.nativeElement.querySelector('.ant-result-title-view');
      const contentView = resultEl.nativeElement.querySelector('.ant-result-content');
      const extraView = resultEl.nativeElement.querySelector('.ant-result-extra-view');
      expect(resultEl.nativeElement.classList).toContain('ant-result');
      expect(iconView.firstElementChild.tagName).toBe('I');
      expect(iconView.firstElementChild.classList).toContain('anticon-up');
      expect(iconView.classList).not.toContain('success');
      expect(titleView.querySelector('.ant-result-title-view-title').tagName).toBe('DIV');
      expect(titleView.querySelector('.ant-result-title-view-title').innerText).toBe('Content Title');
      expect(titleView.querySelector('.ant-result-title-view-subtitle').tagName).toBe('NZ-RESULT-SUBTITLE');
      expect(titleView.querySelector('.ant-result-title-view-subtitle').innerText).toBe('Content Subtitle');
      expect(contentView.tagName).toBe('NZ-RESULT-CONTENT');
      expect(contentView.innerText).toBe('Content');
      expect(extraView.tagName).toBe('NZ-RESULT-EXTRA');
      expect(extraView.innerText).toBe('Content Extra');
    });
  });
});
