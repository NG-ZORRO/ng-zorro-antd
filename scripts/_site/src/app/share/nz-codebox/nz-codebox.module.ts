import { NgModule } from '@angular/core';
import { NzCodeBoxComponent } from './nz-codebox.component';
import { CommonModule } from '@angular/common';
import { NzHighlightModule } from '../nz-highlight/nz-highlight.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports     : [ CommonModule, NzHighlightModule, NgZorroAntdModule ],
  declarations: [ NzCodeBoxComponent ],
  exports     : [ NzCodeBoxComponent ]
})

export class NzCodeBoxModule {
}

