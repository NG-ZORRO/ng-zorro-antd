/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import {
  createAliObjectsLoader,
  createCloudinaryLoader,
  createImgixLoader,
  defaultImageSrcLoader,
  isFixedSize,
  normalizeSrc,
  NzImageModule,
  NzImageSrcLoader
} from 'ng-zorro-antd/experimental/image';
import { NzImageService } from 'ng-zorro-antd/image';

describe('Experimental', () => {
  let fixture: ComponentFixture<TestImageExperimentalBaseComponent>;
  let context: TestImageExperimentalBaseComponent;
  let debugElement: DebugElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [NzImageService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestImageExperimentalBaseComponent);
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

describe('NzSrcLoader', () => {
  const src = 'test.jpg';
  const width = 100;

  it('#aliObjectsLoader', () => {
    const aliObjectsLoader = createAliObjectsLoader('https://zos.alipayobjects.com/rmsportal');
    expect(
      aliObjectsLoader({
        src,
        width
      })
    ).toBe(`https://zos.alipayobjects.com/rmsportal/${src}?x-oss-process=image/resize,w_${width}`);
    expect(aliObjectsLoader({ src })).toBe(`https://zos.alipayobjects.com/rmsportal/${src}`);
  });

  it('#imgixLoader', () => {
    const imgixLoader = createImgixLoader('https://static.imgix.net');
    expect(imgixLoader({ src, width })).toBe(`https://static.imgix.net/${src}?format=auto&fit=max&w=${width}`);
    expect(imgixLoader({ src })).toBe(`https://static.imgix.net/${src}?format=auto`);
  });

  it('#cloudinaryLoader', () => {
    const cloudinaryLoader = createCloudinaryLoader('https://res.cloudinary.com/demo/image/upload');
    expect(
      cloudinaryLoader({
        src,
        width
      })
    ).toBe(`https://res.cloudinary.com/demo/image/upload/c_limit,q_auto,w_${width}/${src}`);
    expect(cloudinaryLoader({ src })).toBe(`https://res.cloudinary.com/demo/image/upload/c_limit,q_auto/${src}`);
  });
});

@Component({
  imports: [NzImageModule],
  template: `
    <nz-image
      [nzSrc]="src"
      [nzAutoSrcset]="autoSrc"
      [nzSrcLoader]="loader"
      [nzWidth]="width"
      nzHeight="200"
      nzAlt="test"
    ></nz-image>
  `
})
export class TestImageExperimentalBaseComponent {
  src = '';
  autoSrc = false;
  loader = defaultImageSrcLoader;
  width = 200;
}
