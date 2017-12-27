import { NgModule } from '@angular/core';
import { NzIntroComponent } from './nz-intro.component';
import { NzHighlightModule } from '../share/nz-highlight/nz-highlight.module';
import { NzMarkdownModule } from '../share/nz-markdown/nz-markdown.module';
import { CommonModule } from '@angular/common';
import { NzIntroRoutingModule } from './nz-intro.routing.module';

@NgModule({
  imports     : [ CommonModule, NzHighlightModule, NzIntroRoutingModule, NzMarkdownModule ],
  declarations: [ NzIntroComponent ]
})

export class NzIntroModule {

}
