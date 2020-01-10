import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NzGithubBtnComponent } from './nz-github-btn.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [NzGithubBtnComponent],
  exports: [NzGithubBtnComponent]
})
export class NzGithubBtnModule {}
