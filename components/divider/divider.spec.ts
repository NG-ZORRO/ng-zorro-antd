/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal, ViewChild } from '@angular/core';
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
        context.nzDashed.set(value);
        fixture.detectChanges();
        expect(dl.query(By.css('.ant-divider-dashed')) != null).toBe(value);
      });
    }
  });

  describe('#nzType', () => {
    for (const value of ['horizontal', 'vertical'] as const) {
      it(`[${value}]`, () => {
        context.nzType.set(value);
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
        context.nzText.set(item.text);
        fixture.detectChanges();
        expect(dl.query(By.css('.ant-divider-inner-text')) != null).toBe(item.ret);
      });
    }

    it('should be custom template', () => {
      const fixture = TestBed.createComponent(TestDividerTextTemplateComponent);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.anticon-plus'))).not.toBeNull();
    });
  });

  describe('#nzOrientation', () => {
    (['center', 'left', 'right'] as const).forEach(type => {
      it(`with ${type}`, () => {
        context.nzOrientation.set(type);
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-divider-with-text-${type}`))).not.toBeNull();
      });
    });
  });

  describe('#nzVariant', () => {
    (['dashed', 'dotted'] as const).forEach(type => {
      it(`with ${type}`, () => {
        context.nzVariant.set(type);
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-divider-${type}`))).not.toBeNull();
      });
    });

    it('should have solid as default value for nzVariant', () => {
      expect(context.comp.nzVariant).toEqual('solid');
    });
  });

  describe('#nzPlain', () => {
    for (const value of [true, false]) {
      it(`[${value}]`, () => {
        context.nzPlain.set(value);
        fixture.detectChanges();
        expect(dl.query(By.css('.ant-divider-plain')) != null).toBe(value);
      });
    }
  });

  describe('#nzSize', () => {
    it('should not have size class by default', () => {
      fixture.detectChanges();
      const el = dl.query(By.css('.ant-divider'))!.nativeElement as HTMLElement;
      expect(el.classList.contains('ant-divider-sm')).toBe(false);
      expect(el.classList.contains('ant-divider-md')).toBe(false);
      expect(el.classList.contains('ant-divider-lg')).toBe(false);
    });

    (['small', 'middle', 'large'] as const).forEach(size => {
      it(`with ${size}`, () => {
        context.nzSize.set(size);
        fixture.detectChanges();
        const el = dl.query(By.css('.ant-divider'))!.nativeElement as HTMLElement;
        expect(el.classList.contains('ant-divider-sm')).toBe(size === 'small');
        expect(el.classList.contains('ant-divider-md')).toBe(size === 'middle');
        // Large size does not have a specific class; ensure no lg class is added
        expect(el.classList.contains('ant-divider-lg')).toBe(false);
      });
    });
  });

  describe('#with text class', () => {
    it('should have ant-divider-with-text when nzText set', () => {
      context.nzText.set('text');
      fixture.detectChanges();
      expect(dl.query(By.css('.ant-divider-with-text'))).not.toBeNull();
    });

    it('should not have ant-divider-with-text when nzText removed', () => {
      context.nzText.set(undefined);
      fixture.detectChanges();
      expect(dl.query(By.css('.ant-divider-with-text'))).toBeNull();
    });
  });
});

@Component({
  imports: [NzDividerModule],
  template: `
    <nz-divider
      #comp
      [nzDashed]="nzDashed()"
      [nzType]="nzType()"
      [nzText]="nzText()"
      [nzOrientation]="nzOrientation()"
      [nzVariant]="nzVariant()"
      [nzPlain]="nzPlain()"
      [nzSize]="nzSize()"
    />
  `
})
class TestDividerComponent {
  @ViewChild('comp', { static: false }) comp!: NzDividerComponent;
  readonly nzDashed = signal(false);
  readonly nzType = signal<'vertical' | 'horizontal'>('horizontal');
  readonly nzText = signal<string | undefined>('with text');
  readonly nzOrientation = signal<'left' | 'right' | 'center'>('center');
  readonly nzVariant = signal<'dashed' | 'dotted' | 'solid'>('solid');
  readonly nzPlain = signal(false);
  readonly nzSize = signal<'small' | 'middle' | 'large' | undefined>(undefined);
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
