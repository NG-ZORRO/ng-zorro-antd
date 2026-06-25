/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// eslint-disable-next-line import/no-unassigned-import
import 'zone.js';
// eslint-disable-next-line import/no-unassigned-import
import 'zone.js/testing';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { vi } from 'vitest';

const originalViewport = {
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth,
  matchMedia: window.matchMedia?.bind(window)
};
const originalAnimationFrame = {
  cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
  requestAnimationFrame: window.requestAnimationFrame.bind(window)
};
const initialBodyChildren = new Set(Array.from(document.body.children));
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;

function setViewportSize(width: number, height = window.innerHeight): void {
  viewportWidth = width;
  viewportHeight = height;

  Object.defineProperty(window, 'innerWidth', { configurable: true, value: width });
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: height });
  window.dispatchEvent(new Event('resize'));
}

function resetViewportSize(): void {
  viewportWidth = originalViewport.innerWidth;
  viewportHeight = originalViewport.innerHeight;

  Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalViewport.innerWidth });
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: originalViewport.innerHeight });
  window.matchMedia = (query: string) => createMediaQueryList(query);
  document.documentElement.scrollTop = 0;
  document.documentElement.scrollLeft = 0;
  document.body.scrollTop = 0;
  document.body.scrollLeft = 0;
  window.scrollTo(0, 0);
}

function cleanupBody(): void {
  for (const child of Array.from(document.body.children)) {
    const element = child as HTMLElement;
    const isAngularTestRoot = /^root\d+$/.test(element.id);
    const isOverlayContainer = element.classList.contains('cdk-overlay-container');

    if (isOverlayContainer) {
      // Keep the CDK container node stable, but clear overlays that individual
      // specs forget to dispose. Removing the container itself breaks CDK reuse.
      element.innerHTML = '';
    } else if (!initialBodyChildren.has(child) && !isAngularTestRoot) {
      // Vitest browser tests reuse the document between specs. Preserve Angular
      // test roots, otherwise later TestBed fixtures can lose their host node.
      child.remove();
    }
  }
}

function createMediaQueryList(query: string): MediaQueryList {
  const minWidth = /min-width:\s*(\d+(?:\.\d+)?)px/.exec(query)?.[1];
  const maxWidth = /max-width:\s*(\d+(?:\.\d+)?)px/.exec(query)?.[1];
  const minHeight = /min-height:\s*(\d+(?:\.\d+)?)px/.exec(query)?.[1];
  const maxHeight = /max-height:\s*(\d+(?:\.\d+)?)px/.exec(query)?.[1];
  const matches =
    (!minWidth || viewportWidth >= Number(minWidth)) &&
    (!maxWidth || viewportWidth <= Number(maxWidth)) &&
    (!minHeight || viewportHeight >= Number(minHeight)) &&
    (!maxHeight || viewportHeight <= Number(maxHeight));

  return {
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches,
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn()
  };
}

registerLocaleData(zh);

const originalConsoleWarn = console.warn;

afterEach(() => {
  // Fake timers can keep destroyed components alive and fire in a later spec
  // file. Clear them before restoring mocks and browser globals.
  if (vi.isFakeTimers?.()) {
    vi.clearAllTimers();
    vi.useRealTimers();
  }
  // Restore mocks before resetting viewport/rAF so property spies on browser
  // globals do not overwrite the normalized test environment.
  vi.restoreAllMocks();
  window.cancelAnimationFrame = originalAnimationFrame.cancelAnimationFrame;
  window.requestAnimationFrame = originalAnimationFrame.requestAnimationFrame;
  resetViewportSize();
  cleanupBody();
  console.warn = originalConsoleWarn;
});

window.matchMedia = (query: string) => createMediaQueryList(query);

Object.assign(globalThis, {
  viewport: {
    reset: () => resetViewportSize(),
    set: (width: number, height?: number) => setViewportSize(width, height)
  }
});
