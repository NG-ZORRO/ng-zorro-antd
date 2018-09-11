import { NgModule } from '@angular/core';
import { NzIconComponent } from './nz-icon.component';
import { IconService } from './services/nz-icon.service';

@NgModule({
  declarations: [ NzIconComponent ],
  providers   : [ IconService ]
})
export class NzIconModule {}
