/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ApplicationRef, Component, DebugElement, destroyPlatform, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { bootstrapApplication, By } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';

import { vi } from 'vitest';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { FontType } from './typings';
import { NzWatermarkComponent } from './watermark.component';
import { NzWatermarkModule } from './watermark.module';

describe('watermark', () => {
  let fixture: ComponentFixture<NzTestWatermarkBasicComponent>;
  let testComponent: NzTestWatermarkBasicComponent;
  let resultEl: DebugElement;
  let mockSrcSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Keep the Image.prototype.src spy per spec. A beforeAll spy leaks into
    // later browser specs and can call a destroyed watermark instance.
    mockSrcSpy = vi.spyOn(Image.prototype, 'src', 'set');
    fixture = TestBed.createComponent(NzTestWatermarkBasicComponent);
    testComponent = fixture.debugElement.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzWatermarkComponent));
    mockSrcSpy.mockImplementation(() => {
      resultEl.componentInstance['onImageLoad']?.();
    });
  });

  afterEach(() => {
    mockSrcSpy.mockRestore();
  });

  it('basic', async () => {
    testComponent.nzContent.set('NG Ant Design');
    fixture.detectChanges();
    await fixture.whenStable();
    const view = resultEl.nativeElement.querySelector('.watermark > div');
    expect(view).toBeTruthy();
    expect(view.tagName).toBe('DIV');
  });

  it('image', async () => {
    testComponent.nzImage.set(
      'https://img.alicdn.com/imgextra/i3/O1CN01UR3Zkq1va9fnZsZcr_!!6000000006188-55-tps-424-64.svg'
    );
    fixture.detectChanges();
    await fixture.whenStable();
    const view = resultEl.nativeElement.querySelector('.watermark > div');
    expect(view).toBeTruthy();
    expect(view.tagName).toBe('DIV');
  });

  it('invalid image', async () => {
    mockSrcSpy.mockImplementation(() => {
      resultEl.componentInstance['onImageError']?.();
    });
    testComponent.nzImage.set('https://img.alicdn.com/test.svg');
    fixture.detectChanges();
    await fixture.whenStable();
    const view = resultEl.nativeElement.querySelector('.watermark > div');
    expect(view).toBeTruthy();
    expect(view.tagName).toBe('DIV');
  });

  it('should offset work', async () => {
    testComponent.nzContent.set(['Angular', 'NG Ant Design']);
    testComponent.nzOffset.set([200, 200]);
    fixture.detectChanges();
    await fixture.whenStable();

    const view = resultEl.nativeElement.querySelector('.watermark > div');
    expect(view?.style.left).toBe('150px');
    expect(view?.style.top).toBe('150px');
    expect(view?.style.width).toBe('calc(100% - 150px)');
    expect(view?.style.height).toBe('calc(100% - 150px)');
  });

  it('should backgroundSize work', async () => {
    testComponent.nzContent.set('NG Ant Design');
    testComponent.nzGap.set([100, 100]);
    testComponent.nzWidth.set(200);
    testComponent.nzHeight.set(200);
    fixture.detectChanges();
    await fixture.whenStable();

    const view = resultEl.nativeElement.querySelector('.watermark > div');
    expect(view?.style.backgroundSize).toBe('600px');
  });

  it('should MutationObserver work', async () => {
    testComponent.nzContent.set('NG Ant Design');
    fixture.detectChanges();
    await fixture.whenStable();

    const view = resultEl.nativeElement.querySelector('.watermark > div');
    view?.remove();
    await fixture.whenStable();

    expect(view).toBeTruthy();
  });

  it('should observe the modification of style', async () => {
    testComponent.nzContent.set('NG Ant Design');
    fixture.detectChanges();
    await fixture.whenStable();

    const view = resultEl.nativeElement.querySelector('.watermark > div');
    view?.setAttribute('style', '');
    await fixture.whenStable();

    expect(view.style).toBeTruthy();
  });
});

describe('watermark (SSR)', () => {
  // TODO: Move this SSR assertion to a Node-based Vitest environment. The browser runner cannot create
  // the server platform required by `renderApplication`.
  (it as NzSafeAny).skip('should render water mark on server', async () => {
    // `as any` because `ngDevMode` is not exposed on the global namespace typings.
    const ngDevMode = (globalThis as NzSafeAny)['ngDevMode'];

    try {
      // Disable development-mode checks for these tests (we don't care).
      (globalThis as NzSafeAny)['ngDevMode'] = false;
      // Enter server mode for the duration of this function.
      globalThis['ngServerMode'] = true;

      const bootstrap = (): Promise<ApplicationRef> => bootstrapApplication(NzTestWatermarkBasicComponent);
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
      [nzContent]="nzContent()"
      [nzWidth]="nzWidth()"
      [nzHeight]="nzHeight()"
      [nzRotate]="nzRotate()"
      [nzZIndex]="nzZIndex()"
      [nzImage]="nzImage()"
      [nzFont]="nzFont()"
      [nzGap]="nzGap()"
      [nzOffset]="nzOffset()"
      class="watermark"
    />
  `
})
export class NzTestWatermarkBasicComponent {
  readonly nzContent = signal<string | string[]>('NG Ant Design');
  readonly nzWidth = signal(120);
  readonly nzHeight = signal(64);
  readonly nzRotate = signal(-22);
  readonly nzZIndex = signal(9);
  readonly nzImage = signal('');
  readonly nzFont = signal<FontType>({});
  readonly nzGap = signal<[number, number]>([100, 100]);
  readonly nzOffset = signal<[number, number]>([50, 50]);
}
