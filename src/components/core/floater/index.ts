import { NgModule, Provider } from '@angular/core';
import { OverlayModule } from '../overlay/index';
import { FLOATER_SERVICE_PROVIDER } from './floater.service';

const providers: Provider[] = [
  FLOATER_SERVICE_PROVIDER
];

@NgModule({
  imports: [ OverlayModule ],
  providers: providers
})
export class FloaterModule {}

export * from './floater-props';
export { Floater } from './floater';
export { FloaterService } from './floater.service';
