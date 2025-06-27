import { Direction } from '@angular/cdk/bidi';
import { NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { VERSION } from 'ng-zorro-antd/version';

import { GithubButtonComponent } from './github-button.component';
import { LogoComponent } from './logo.component';
import { SearchbarComponent } from './searchbar.component';
import { NavigationComponent } from './navigation.component';

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    FormsModule,
    NgTemplateOutlet,
    UpperCasePipe,
    NzGridModule,
    NzIconModule,
    NzMenuModule,
    NzSelectModule,
    NzButtonModule,
    NzDropDownModule,
    NzPopoverModule,
    GithubButtonComponent,
    LogoComponent,
    SearchbarComponent,
    NavigationComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnChanges {
  @Input() language: 'zh' | 'en' = 'zh';
  @Input() windowWidth = 1400;
  @Input() page: 'docs' | 'components' | 'experimental' | string = 'docs';
  @Output() versionChange = new EventEmitter<string>();
  @Output() languageChange = new EventEmitter<'zh' | 'en'>();
  @Output() directionChange = new EventEmitter<Direction>();

  searching = false;
  isMobile = false;
  mode = 'horizontal';
  responsive: null | 'narrow' | 'crowded' = null;
  oldVersionList = [
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
  currentVersion = VERSION.full;
  nextDirection: Direction = 'rtl';

  constructor(private nzConfigService: NzConfigService, private cdr: ChangeDetectorRef) {}

  onChangeVersion(version: string): void {
    this.versionChange.emit(version);
  }

  onFocusChange(focus: boolean): void {
    this.searching = focus;
  }

  onChangeLanguage(language: 'en' | 'zh'): void {
    this.languageChange.emit(language);
  }

  toggleDirection(): void {
    this.directionChange.emit(this.nextDirection);
    this.nzConfigService.set('modal', { nzDirection: this.nextDirection });
    this.nzConfigService.set('drawer', { nzDirection: this.nextDirection });
    this.nzConfigService.set('message', { nzDirection: this.nextDirection });
    this.nzConfigService.set('notification', { nzDirection: this.nextDirection });
    this.nzConfigService.set('image', { nzDirection: this.nextDirection });
    if (this.nextDirection === 'rtl') {
      this.nextDirection = 'ltr';
    } else {
      this.nextDirection = 'rtl';
    }
    this.cdr.markForCheck();
  }

  updateResponsive(): void {
    this.responsive = null;
    this.isMobile = this.windowWidth <= 768;
    if (this.windowWidth < RESPONSIVE_XS) {
      this.responsive = 'crowded';
    } else if (this.windowWidth < RESPONSIVE_SM) {
      this.responsive = 'narrow';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { windowWidth } = changes;
    if (windowWidth) {
      this.updateResponsive();
    }
  }
}
