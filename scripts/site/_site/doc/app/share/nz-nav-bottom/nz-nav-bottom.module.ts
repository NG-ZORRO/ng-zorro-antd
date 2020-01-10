import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNavBottomComponent } from './nz-nav-bottom.component';

@NgModule({
  imports: [CommonModule, RouterModule, NzIconModule],
  declarations: [NzNavBottomComponent],
  exports: [NzNavBottomComponent]
})
export class NzNavBottomModule {}
