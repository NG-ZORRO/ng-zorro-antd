/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { defaultImageSrcLoader, isFixedSize, normalizeSrc, NzImageModule, NzImageSrcLoader } from 'ng-zorro-antd/experimental/image';

describe('Optimize', () => {
  let fixture: ComponentFixture<TestImageExperimentalOptimizeComponent>;
  let context: TestImageExperimentalOptimizeComponent;
  let debugElement: DebugElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestImageViewModule]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestImageExperimentalOptimizeComponent);
    context = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should be no srcset attribute by default', () => {
    const _src = 'test.jpg';
    const _encode = encodeURIComponent(_src);
    context.src = _src;
    fixture.detectChanges();
    const image = debugElement.nativeElement.querySelector('img') as HTMLImageElement;
    expect(image.src).toContain(_encode);
    expect(image.srcset).toBe('');
  });

  it('should nzAutoSrcset work', () => {
    const _src = 'test.jpg';
    const _encode = encodeURIComponent(_src);
    context.src = _src;
    context.autoSrc = true;
    fixture.detectChanges();
    const image = debugElement.nativeElement.querySelector('img') as HTMLImageElement;
    expect(image.src).toContain(_encode);
    expect(image.srcset).toBe(`${_encode} 1x, ${_encode} 2x`);
  });

  it('should nzSrcLoader work', () => {
    const _src = 'test.jpg';
    const _width = 100;
    const _loader: NzImageSrcLoader = ({ src, width }) => `${src}?w=${width}`;
    context.src = _src;
    context.width = _width;
    context.autoSrc = true;
    context.loader = _loader;
    fixture.detectChanges();
    const image = debugElement.nativeElement.querySelector('img') as HTMLImageElement;
    expect(image.src).toContain(`${_src}`);
    expect(image.srcset).toBe(`${_src}?w=128 1x, ${_src}?w=256 2x`);
  });
});

describe('Utils', () => {
  describe('isFixedSize', () => {
    it('should allow px unit', () => {
      expect(isFixedSize('12px')).toBe(true);
      expect(isFixedSize('px')).toBe(false);
      expect(isFixedSize('')).toBe(false);
    });
    it('should allow number', () => {
      expect(isFixedSize('12')).toBe(true);
      expect(isFixedSize(12)).toBe(true);
    });
  });

  describe('normalizeSrc', () => {
    it('should normalize src', () => {
      expect(normalizeSrc('/image.jpg')).toBe('image.jpg');
      expect(normalizeSrc('image.jpg')).toBe('image.jpg');
    });
  });
});

@Component({
  template: `
    <nz-image [nzSrc]="src" [nzAutoSrcset]="autoSrc" [nzSrcLoader]="loader" [nzWidth]="width" nzHeight="200" nzAlt="test"></nz-image>
  `
})
export class TestImageExperimentalOptimizeComponent {
  src = '';
  autoSrc = false;
  loader = defaultImageSrcLoader;
  width = 200;
}

const TEST_COMPONENTS = [TestImageExperimentalOptimizeComponent];

@NgModule({
  imports: [NzImageModule],
  declarations: [...TEST_COMPONENTS],
  exports: [...TEST_COMPONENTS]
})
export class TestImageViewModule {}
