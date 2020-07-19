import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { ShareModule } from '../share/share.module';
import { ComponentsOverviewComponent } from './components-overview.component';

const moduleList = [
  NzCardModule,
  NzButtonModule,
  NzTagModule,
  NzGridModule,
  NzTypographyModule,
  NzDividerModule,
  NzIconModule,
  NzInputModule
];

@NgModule({
  imports: [ShareModule, ...moduleList, RouterModule.forChild([{ path: '**', component: ComponentsOverviewComponent }])],
  declarations: [ComponentsOverviewComponent]
})
export class ComponentsOverviewModule {}
