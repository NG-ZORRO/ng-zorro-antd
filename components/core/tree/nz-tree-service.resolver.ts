import { InjectionToken } from '@angular/core';

import { NzTreeBaseService } from './nz-tree-base.service';

export const NzTreeHigherOrderServiceToken = new InjectionToken<NzTreeBaseService>('NzTreeHigherOrder');
