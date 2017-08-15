import { NgModule } from '@angular/core';
import { NzIntroGetStartedComponent } from './nz-intro-get-started.component'
import { NzHighlightModule } from '../share/nz-highlight/nz-highlight.module';
import { NzMarkdownModule } from '../share/nz-markdown/nz-markdown.module';
import { CommonModule } from '@angular/common';
import { NzIntroGetStartedRoutingModule } from './nz-intro-get-started.routing.module';

@NgModule({
  imports     : [ CommonModule, NzHighlightModule, NzIntroGetStartedRoutingModule, NzMarkdownModule ],
  declarations: [ NzIntroGetStartedComponent ]
})

export class NzIntroGetStartedModule {

}
