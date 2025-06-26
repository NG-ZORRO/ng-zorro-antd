/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ApplicationRef, Component, DebugElement, destroyPlatform } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { bootstrapApplication, By } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { FontType } from './typings';
import { NzWaterMarkComponent } from './water-mark.component';
import { NzWaterMarkModule } from './water-mark.module';

describe('water-mark', () => {
  let fixture: ComponentFixture<NzTestWaterMarkBasicComponent>;
  let testComponent: NzTestWaterMarkBasicComponent;
  let resultEl: DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestWaterMarkBasicComponent);
    fixture.detectChanges();
    testComponent = fixture.debugElement.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzWaterMarkComponent));
  });

  it('basic', () => {
    testComponent.nzContent = 'NG Ant Design';
    fixture.detectChanges();
    const view = resultEl.nativeElement.querySelector('.water-mark > div');
    expect(view.tagName).toBe('DIV');
  });

  it('image', () => {
    testComponent.nzImage =
      'https://img.alicdn.com/imgextra/i3/O1CN01UR3Zkq1va9fnZsZcr_!!6000000006188-55-tps-424-64.svg';
    fixture.detectChanges();
    const view = resultEl.nativeElement.querySelector('.water-mark > div');
    expect(view.tagName).toBe('DIV');
  });

  it('invalid image', () => {
    testComponent.nzImage = 'https://img.alicdn.com/test.svg';
    fixture.detectChanges();
    const view = resultEl.nativeElement.querySelector('.water-mark > div');
    expect(view.tagName).toBe('DIV');
  });

  it('should offset work', () => {
    testComponent.nzContent = ['Angular', 'NG Ant Design'];
    testComponent.nzOffset = [200, 200];
    fixture.detectChanges();
    const view = resultEl.nativeElement.querySelector('.water-mark > div');
    expect(view?.style.left).toBe('150px');
    expect(view?.style.top).toBe('150px');
    expect(view?.style.width).toBe('calc(100% - 150px)');
    expect(view?.style.height).toBe('calc(100% - 150px)');
  });

  it('should backgroundSize work', () => {
    testComponent.nzContent = 'NG Ant Design';
    testComponent.nzGap = [100, 100];
    testComponent.nzWidth = 200;
    testComponent.nzHeight = 200;
    fixture.detectChanges();
    const view = resultEl.nativeElement.querySelector('.water-mark > div');
    expect(view?.style.backgroundSize).toBe('600px');
  });

  it('should MutationObserver work', fakeAsync(() => {
    testComponent.nzContent = 'NG Ant Design';
    fixture.detectChanges();
    const view = resultEl.nativeElement.querySelector('.water-mark > div');
    view?.remove();
    tick(100);
    expect(view).toBeTruthy();
  }));

  it('should observe the modification of style', fakeAsync(() => {
    testComponent.nzContent = 'NG Ant Design';
    fixture.detectChanges();
    const view = resultEl.nativeElement.querySelector('.water-mark > div');
    view?.setAttribute('style', '');
    tick(100);
    expect(view.style).toBeTruthy();
  }));
});

describe('water-mark (SSR)', () => {
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
        bootstrapApplication(NzTestWaterMarkBasicComponent, { providers: [] });
      const html = await renderApplication(bootstrap, {
        document: '<html><head></head><body><nz-app></nz-app></body></html>'
      });

      expect(html).toContain('<nz-water-mark class="ant-water-mark water-mark">');
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
  selector: 'nz-app',
  imports: [NzWaterMarkModule],
  template: `
    <nz-water-mark
      [nzContent]="nzContent"
      [nzWidth]="nzWidth"
      [nzHeight]="nzHeight"
      [nzRotate]="nzRotate"
      [nzZIndex]="nzZIndex"
      [nzImage]="nzImage"
      [nzFont]="nzFont"
      [nzGap]="nzGap"
      [nzOffset]="nzOffset"
      class="water-mark"
    >
    </nz-water-mark>
  `
})
export class NzTestWaterMarkBasicComponent {
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
