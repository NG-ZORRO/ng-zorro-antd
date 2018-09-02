import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { NzWaveDirective } from './nz-wave.directive';

@NgModule({
  imports     : [ PlatformModule ],
  exports     : [ NzWaveDirective ],
  declarations: [ NzWaveDirective ]
})
export class NzWaveModule { }
