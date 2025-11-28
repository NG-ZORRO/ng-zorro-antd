/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { PlatformLocation } from '@angular/common';
import { ApplicationRef, DOCUMENT, NgZone, provideZoneChangeDetection } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzScrollService } from './scroll';

describe('NzScrollService', () => {
  const TOP = 10;
  let document: MockDocument;
  let scrollService: NzScrollService;

  class MockDocument {
    body = new MockElement();
    documentElement = new MockDocumentElement();
  }

  class MockDocumentElement {
    scrollTop = jasmine.createSpy('scrollTop');
  }

  class MockElement {
    scrollTop = jasmine.createSpy('scrollTop');
  }

  class MockPlatformLocation {
    hash!: string;
  }

  beforeEach(() => {
    spyOn(window, 'scrollBy');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // todo: use zoneless
        provideZoneChangeDetection(),
        NzScrollService,
        { provide: DOCUMENT, useClass: MockDocument },
        { provide: PlatformLocation, useClass: MockPlatformLocation }
      ]
    });

    document = TestBed.inject<MockDocument>(DOCUMENT);
    scrollService = TestBed.inject(NzScrollService);
  });

  describe('#setScrollTop', () => {
    it(`should scroll to window ${TOP} x`, () => {
      scrollService.setScrollTop(window, TOP);
      expect(document.body.scrollTop).toBe(TOP);
      scrollService.setScrollTop(window, 0);
    });

    it(`should scroll to dom element ${TOP} x`, () => {
      const el: Element = new MockElement() as NzSafeAny;
      scrollService.setScrollTop(el, TOP);
      expect(el.scrollTop).toBe(TOP);
      scrollService.setScrollTop(el, 0);
    });
  });

  describe('#getOffset', () => {
    it(`should be working`, () => {
      const ret = scrollService.getOffset({
        ownerDocument: {
          documentElement: {
            clientTop: 1,
            clientLeft: 1
          }
        },
        getClientRects: () => [0],
        getBoundingClientRect: () => ({ top: 10, left: 10, width: 100, height: 100 })
      } as NzSafeAny);
      expect(ret.left).toBe(9);
      expect(ret.top).toBe(9);
    });

    it(`should be return 0 when is no getClientRects`, () => {
      const ret = scrollService.getOffset({ getClientRects: () => [] } as NzSafeAny);
      expect(ret.left).toBe(0);
      expect(ret.top).toBe(0);
    });

    it(`should be return element top when element is not size`, () => {
      const ret = scrollService.getOffset({
        getClientRects: () => [0],
        getBoundingClientRect: () => ({ top: 1, left: 1 })
      } as NzSafeAny);
      expect(ret.left).toBe(1);
      expect(ret.top).toBe(1);
    });
  });

  describe('#getScroll', () => {
    it('should be return scrollTop when target is window', () => {
      const mockWin: NzSafeAny = { pageYOffset: 10 };
      mockWin.window = mockWin;
      expect(scrollService.getScroll(mockWin)).toBe(10);
    });
    it('should be return scrollTop when target is html element', () => {
      const mockEl: NzSafeAny = { scrollTop: 10 };
      expect(scrollService.getScroll(mockEl)).toBe(10);
    });
  });

  describe('change detection behavior', () => {
    // The `requestAnimationFrame` is mocked as `setTimeout(fn, 16)`.
    const tickAnimationFrame = (): void => tick(16);

    it('should not trigger change detection when calling `scrollTo`', fakeAsync(() => {
      const appRef = TestBed.inject(ApplicationRef);
      spyOn(appRef, 'tick');

      scrollService.scrollTo();

      tickAnimationFrame();

      expect(appRef.tick).not.toHaveBeenCalled();
    }));

    it('should call the custom callback within the Angular zone', fakeAsync(() => {
      let callbackHasBeenCalledWithinTheAngularZone = false;

      scrollService.scrollTo(undefined, undefined, {
        duration: 0,
        callback: () => {
          callbackHasBeenCalledWithinTheAngularZone = NgZone.isInAngularZone();
        }
      });

      tickAnimationFrame();

      expect(callbackHasBeenCalledWithinTheAngularZone).toBeTrue();
    }));
  });
});
