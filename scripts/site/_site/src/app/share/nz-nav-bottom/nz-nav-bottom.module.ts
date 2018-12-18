import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzNavBottomComponent } from './nz-nav-bottom.component';

@NgModule({
  imports     : [ CommonModule, RouterModule, NgZorroAntdModule ],
  declarations: [ NzNavBottomComponent ],
  exports     : [ NzNavBottomComponent ]
})
export class NzNavBottomModule {

}
