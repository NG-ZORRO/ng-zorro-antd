import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { RouterList } from '../types';

@Component({
  selector: 'app-side',
  imports: [RouterLink, NzMenuModule, NzTagModule],
  templateUrl: './side.component.html',
  styleUrl: './side.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideComponent {
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Input() page: 'docs' | 'components' | 'experimental' | string = 'docs';
  @Input() routerList: RouterList = {} as RouterList;
  @Input() language: 'zh' | 'en' = 'en';
}
