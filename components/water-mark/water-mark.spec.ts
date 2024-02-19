import { BidiModule } from '@angular/cdk/bidi';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FontType } from './typings';
import { NzWaterMarkComponent } from './water-mark.component';
import { NzWaterMarkModule } from './water-mark.module';

describe('water-mark', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, NzWaterMarkModule],
      declarations: [NzTestWaterMarkBasicComponent]
    });
    TestBed.compileComponents();
  }));

  describe('water-mark basic', () => {
    let fixture: ComponentFixture<NzTestWaterMarkBasicComponent>;
    let testComponent: NzTestWaterMarkBasicComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestWaterMarkBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      resultEl = fixture.debugElement.query(By.directive(NzWaterMarkComponent));
    });

    it('basic water-mark', () => {
      testComponent.nzContent = 'NG Ant Design';
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.water-mark > div');
      expect(view.tagName).toBe('DIV');
    });

    it('image water-mark', () => {
      testComponent.nzImage =
        'https://img.alicdn.com/imgextra/i3/O1CN01UR3Zkq1va9fnZsZcr_!!6000000006188-55-tps-424-64.svg';
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.water-mark > div');
      expect(view.tagName).toBe('DIV');
    });

    it('Invalid image water-mark', () => {
      testComponent.nzImage = 'https://img.alicdn.com/test.svg';
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.water-mark > div');
      expect(view.tagName).toBe('DIV');
    });

    it('offset water-mark', () => {
      testComponent.nzContent = ['Angular', 'NG Ant Design'];
      testComponent.nzOffset = [200, 200];
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.water-mark > div');
      expect(view?.style.left).toBe('150px');
      expect(view?.style.top).toBe('150px');
      expect(view?.style.width).toBe('calc(100% - 150px)');
      expect(view?.style.height).toBe('calc(100% - 150px)');
    });

    it('backgroundSize water-mark', () => {
      testComponent.nzContent = 'NG Ant Design';
      testComponent.nzGap = [100, 100];
      testComponent.nzWidth = 200;
      testComponent.nzHeight = 200;
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.water-mark > div');
      expect(view?.style.backgroundSize).toBe('600px');
    });

    it('MutationObserver should work properly', fakeAsync(() => {
      testComponent.nzContent = 'NG Ant Design';
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.water-mark > div');
      view?.remove();
      tick(100);
      expect(view).toBeTruthy();
    }));

    it('Observe the modification of style', fakeAsync(() => {
      testComponent.nzContent = 'NG Ant Design';
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.water-mark > div');
      view?.setAttribute('style', '');
      tick(100);
      expect(view.style).toBeTruthy();
    }));
  });
});

@Component({
  // eslint-disable-next-line
  selector: 'nz-test-basic-water-mark',
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

  constructor() {}
}
