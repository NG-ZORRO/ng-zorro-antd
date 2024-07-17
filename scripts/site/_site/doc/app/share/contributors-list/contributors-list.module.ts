import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzContributorsListComponent } from './contributors-list.component';

@NgModule({
  imports: [CommonModule, RouterModule, NzIconModule, NzAvatarModule, NzToolTipModule],
  providers: [provideHttpClient()],
  declarations: [NzContributorsListComponent],
  exports: [NzContributorsListComponent]
})
export class NzContributorsListModule {}
