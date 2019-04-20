import { InjectionToken } from '@angular/core';

import { NzMenuBaseService } from './nz-menu-base.service';

export const NzDropdownHigherOrderServiceToken = new InjectionToken<NzMenuBaseService>('NzTreeHigherOrder');
