import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { GithubButtonComponent } from './github-button.component';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo.component';
import { NavigationComponent } from './navigation.component';
import { SearchbarComponent } from './searchbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzMenuModule,
    NzSelectModule,
    NzButtonModule,
    NzDropDownModule,
    NzPopoverModule
  ],
  declarations: [
    HeaderComponent,
    LogoComponent,
    SearchbarComponent,
    NavigationComponent,
    GithubButtonComponent
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {

}
