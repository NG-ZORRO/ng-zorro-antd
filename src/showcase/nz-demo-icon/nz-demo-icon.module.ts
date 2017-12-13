import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMarkdownModule } from '../share/nz-markdown/nz-markdown.module';

import { NzDemoIconComponent } from './nz-demo-icon.component';
import { NzIconCopyDirective } from './nz-icon-copy.directive';
import { NzCodeBoxModule } from '../share/nz-codebox/nz-codebox.module';

import { NzDemoIconRoutingModule } from './nz-demo-icon.routing.module';

import { NgZorroAntdModule } from '../../../index.showcase';

@NgModule({
  imports     : [ NzDemoIconRoutingModule, NzMarkdownModule, CommonModule, NzCodeBoxModule, NgZorroAntdModule ],
  declarations: [ NzDemoIconComponent, NzIconCopyDirective ]
})
export class NzDemoIconModule {

}
