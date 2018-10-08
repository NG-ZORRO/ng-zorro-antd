import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzMentionSuggestionDirective } from './mention-suggestions';
import { NzMentionTriggerDirective } from './mention-trigger';
import { NzMentionComponent } from './mention.component';

const COMPONENTS = [NzMentionComponent, NzMentionTriggerDirective, NzMentionSuggestionDirective];

@NgModule({
  imports     : [ CommonModule, FormsModule, OverlayModule, NzIconModule ],
  declarations: [ ...COMPONENTS ],
  exports     : [ ...COMPONENTS ]
})
export class NzMentionModule {
}
