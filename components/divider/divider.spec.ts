/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzDividerComponent } from './divider.component';
import { NzDividerModule } from './divider.module';

describe('divider', () => {
  let fixture: ComponentFixture<TestDividerComponent>;
  let context: TestDividerComponent;
  let dl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
    fixture = TestBed.createComponent(TestDividerComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('#nzDashed', () => {
    for (const value of [true, false]) {
      it(`[${value}]`, () => {
        context.nzDashed = value;
        fixture.detectChanges();
        expect(dl.query(By.css('.ant-divider-dashed')) != null).toBe(value);
      });
    }
  });

  describe('#nzType', () => {
    for (const value of ['horizontal', 'vertical'] as const) {
      it(`[${value}]`, () => {
        context.nzType = value;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-divider-${value}`)) != null).toBe(true);
      });
    }
  });

  describe('#nzText', () => {
    for (const item of [
      { text: 'with text', ret: true },
      { text: undefined, ret: false }
    ]) {
      it(`[${item.text}]`, () => {
        context.nzText = item.text;
        fixture.detectChanges();
        expect(dl.query(By.css('.ant-divider-inner-text')) != null).toBe(item.ret);
      });
    }

    it('should be custom template', () => {
      const fixture = TestBed.createComponent(TestDividerTextTemplateComponent);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.anticon-plus')) != null).toBe(true);
    });
  });

  describe('#nzOrientation', () => {
    (['center', 'left', 'right'] as const).forEach(type => {
      it(`with ${type}`, () => {
        context.nzOrientation = type;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-divider-with-text-${type}`)) != null).toBe(true);
      });
    });
  });

  describe('#nzVariant', () => {
    (['dashed', 'dotted'] as const).forEach(type => {
      it(`with ${type}`, () => {
        context.comp.nzVariant = type;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-divider-${type}`)) != null).toBe(true);
      });
    });

    it('should have solid as default value for nzVariant', () => {
      expect(context.comp.nzVariant).toEqual('solid');
    });
  });
});

@Component({
  imports: [NzDividerModule],
  template: `
    <nz-divider
      #comp
      [nzDashed]="nzDashed"
      [nzType]="nzType"
      [nzText]="nzText"
      [nzOrientation]="nzOrientation"
    ></nz-divider>
  `
})
class TestDividerComponent {
  @ViewChild('comp', { static: false }) comp!: NzDividerComponent;
  nzDashed = false;
  nzType: 'vertical' | 'horizontal' = 'horizontal';
  nzText?: string = 'with text';
  nzOrientation!: 'left' | 'right' | 'center';
}

@Component({
  imports: [NzDividerModule, NzIconModule],
  template: `
    <nz-divider nzDashed [nzText]="text">
      <ng-template #text>
        <nz-icon nzType="plus" />
        Add
      </ng-template>
    </nz-divider>
  `
})
class TestDividerTextTemplateComponent {}
