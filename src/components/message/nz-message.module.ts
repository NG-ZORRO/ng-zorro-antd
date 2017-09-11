import { NgModule } from '@angular/core';
import { NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER } from './nz-message-config';
import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageComponent } from './nz-message.component';
import { CommonModule } from '@angular/common';
import { FloaterModule } from '../core/floater/index';

const providers = [
  NZ_MESSAGE_DEFAULT_CONFIG_PROVIDER
];

@NgModule({
  imports: [ CommonModule, FloaterModule ],
  declarations: [ NzMessageContainerComponent, NzMessageComponent ],
  providers: providers,
  entryComponents: [ NzMessageContainerComponent ]
})
export class NzMessageModule { }

