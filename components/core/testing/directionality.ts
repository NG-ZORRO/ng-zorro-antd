/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { EnvironmentProviders, makeEnvironmentProviders, signal } from '@angular/core';
import { Subject } from 'rxjs';

class MockDirectionality {
  value = 'ltr';
  change = new Subject();
  valueSignal = signal('ltr');
}

export function provideMockDirectionality(): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: Directionality, useClass: MockDirectionality }]);
}
