import { Component } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'nz-demo-list-responsive',
  imports: [NzCardModule, NzGridModule, NzListModule],
  template: `
    <nz-list nzGrid>
      <div nz-row [nzGutter]="16">
        @for (item of data; track item) {
          <div nz-col [nzXXl]="8" [nzXl]="4" [nzLg]="6" [nzMd]="6" [nzSm]="12" [nzXs]="24">
            <nz-list-item>
              <nz-card [nzTitle]="item.title">Card content</nz-card>
            </nz-list-item>
          </div>
        }
      </div>
    </nz-list>
  `
})
export class NzDemoListResponsiveComponent {
  data = [
    {
      title: 'Title 1'
    },
    {
      title: 'Title 2'
    },
    {
      title: 'Title 3'
    },
    {
      title: 'Title 4'
    },
    {
      title: 'Title 5'
    },
    {
      title: 'Title 6'
    }
  ];
}
