import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NzDemoSelectBasicComponent } from './nz-demo-select-basic.component';
import { NzDemoSelectTemplateComponent } from './nz-demo-select-template.component';
import { NzDemoSelectPaginationComponent } from './nz-demo-select-pagination.component';
import { NzDemoSelectSizeComponent } from './nz-demo-select-size.component';
import { NzDemoSelectSearchComponent } from './nz-demo-select-search.component';
import { NzDemoSelectSearchChangeComponent } from './nz-demo-select-search-change.component';
import { NzDemoSelectMultipleComponent } from './nz-demo-select-multiple.component';
import { NzDemoSelectMultipleChangeComponent } from './nz-demo-select-multiple-change.component';
import { NzDemoSelectTagComponent } from './nz-demo-select-tag.component';
import { NzDemoSelectComponent } from './nz-demo-select.component';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';
import { NgZorroAntdModule } from '../../../index.showcase';

import { NzDemoSelectRoutingModule } from './nz-demo-select.routing.module';

@NgModule({
  imports     : [ NzDemoSelectRoutingModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule, FormsModule, JsonpModule ],
  declarations: [ NzDemoSelectTemplateComponent, NzDemoSelectPaginationComponent, NzDemoSelectBasicComponent, NzDemoSelectSizeComponent, NzDemoSelectSearchComponent, NzDemoSelectMultipleComponent, NzDemoSelectTagComponent, NzDemoSelectComponent, NzDemoSelectSearchChangeComponent, NzDemoSelectMultipleChangeComponent ],
})
export class NzDemoSelectModule {

}
