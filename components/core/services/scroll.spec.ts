/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { PlatformLocation } from '@angular/common';
import { ApplicationRef, DOCUMENT, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { vi } from 'vitest';

import { MockNgZone, nextAnimationFrame } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzScrollService } from './scroll';

describe('NzScrollService', () => {
  const TOP = 10;
  let document: MockDocument;
  let scrollService: NzScrollService;
  let ngZone: MockNgZone;

  class MockDocument {
    body = new MockElement();
    documentElement = new MockDocumentElement();
  }

  class MockDocumentElement {
    scrollTop = vi.fn();
  }

  class MockElement {
    scrollTop = vi.fn();
  }

  class MockPlatformLocation {
    hash!: string;
  }

  beforeEach(() => {
    vi.spyOn(window, 'scrollBy');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NzScrollService,
        { provide: DOCUMENT, useClass: MockDocument },
        { provide: PlatformLocation, useClass: MockPlatformLocation },
        { provide: NgZone, useClass: MockNgZone }
      ]
    });

    document = TestBed.inject<MockDocument>(DOCUMENT);
    scrollService = TestBed.inject(NzScrollService);
    ngZone = TestBed.inject(NgZone) as unknown as MockNgZone;
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
    it('should not trigger change detection when calling `scrollTo`', async () => {
      const appRef = TestBed.inject(ApplicationRef);
      vi.spyOn(appRef, 'tick');

      scrollService.scrollTo();
      await nextAnimationFrame();
      expect(appRef.tick).not.toHaveBeenCalled();
    });

    it('should call the custom callback within the Angular zone', async () => {
      let callbackCalled = false;
      vi.spyOn(ngZone, 'run');

      scrollService.scrollTo(undefined, undefined, {
        duration: 0,
        callback: () => {
          callbackCalled = true;
        }
      });

      await nextAnimationFrame();
      expect(ngZone.run).toHaveBeenCalled();
      expect(callbackCalled).toBe(true);
    });
  });
});
