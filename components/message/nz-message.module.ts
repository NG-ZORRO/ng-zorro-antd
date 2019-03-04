import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from '../icon/nz-icon.module';

import { NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER } from './nz-message-config';
import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageComponent } from './nz-message.component';
import { NzMessageService } from './nz-message.service';

@NgModule({
  imports        : [ CommonModule, OverlayModule, NzIconModule ],
  declarations   : [ NzMessageContainerComponent, NzMessageComponent ],
  providers      : [ NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER, NzMessageService ],
  entryComponents: [ NzMessageContainerComponent ]
})
export class NzMessageModule {
}
