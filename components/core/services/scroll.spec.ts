/* tslint:disable:no-unused-variable no-inferrable-types no-any prefer-const */
import { DOCUMENT, PlatformLocation } from '@angular/common';
import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NzScrollService } from './scroll';

describe('NzScrollService', () => {
  const TOP: number = 10;
  let injector: Injector;
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
    injector = TestBed.configureTestingModule({
      providers: [
        NzScrollService,
        { provide: DOCUMENT, useClass: MockDocument },
        { provide: PlatformLocation, useClass: MockPlatformLocation }
      ]
    });

    document = injector.get<MockDocument>(DOCUMENT);
    scrollService = injector.get(NzScrollService);
  });

  describe('#setScrollTop', () => {
    it(`should scroll to window ${TOP} x`, () => {
      scrollService.setScrollTop(window, TOP);
      expect(document.body.scrollTop).toBe(TOP);
      scrollService.setScrollTop(window, 0);
    });

    it(`should scroll to dom element ${TOP} x`, () => {
      let el: Element = new MockElement() as any;
      scrollService.setScrollTop(el, TOP);
      expect(el.scrollTop).toBe(TOP);
      scrollService.setScrollTop(el, 0);
    });
  });
});
