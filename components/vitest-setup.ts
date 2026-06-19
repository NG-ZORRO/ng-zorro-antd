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

import { expect, vi } from 'vitest';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

type SpyFunction = ReturnType<typeof vi.fn> & {
  and: {
    callFake: (fn: (...args: NzSafeAny[]) => NzSafeAny) => SpyFunction;
    callThrough: () => SpyFunction;
    returnValue: (value: NzSafeAny) => SpyFunction;
    returnValues: (...values: NzSafeAny[]) => SpyFunction;
    throwError: (error: Error | string) => SpyFunction;
    stub: () => SpyFunction;
  };
  calls: {
    allArgs: () => NzSafeAny[][];
    any: () => boolean;
    argsFor: (index: number) => NzSafeAny[];
    count: () => number;
    mostRecent: () => { args: NzSafeAny[]; returnValue: NzSafeAny };
    reset: () => void;
  };
};

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

function patchSpy<T extends ReturnType<typeof vi.fn>>(
  spy: T,
  originalFn?: (...args: NzSafeAny[]) => NzSafeAny
): T & SpyFunction {
  const patched = spy as T & SpyFunction;

  patched.and = {
    callFake: fn => {
      patched.mockImplementation(fn);
      return patched;
    },
    callThrough: () => {
      if (originalFn) {
        patched.mockImplementation(originalFn);
      }
      return patched;
    },
    returnValue: value => {
      patched.mockImplementation(function jasmineReturnValueMock() {
        return value;
      });
      return patched;
    },
    returnValues: (...values) => {
      values.forEach(value =>
        patched.mockImplementationOnce(function jasmineReturnValuesMock() {
          return value;
        })
      );
      return patched;
    },
    throwError: error => {
      patched.mockImplementation(() => {
        throw typeof error === 'string' ? new Error(error) : error;
      });
      return patched;
    },
    stub: () => {
      patched.mockImplementation(() => undefined);
      return patched;
    }
  };

  patched.calls = {
    allArgs: () => patched.mock.calls,
    any: () => patched.mock.calls.length > 0,
    argsFor: index => patched.mock.calls[index],
    count: () => patched.mock.calls.length,
    mostRecent: () => {
      const calls = patched.mock.calls;
      const results = patched.mock.results;
      const index = calls.length - 1;
      return { args: calls[index], returnValue: results[index]?.value };
    },
    reset: () => patched.mockClear()
  };

  return patched;
}

registerLocaleData(zh);

const originalConsoleWarn = console.warn;

afterEach(() => {
  // Fake timers can keep destroyed components alive and fire in a later spec
  // file. Clear them before restoring mocks and browser globals.
  if ((vi as NzSafeAny).isFakeTimers?.()) {
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

function createSpy(name?: string, originalFn?: (...args: NzSafeAny[]) => NzSafeAny): SpyFunction {
  return patchSpy(vi.fn(originalFn).mockName(name ?? 'unknown'));
}

function createSpyObj<T extends Record<string, NzSafeAny>>(
  baseName: string,
  methodNames: string[] | Record<string, NzSafeAny>,
  propertyNames: string[] | Record<string, NzSafeAny> = []
): T {
  const spyObject: Record<string, NzSafeAny> = {};
  const defineSpy = (name: string, value?: NzSafeAny, hasReturnValue = false): void => {
    const spy = createSpy(`${baseName}.${name}`);
    if (hasReturnValue) {
      spy.and.returnValue(value);
    }
    spyObject[name] = spy;
  };

  if (Array.isArray(methodNames)) {
    methodNames.forEach(name => defineSpy(name));
  } else {
    Object.entries(methodNames).forEach(([name, value]) => defineSpy(name, value, true));
  }

  if (Array.isArray(propertyNames)) {
    propertyNames.forEach(name => Object.defineProperty(spyObject, name, { configurable: true, value: undefined }));
  } else {
    Object.entries(propertyNames).forEach(([name, value]) =>
      Object.defineProperty(spyObject, name, { configurable: true, value })
    );
  }

  return spyObject as T;
}

function spyOn<T extends object, K extends keyof T>(object: T, methodName: K): SpyFunction {
  const originalFn = object[methodName] as NzSafeAny;
  const patched = patchSpy(vi.spyOn(object, methodName as NzSafeAny), originalFn);
  return patched.and.stub();
}

function spyOnProperty<T extends object, K extends keyof T>(
  object: T,
  propertyName: K,
  accessType: 'get' | 'set' = 'get'
): SpyFunction {
  return patchSpy(
    accessType === 'get'
      ? vi.spyOn(object, propertyName as NzSafeAny, 'get')
      : vi.spyOn(object, propertyName as NzSafeAny, 'set')
  );
}

expect.extend({
  toBeFalse(received: NzSafeAny) {
    return {
      pass: received === false,
      message: () => `expected ${String(received)} to be false`
    };
  },
  toBeTrue(received: NzSafeAny) {
    return {
      pass: received === true,
      message: () => `expected ${String(received)} to be true`
    };
  },
  toHaveClass(received: Element, className: string) {
    const pass = received.classList.contains(className);
    return {
      pass,
      message: () => `expected element ${pass ? 'not ' : ''}to have class "${className}"`
    };
  },
  toHaveSize(received: { length?: number; size?: number }, expected: number) {
    const actual = typeof received.length === 'number' ? received.length : received.size;
    const pass = actual === expected;
    return {
      pass,
      message: () => `expected collection size ${actual} ${pass ? 'not ' : ''}to be ${expected}`
    };
  }
});

window.matchMedia = (query: string) => createMediaQueryList(query);

Object.assign(globalThis, {
  xdescribe: (describe as NzSafeAny).skip,
  xit: (it as NzSafeAny).skip,
  jasmine: {
    any: expect.any,
    anything: expect.anything,
    arrayContaining: expect.arrayContaining,
    clock: () => ({
      install: () => vi.useFakeTimers(),
      mockDate: (date: Date) => vi.setSystemTime(date),
      tick: (ms = 0) => vi.advanceTimersByTime(ms),
      uninstall: () => {
        vi.clearAllTimers();
        vi.useRealTimers();
      }
    }),
    createSpy,
    createSpyObj,
    objectContaining: expect.objectContaining,
    stringMatching: expect.stringMatching
  },
  spyOn,
  spyOnProperty,
  viewport: {
    reset: () => resetViewportSize(),
    set: (width: number, height?: number) => setViewportSize(width, height)
  }
});
