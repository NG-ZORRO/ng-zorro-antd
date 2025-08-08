/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzFloatButtonComponent } from './float-button.component';
import { NzFloatButtonModule } from './float-button.module';

describe('nz-float-button', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
  }));

  describe('float-button basic', () => {
    let fixture: ComponentFixture<NzTestFloatButtonBasicComponent>;
    let testComponent: NzTestFloatButtonBasicComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFloatButtonBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      resultEl = fixture.debugElement.query(By.directive(NzFloatButtonComponent));
    });

    it('nzType', () => {
      testComponent.nzType = 'primary';
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.ant-float-btn > .ant-btn-primary');
      expect(view.tagName).toBe('BUTTON');
    });

    it('nzShape', () => {
      testComponent.nzShape = 'square';
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-float-btn-square');
    });

    it('nzHref && nzTarget', () => {
      testComponent.nzTarget = '_blank';
      testComponent.nzHref = 'https://ng.ant.design/';
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.ant-float-btn > .ant-btn');
      expect(view.getAttribute('href') === 'https://ng.ant.design/').toBe(true);
      expect(view.getAttribute('target') === '_blank').toBe(true);
    });

    it('nzIcon', () => {
      testComponent.nzIcon = testComponent.icon;
      fixture.detectChanges();
      const view = resultEl.nativeElement.getElementsByClassName('anticon-question-circle')[0];
      expect(view.getAttribute('nztype') === 'question-circle').toBe(true);
    });

    it('should nzIcon support passing nzType string only', () => {
      testComponent.nzIcon = 'file-search';
      fixture.detectChanges();
      const view = resultEl.nativeElement.getElementsByClassName('anticon-question-circle')[0];
      expect(view.getAttribute('nztype') === 'file-search').toBe(true);
    });

    it('nzOnClick', () => {
      resultEl.nativeElement.getElementsByClassName('ant-btn')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(testComponent.isClick).toBe(true);
    });
  });
});

describe('nz-float-button RTL', () => {
  let fixture: ComponentFixture<NzTestFloatButtonRtlComponent>;
  let resultEl: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
    fixture = TestBed.createComponent(NzTestFloatButtonRtlComponent);
    resultEl = fixture.debugElement.query(By.directive(NzFloatButtonComponent));
  }));

  it('rtl', () => {
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).toContain('ant-float-btn-rtl');
  });
});

@Component({
  selector: 'nz-test-basic-float-button',
  imports: [NzFloatButtonModule, NzIconModule],
  template: `
    <nz-float-button
      [nzIcon]="nzIcon"
      [nzDescription]="nzDescription"
      [nzHref]="nzHref"
      [nzTarget]="nzTarget"
      [nzType]="nzType"
      [nzShape]="nzShape"
      (nzOnClick)="onClick($event)"
    ></nz-float-button>
    <ng-template #icon>
      <nz-icon nzType="question-circle" nzTheme="outline" />
    </ng-template>
    <ng-template #description>HELP</ng-template>
  `
})
export class NzTestFloatButtonBasicComponent {
  nzHref: string | null = null;
  nzTarget: string | null = null;
  nzType: 'default' | 'primary' = 'default';
  nzShape: 'circle' | 'square' = 'circle';
  nzIcon: string | TemplateRef<void> | null = null;
  nzDescription: TemplateRef<void> | null = null;

  @ViewChild('icon', { static: false }) icon!: TemplateRef<void>;
  @ViewChild('description', { static: false }) description!: TemplateRef<void>;

  isClick: boolean = false;

  onClick(value: boolean): void {
    this.isClick = value;
  }
}

@Component({
  imports: [BidiModule, NzFloatButtonModule],
  template: `
    <div [dir]="direction">
      <nz-float-button></nz-float-button>
    </div>
  `
})
export class NzTestFloatButtonRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}
