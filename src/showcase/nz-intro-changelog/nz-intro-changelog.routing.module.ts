import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIntroChangelogComponent } from './nz-intro-changelog.component';

@NgModule({
  imports: [ RouterModule.forChild([
    { path: '', component: NzIntroChangelogComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class NzIntroChangeLogRoutingModule {
}
