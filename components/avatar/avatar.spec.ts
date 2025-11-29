/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { createFakeEvent, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { NzSafeAny, NzShapeSCType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzAvatarGroupComponent } from './avatar-group.component';
import { NzAvatarComponent } from './avatar.component';
import { NzAvatarModule } from './avatar.module';

const imageBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

function getType(dl: DebugElement): string {
  const el = dl.nativeElement as HTMLElement;
  if (el.querySelector('img') != null) {
    return 'image';
  }
  if (el.querySelector('.anticon') != null) {
    return 'icon';
  }
  return el.innerText.trim().length === 0 ? '' : 'text';
}

describe('avatar group', () => {
  let fixture: ComponentFixture<TestAvatarGroupComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({});
    fixture = TestBed.createComponent(TestAvatarGroupComponent);
    fixture.autoDetectChanges();
  });

  it('should avatar group work', async () => {
    await fixture.whenStable();
    const avatarGroup = fixture.debugElement.query(By.directive(NzAvatarGroupComponent));
    expect(avatarGroup.nativeElement.classList).toContain('ant-avatar-group');
  });
});

describe('avatar', () => {
  let fixture: ComponentFixture<TestAvatarComponent>;
  let context: TestAvatarComponent;
  let dl: DebugElement;

  function getImageElement(): HTMLImageElement {
    return dl.query(By.css('img')).nativeElement;
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });

    fixture = TestBed.createComponent(TestAvatarComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  describe('#nzSrc', () => {
    it('#nzSrc', () => {
      expect(context).not.toBeNull();
    });

    it('should tolerate error src', async () => {
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      expect(context.comp.hasSrc).toBe(true);
      // Manually dispatch error.
      context.nzSrc = '';
      await updateNonSignalsInput(fixture);
      context.comp.imgError(event);
      await updateNonSignalsInput(fixture);
      expect(getType(dl)).toBe('icon');
      expect(context.comp.hasSrc).toBe(false);
      context.nzSrc = imageBase64;
      await updateNonSignalsInput(fixture);
      expect(context.comp.hasSrc).toBe(true);
      expect(getType(dl)).toBe('image');
    });

    it('should prevent default fallback when error src', async () => {
      const event = createFakeEvent('error');
      event.preventDefault();
      expect(getType(dl)).toBe('image');
      expect(context.comp.hasSrc).toBe(true);
      // Manually dispatch error.
      context.nzSrc = 'Invalid image src';
      await updateNonSignalsInput(fixture);
      context.comp.imgError(event);
      expect(getType(dl)).toBe('image');
      expect(context.comp.hasSrc).toBe(true);
      context.nzSrc = imageBase64;
      await updateNonSignalsInput(fixture);
      expect(context.comp.hasSrc).toBe(true);
      expect(getType(dl)).toBe('image');
    });

    it('#nzSrcSet', async () => {
      context.nzSrcSet = '1.png';
      await updateNonSignalsInput(fixture);
      const el = getImageElement();
      expect(el.srcset).toBe(context.nzSrcSet);
    });

    it('#nzAlt', async () => {
      context.nzAlt = 'alt';
      await updateNonSignalsInput(fixture);
      const el = getImageElement();
      expect(el.alt).toBe(context.nzAlt);
    });
  });

  it('#nzIcon', async () => {
    context.nzSrc = undefined;
    context.nzText = undefined;
    await updateNonSignalsInput(fixture);
    expect(getType(dl)).toBe('icon');
  });

  describe('#nzText', () => {
    beforeEach(async () => {
      context.nzSrc = undefined;
      context.nzIcon = undefined;
      await updateNonSignalsInput(fixture);
    });

    it('property', () => {
      expect(getType(dl)).toBe('text');
    });

    it('should be normal font-size', async () => {
      context.nzText = 'a';
      await updateNonSignalsInput(fixture);
      const scale = getScaleFromCSSTransform(dl.nativeElement.querySelector('.ant-avatar-string')!.style.transform!);
      expect(scale).toBe(1);
    });

    it('should be auto set font-size', async () => {
      context.nzText = 'LongUsername';
      await updateNonSignalsInput(fixture);
      context.comp['calcStringSize']();
      const scale = getScaleFromCSSTransform(dl.nativeElement.querySelector('.ant-avatar-string')!.style.transform!);
      expect(scale).toBeLessThan(1);
    });

    describe('nzGap', () => {
      let firstScale: number;
      let avatarText: HTMLElement;
      beforeEach(async () => {
        context.nzGap = 4;
        context.nzText = 'Username';
        await updateNonSignalsInput(fixture);
        avatarText = dl.nativeElement.querySelector('.ant-avatar-string')!;
        context.comp['calcStringSize']();
        firstScale = getScaleFromCSSTransform(avatarText.style.transform);
      });

      it('should be set gap', async () => {
        context.nzGap = 8;
        await updateNonSignalsInput(fixture);

        let scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toBeLessThan(firstScale);

        context.nzGap = 2;
        await updateNonSignalsInput(fixture);

        scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toBeGreaterThan(firstScale);
      });

      it('Should be set to default when the limit is exceeded', async () => {
        context.nzGap = 1000;
        await updateNonSignalsInput(fixture);

        let scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toEqual(firstScale);

        context.nzGap = -1000;
        await updateNonSignalsInput(fixture);

        scale = getScaleFromCSSTransform(avatarText.style.transform);
        expect(scale).toEqual(1);
      });
    });
  });

  describe('#nzShape', () => {
    for (const type of ['square', 'circle'] as const) {
      it(type, async () => {
        context.nzShape = type;
        await updateNonSignalsInput(fixture);
        expect(dl.query(By.css(`.ant-avatar-${type}`)) !== null).toBe(true);
      });
    }
  });

  describe('#nzSize', () => {
    for (const item of [
      { size: 'large', cls: 'lg' },
      { size: 'small', cls: 'sm' }
    ] as const) {
      it(item.size, async () => {
        context.nzSize = item.size;
        await updateNonSignalsInput(fixture);
        expect(dl.query(By.css(`.ant-avatar-${item.cls}`)) !== null).toBe(true);
      });
    }

    it('custom size', async () => {
      context.nzSize = 64;
      context.nzIcon = undefined;
      context.nzSrc = undefined;
      await updateNonSignalsInput(fixture);
      const size = `${64}px`;
      const hostStyle = dl.nativeElement.querySelector('nz-avatar').style;
      expect(hostStyle.height === size).toBe(true);
      expect(hostStyle.width === size).toBe(true);
      expect(hostStyle.lineHeight === size).toBe(true);
      expect(hostStyle.fontSize === ``).toBe(true);

      context.nzIcon = 'user';
      await updateNonSignalsInput(fixture);
      expect(hostStyle.fontSize === `${context.nzSize / 2}px`).toBe(true);
    });

    it('should set `lineHeight` on the text element considering `nzSize`', async () => {
      const size = 64;
      context.nzIcon = undefined;
      context.nzSrc = undefined;
      context.nzSize = size;
      context.nzText = 'LongUsername';
      await updateNonSignalsInput(fixture);
      const textEl = document.querySelector<HTMLElement>('.ant-avatar-string')!;
      context.comp['calcStringSize']();
      const scale = getScaleFromCSSTransform(textEl.style.transform);
      expect(scale).toBeLessThan(1);
      expect(textEl.style.lineHeight).toEqual(`${size}px`);
    });

    // this case will fail in local environment but pass in CI. Ignore it first.

    it('[IGNORE_LOCAL] should have 0 for avatarWidth if element.width is falsy`', async () => {
      const size = 64;
      context.nzIcon = undefined;
      context.nzSrc = undefined;
      context.nzSize = size;
      context.nzText = 'LongUsername';
      context.comp.hasText = true;

      await updateNonSignalsInput(fixture);
      const textEl = document.querySelector<HTMLElement>('.ant-avatar-string')!;
      (context.comp as NzSafeAny)['el'] = {
        getBoundingClientRect: function () {
          return {
            width: null
          };
        }
      };

      context.comp['calcStringSize']();

      const scale = getScaleFromCSSTransform(textEl.style.transform);

      // avatarWidth = 0
      // childrenWidth = 86
      // offset = 8
      // avatarWidth = 0
      // scale = (0 - 8) / 86
      expect(scale).toBe(-0.0930233);
    });
  });

  describe('[nzLoading]', () => {
    it('should set `loading` attribute to `eager` by default', () => {
      expect(getImageElement().loading).toEqual('eager');
    });

    it('should allow providing a binding for the `loading` attribute', async () => {
      context.nzLoading = 'lazy';
      await updateNonSignalsInput(fixture);
      expect(getImageElement().loading).toEqual('lazy');
    });
  });

  describe('[nzFetchPriority]', () => {
    it('should set `fetchpriority` attribute to `auto` by default', () => {
      expect(getImageElement().fetchPriority).toEqual('auto');
    });

    it('should allow providing a binding for the `fetchpriority` attribute', async () => {
      context.nzFetchPriority = 'high';
      await updateNonSignalsInput(fixture);
      expect(getImageElement().fetchPriority).toEqual('high');
    });
  });

  describe('order: image > icon > text', () => {
    it('image priority', () => {
      expect(getType(dl)).toBe('image');
    });

    it('should be show icon when image loaded error and icon exists', async () => {
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      context.comp.imgError(event);
      await updateNonSignalsInput(fixture);
      expect(getType(dl)).toBe('icon');
    });

    it('should be show text when image loaded error and icon not exists', async () => {
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      context.nzIcon = undefined;
      await updateNonSignalsInput(fixture);
      context.comp.imgError(event);
      await updateNonSignalsInput(fixture);
      expect(getType(dl)).toBe('text');
    });

    it('should be show empty when image loaded error and icon & text not exists', async () => {
      const event = createFakeEvent('error');
      expect(getType(dl)).toBe('image');
      context.nzIcon = undefined;
      context.nzText = undefined;
      await updateNonSignalsInput(fixture);
      context.comp.imgError(event);
      await updateNonSignalsInput(fixture);
      expect(getType(dl)).toBe('');
    });
  });
});

