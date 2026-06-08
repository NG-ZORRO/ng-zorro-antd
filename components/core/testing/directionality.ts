/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  type Type,
  DebugElement,
  EnvironmentProviders,
  makeEnvironmentProviders,
  Provider,
  signal
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

class MockDirectionality {
  value = 'ltr';
  change = new Subject();
  valueSignal = signal('ltr');
}

export function provideMockDirectionality(): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: Directionality, useClass: MockDirectionality }]);
}

type Predicate<T> = (value: T) => boolean;

/**
 * Creates a `describe('RTL', ...)` block that verifies the component correctly toggles
 * an RTL CSS class when `Directionality.valueSignal` changes between 'ltr' and 'rtl'.
 *
 * Must be called at the top level of a spec file (outside any `describe` that has its own
 * `beforeEach` configuring TestBed), because it configures its own TestBed internally.
 *
 * @param componentFn Thunk returning the component class. Using a thunk avoids class hoisting
 *   issues — class declarations defined below the call site would be `undefined` at registration time.
 * @param predicate A `By.directive(...)` or `By.css(...)` predicate to locate the element
 *   that carries the RTL class. Use `By.css` when the RTL class is on a child element rather
 *   than the component host.
 * @param classnamePrefix The class prefix (e.g. `'ant-alert'`). The test asserts the presence
 *   of `${classnamePrefix}-rtl`.
 * @param options.detectChangesFn Custom change detection callback for components that need
 *   imperative updates beyond `fixture.detectChanges()` (e.g. calling a private method).
 * @param options.providers Additional providers needed by the component (e.g. `provideNzIconsTesting()`).
 */
export function testDirectionality<T>(
  componentFn: () => Type<T>,
  predicate: Predicate<DebugElement>,
  classnamePrefix: string,
  options?: {
    detectChangesFn?: (fixture: ComponentFixture<T>) => void;
    providers?: Array<Provider | EnvironmentProviders>;
  }
): void {
  const rtlClass = `${classnamePrefix}-rtl`;
  describe('RTL', () => {
    let fixture: ComponentFixture<T>;
    let dir: Directionality;

    function detectChanges(): void {
      if (options?.detectChangesFn) {
        options.detectChangesFn(fixture);
      } else {
        fixture.detectChanges();
      }
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideMockDirectionality(), ...(options?.providers || [])]
      });
      dir = TestBed.inject(Directionality);
      fixture = TestBed.createComponent(componentFn());
    });

    it('should className correct on dir change', async () => {
      detectChanges();
      fixture.autoDetectChanges();
      await fixture.whenStable();
      const debugElement = fixture.debugElement.query(predicate);
      expect(debugElement).toBeTruthy();
      expect(debugElement.nativeElement.classList.contains(rtlClass)).toBeFalse();

      dir.valueSignal.set('rtl');
      detectChanges();
      await fixture.whenStable();
      expect(debugElement.nativeElement.classList.contains(rtlClass)).toBeTrue();

      dir.valueSignal.set('ltr');
      detectChanges();
      await fixture.whenStable();
      expect(debugElement.nativeElement.classList.contains(rtlClass)).toBeFalse();
    });
  });
}
