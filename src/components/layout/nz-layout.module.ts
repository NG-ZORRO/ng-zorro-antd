import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzContentComponent } from './nz-content.component';
import { NzFooterComponent } from './nz-footer.component';
import { NzHeaderComponent } from './nz-header.component';
import { NzLayoutComponent } from './nz-layout.component';
import { NzSiderComponent } from './nz-sider.component';

@NgModule({
  declarations: [ NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent ],
  exports     : [ NzLayoutComponent, NzHeaderComponent, NzContentComponent, NzFooterComponent, NzSiderComponent ],
  imports     : [ CommonModule ]
})
export class NzLayoutModule {
}
