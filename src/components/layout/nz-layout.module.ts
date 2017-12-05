import { NgModule } from '@angular/core';
import { NzLayoutComponent } from './nz-layout.component';
import { NzHeaderComponent } from './nz-header.component';
import { NzContentComponent } from './nz-content.component';
import { NzFooterComponent } from './nz-footer.component';
import { NzSiderComponent } from './nz-sider.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent ],
  exports     : [ NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent ],
  imports     : [ CommonModule ]
})
export class NzLayoutModule {
}
