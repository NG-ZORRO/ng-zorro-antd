import { Injectable } from '@angular/core';

import { NzMenuBaseService } from 'ng-zorro-antd/core';

@Injectable()
export class NzMenuService extends NzMenuBaseService {
  isInDropDown = false;
}
