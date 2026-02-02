/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ApplicationRef, Component, DebugElement, destroyPlatform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { bootstrapApplication, By } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { FontType } from './typings';
import { NzWatermarkComponent } from './watermark.component';
import { NzWatermarkModule } from './watermark.module';

describe('watermark', () => {
  let fixture: ComponentFixture<NzTestWatermarkBasicComponent>;
  let testComponent: NzTestWatermarkBasicComponent;
  let resultEl: DebugElement;
  let mockSrcSpy: jasmine.Spy;

  beforeAll(() => {
    mockSrcSpy = spyOnProperty(Image.prototype, 'src', 'set');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestWatermarkBasicComponent);
    testComponent = fixture.debugElement.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzWatermarkComponent));
    mockSrcSpy.and.callFake(() => {
      resultEl.componentInstance['onImageLoad']?.();
    });
  });

  it('basic', async () => {
    testComponent.nzContent = 'NG Ant Design';
    await fixture.whenStable();
    const view = resultEl.nativeElement.querySelector('.watermark > div');
    expect(view).toBeTruthy();
    expect(view.tagName).toBe('DIV');
  });

  it('image', async () => {
    testComponent.nzImage =
      'https://img.alicdn.com/imgextra/i3/O1CN01UR3Zkq1va9fnZsZcr_!!6000000006188-55-tps-424-64.svg';
    await fixture.whenStable();
    const view = resultEl.nativeElement.querySelector('.watermark > div');
    expect(view).toBeTruthy();
    expect(view.tagName).toBe('DIV');
  });

  it('invalid image', async () => {
    mockSrcSpy.and.callFake(() => {
      resultEl.componentInstance['onImageError']?.();
    });
    testComponent.nzImage = 'https://img.alicdn.com/test.svg';
    await fixture.whenStable();
    const view = resultEl.nativeElement.querySelector('.watermark > div');
    expect(view).toBeTruthy();
    expect(view.tagName).toBe('DIV');
  });

  it('should offset work', async () => {
    testComponent.nzContent = ['Angular', 'NG Ant Design'];
    testComponent.nzOffset = [200, 200];
    await fixture.whenStable();

    const view = resultEl.nativeElement.querySelector('.watermark > div');
    expect(view?.style.left).toBe('150px');
    expect(view?.style.top).toBe('150px');
    expect(view?.style.width).toBe('calc(100% - 150px)');
    expect(view?.style.height).toBe('calc(100% - 150px)');
  });

  it('should backgroundSize work', async () => {
    testComponent.nzContent = 'NG Ant Design';
    testComponent.nzGap = [100, 100];
    testComponent.nzWidth = 200;
    testComponent.nzHeight = 200;
    await fixture.whenStable();

    const view = resultEl.nativeElement.querySelector('.watermark > div');
    expect(view?.style.backgroundSize).toBe('600px');
  });

  it('should MutationObserver work', async () => {
    testComponent.nzContent = 'NG Ant Design';
    await fixture.whenStable();

    const view = resultEl.nativeElement.querySelector('.watermark > div');
    view?.remove();
    await fixture.whenStable();

    expect(view).toBeTruthy();
  });

  it('should observe the modification of style', async () => {
    testComponent.nzContent = 'NG Ant Design';
    await fixture.whenStable();

    const view = resultEl.nativeElement.querySelector('.watermark > div');
    view?.setAttribute('style', '');
    await fixture.whenStable();

    expect(view.style).toBeTruthy();
  });
});

describe('watermark (SSR)', () => {
  it('should render water mark on server', async () => {
    destroyPlatform();

    // `as any` because `ngDevMode` is not exposed on the global namespace typings.
    const ngDevMode = (globalThis as NzSafeAny)['ngDevMode'];

    try {
      // Disable development-mode checks for these tests (we don't care).
      (globalThis as NzSafeAny)['ngDevMode'] = false;
      // Enter server mode for the duration of this function.
      globalThis['ngServerMode'] = true;

      const bootstrap = (): Promise<ApplicationRef> =>
        bootstrapApplication(NzTestWatermarkBasicComponent, { providers: [] });
      const html = await renderApplication(bootstrap, {
        document: '<html><head></head><body><nz-test-watermark-basic></nz-test-watermark-basic></body></html>'
      });

      expect(html).toContain('<nz-watermark class="watermark"');
    } finally {
      // Restore the original value.
      (globalThis as NzSafeAny)['ngDevMode'] = ngDevMode;
      // Leave server mode so the remaining test is back in "client mode".
      globalThis['ngServerMode'] = undefined;
    }

    destroyPlatform();
  });
});

@Component({
  selector: 'nz-test-watermark-basic',
  imports: [NzWatermarkModule],
  template: `
    <nz-watermark
      [nzContent]="nzContent"
      [nzWidth]="nzWidth"
      [nzHeight]="nzHeight"
      [nzRotate]="nzRotate"
      [nzZIndex]="nzZIndex"
      [nzImage]="nzImage"
      [nzFont]="nzFont"
      [nzGap]="nzGap"
      [nzOffset]="nzOffset"
      class="watermark"
    />
  `
})
export class NzTestWatermarkBasicComponent {
  nzContent: string | string[] = 'NG Ant Design';
  nzWidth: number = 120;
  nzHeight: number = 64;
  nzRotate: number = -22;
  nzZIndex: number = 9;
  nzImage: string = '';
  nzFont: FontType = {};
  nzGap: [number, number] = [100, 100];
  nzOffset: [number, number] = [50, 50];
}
