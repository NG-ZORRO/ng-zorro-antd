import { NgModule } from '@angular/core';
import { NzIntroChangelogComponent } from './nz-intro-changelog.component'
import { NzHighlightModule } from '../share/nz-highlight/nz-highlight.module';
import { NzMarkdownModule } from '../share/nz-markdown/nz-markdown.module';
import { CommonModule } from '@angular/common';
import { NzIntroChangeLogRoutingModule } from './nz-intro-changelog.routing.module';

@NgModule({
  imports     : [ CommonModule, NzHighlightModule, NzIntroChangeLogRoutingModule, NzMarkdownModule ],
  declarations: [ NzIntroChangelogComponent ]
})
export class NzIntroChangeLogModule {

}
