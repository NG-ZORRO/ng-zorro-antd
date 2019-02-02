import { Injectable } from '@angular/core';
import { NzMenuService } from '../menu/nz-menu.service';

@Injectable()
export class NzMenuDropdownService extends NzMenuService {
  isInDropDown = true;
}
