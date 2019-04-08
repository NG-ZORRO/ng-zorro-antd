import { NzMenuBaseService } from 'ng-zorro-antd/core';

import { NzMenuService } from './nz-menu.service';

export function NzMenuServiceFactory(
  higherOrderService: NzMenuBaseService,
  menuService: NzMenuService
): NzMenuBaseService {
  return higherOrderService ? higherOrderService : menuService;
}
