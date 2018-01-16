import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzMarkdownComponent } from './nz-markdown.component';

@NgModule({
  imports     : [ CommonModule ],
  declarations: [ NzMarkdownComponent ],
  exports     : [ NzMarkdownComponent ]
})
export class NzMarkdownModule {

}
