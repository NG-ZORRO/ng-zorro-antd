import { Injectable } from '@angular/core';
import { NzMenuService } from './nz-menu.service';

@Injectable()
export class NzMenuMenuService extends NzMenuService {
  isInDropDown = false;
}