function getScaleFromCSSTransform(transform: string): number {
  return +/(\w+)\(([^)]*)\)/g.exec(transform)![2];
}

@Component({
  imports: [NzAvatarModule],
  template: `
    <nz-avatar
      #comp
      [nzShape]="nzShape"
      [nzSize]="nzSize"
      [nzIcon]="nzIcon"
      [nzText]="nzText"
      [nzGap]="nzGap"
      [nzSrc]="nzSrc"
      [nzSrcSet]="nzSrcSet"
      [nzAlt]="nzAlt"
      [nzLoading]="nzLoading"
      [nzFetchPriority]="nzFetchPriority"
    ></nz-avatar>
  `,
  styles: `
    @import '../style/testing.less';
    @import './style/index.less';
  `
})
class TestAvatarComponent {
  @ViewChild('comp', { static: false }) comp!: NzAvatarComponent;
  nzShape: NzShapeSCType = 'square';
  nzSize: NzSizeLDSType | number = 'large';
  nzGap = 4;
  nzIcon?: string = 'user';
  nzText?: string = 'A';
  nzSrc?: string = imageBase64;
  nzSrcSet?: string;
  nzAlt?: string;
  nzLoading?: 'eager' | 'lazy';
  nzFetchPriority?: 'high' | 'low' | 'auto';
}

@Component({
  imports: [NzAvatarModule],
  template: `<nz-avatar-group></nz-avatar-group>`
})
class TestAvatarGroupComponent {}
