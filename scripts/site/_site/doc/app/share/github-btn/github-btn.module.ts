import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NzGithubBtnComponent } from './github-btn.component';

@NgModule({
  imports: [CommonModule],
  providers: [provideHttpClient()],
  declarations: [NzGithubBtnComponent],
  exports: [NzGithubBtnComponent]
})
export class NzGithubBtnModule {}
