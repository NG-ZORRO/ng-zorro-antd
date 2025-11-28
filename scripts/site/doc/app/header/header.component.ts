import { NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { VERSION } from 'ng-zorro-antd/version';

import { AppService } from '../app.service';
import { APP_LANGUAGE } from '../app.token';
import { GithubButtonComponent } from './github-button.component';
import { NavigationComponent } from './navigation.component';
import { SearchbarComponent } from './searchbar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    FormsModule,
    NgTemplateOutlet,
    NzGridModule,
    NzIconModule,
    NzMenuModule,
    NzSelectModule,
    NzButtonModule,
    NzDropdownModule,
    NzPopoverModule,
    NzTooltipModule,
    GithubButtonComponent,
    SearchbarComponent,
    NavigationComponent,
    UpperCasePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private readonly nzConfigService = inject(NzConfigService);
  protected readonly app = inject(AppService);
  protected readonly language = inject(APP_LANGUAGE);
  protected readonly dir = this.app.directionality.valueSignal;

  readonly searching = signal(false);
  readonly oldVersionList = [
    '19.3.x',
    '18.2.x',
    '17.4.x',
    '16.2.x',
    '15.1.x',
    '14.3.x',
    '13.4.x',
    '12.1.x',
    '11.4.x',
    '10.2.x',
    '9.3.x',
    '8.5.x',
    '7.5.x',
    '1.8.x',
    '0.7.x',
    '0.5.x'
  ];
  readonly currentVersion = VERSION.full;

  onFocusChange(focus: boolean): void {
    this.searching.set(focus);
  }

  toggleLanguage(): void {
    this.language.update(lang => (lang === 'zh' ? 'en' : 'zh'));
  }

  toggleDirection(): void {
    this.dir.update(dir => (dir === 'rtl' ? 'ltr' : 'rtl'));
    this.nzConfigService.set('modal', { nzDirection: this.dir() });
    this.nzConfigService.set('drawer', { nzDirection: this.dir() });
    this.nzConfigService.set('message', { nzDirection: this.dir() });
    this.nzConfigService.set('notification', { nzDirection: this.dir() });
    this.nzConfigService.set('image', { nzDirection: this.dir() });
  }

  navigateToVersion(version: string): void {
    if (version !== this.currentVersion) {
      window.location.href = `${window.location.origin}/version/${version}`;
    } else {
      window.location.href = window.location.origin;
    }
  }
}
