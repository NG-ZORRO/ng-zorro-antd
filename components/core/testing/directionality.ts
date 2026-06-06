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
      expect(debugElement.nativeElement.className).not.toContain(rtlClass);

      dir.valueSignal.set('rtl');
      detectChanges();
      await fixture.whenStable();
      expect(debugElement.nativeElement.className).toContain(rtlClass);

      dir.valueSignal.set('ltr');
      detectChanges();
      await fixture.whenStable();
      expect(debugElement.nativeElement.className).not.toContain(rtlClass);
    });
  });
}
