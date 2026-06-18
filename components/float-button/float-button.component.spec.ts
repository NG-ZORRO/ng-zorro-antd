/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { testDirectionality } from 'ng-zorro-antd/core/testing';
import { NzShapeSCType } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzFloatButtonComponent } from './float-button.component';
import { NzFloatButtonModule } from './float-button.module';
import { NzFloatButtonBadge, NzFloatButtonType } from './typings';

describe('float-button', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNzNoAnimation()]
    });
  });

  describe('basic', () => {
    let fixture: ComponentFixture<NzTestFloatButtonBasicComponent>;
    let testComponent: NzTestFloatButtonBasicComponent;
    let resultEl: DebugElement;
    let floatButtonComponent: NzFloatButtonComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFloatButtonBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      resultEl = fixture.debugElement.query(By.directive(NzFloatButtonComponent));
      floatButtonComponent = resultEl.componentInstance;
    });

    it('nzType', () => {
      testComponent.nzType.set('primary');
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.ant-float-btn > .ant-btn-primary');
      expect(view.tagName).toBe('BUTTON');
    });

    it('nzShape', () => {
      testComponent.nzShape.set('square');
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-float-btn-square');
    });

    it('nzHref && nzTarget', () => {
      testComponent.nzTarget.set('_blank');
      testComponent.nzHref.set('https://ng.ant.design/');
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.ant-float-btn > .ant-btn');
      expect(view.getAttribute('href') === 'https://ng.ant.design/').toBe(true);
      expect(view.getAttribute('target') === '_blank').toBe(true);
    });

    it('nzIcon', () => {
      testComponent.nzIcon.set(testComponent.icon);
      fixture.detectChanges();
      const view = resultEl.nativeElement.getElementsByClassName('anticon-question-circle')[0];
      expect(view.getAttribute('nztype') === 'question-circle').toBe(true);
    });

    it('should nzIcon support passing nzType string only', () => {
      testComponent.nzIcon.set('file-search');
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('nz-icon');
      expect(view.classList).toContain('anticon-file-search');
    });

    it('nzOnClick', () => {
      resultEl.nativeElement.getElementsByClassName('ant-btn')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(testComponent.isClick()).toBe(true);
    });

    it('nzBadge', () => {
      expect(resultEl.nativeElement.querySelector('.ant-badge')).toBeNull();
      expect(floatButtonComponent.nzBadge()).toBeNull();
      testComponent.nzBadge.set({ nzCount: 5 });
      fixture.detectChanges();
      expect(floatButtonComponent.nzBadge()).toEqual({
        nzCount: 5
      });
      expect(resultEl.nativeElement.querySelector('.ant-badge')).toBeTruthy();
    });
  });

  testDirectionality(() => NzTestFloatButtonBasicComponent, By.directive(NzFloatButtonComponent), 'ant-float-btn');
});

@Component({
  selector: 'nz-test-basic-float-button',
  imports: [NzFloatButtonModule, NzIconModule],
  template: `
    <nz-float-button
      [nzIcon]="nzIcon()"
      [nzDescription]="nzDescription()"
      [nzHref]="nzHref()"
      [nzTarget]="nzTarget()"
      [nzType]="nzType()"
      [nzShape]="nzShape()"
      [nzBadge]="nzBadge()"
      (nzOnClick)="onClick($event)"
    />
    <ng-template #icon>
      <nz-icon nzType="question-circle" nzTheme="outline" />
    </ng-template>
    <ng-template #description>HELP</ng-template>
  `
})
export class NzTestFloatButtonBasicComponent {
  readonly nzHref = signal<string | null>(null);
  readonly nzTarget = signal<string | null>(null);
  readonly nzType = signal<NzFloatButtonType>('default');
  readonly nzShape = signal<NzShapeSCType>('circle');
  readonly nzIcon = signal<string | TemplateRef<void> | null>(null);
  readonly nzDescription = signal<TemplateRef<void> | null>(null);
  readonly nzBadge = signal<NzFloatButtonBadge | null>(null);

  @ViewChild('icon', { static: false }) icon!: TemplateRef<void>;
  @ViewChild('description', { static: false }) description!: TemplateRef<void>;

  readonly isClick = signal(false);

  onClick(value: boolean): void {
    this.isClick.set(value);
  }
}
