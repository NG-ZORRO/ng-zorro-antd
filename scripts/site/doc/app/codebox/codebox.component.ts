import { Clipboard } from '@angular/cdk/clipboard';
import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { AppService, DemoCode } from '../app.service';
import { APP_LANGUAGE } from '../app.token';
import { OnlineIdeService } from '../online-ide/online-ide.service';
import { NzHighlightComponent } from './highlight.component';

@Component({
  selector: 'nz-code-box',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule, NzTooltipModule, NzHighlightComponent],
  templateUrl: './codebox.component.html',
  styleUrl: './codebox.component.less',
  host: {
    ngSkipHydration: ''
  }
})
export class NzCodeBoxComponent {
  protected readonly language = inject(APP_LANGUAGE);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly appService = inject(AppService);
  private readonly platform = inject(Platform);
  private readonly clipboard = inject(Clipboard);
  private readonly destroyRef = inject(DestroyRef);
  private readonly onlineIdeService = inject(OnlineIdeService);

  iframe?: SafeUrl;
  readonly highlightCode = signal<string>(null!);
  readonly commandCopied = signal(false);
  readonly codeLoaded = computed(() => !!this.highlightCode());
  readonly onlineIDELoading = signal(false);
  readonly copied = signal(false);
  readonly codeLoading = signal(false);
  readonly expanded = signal(false);

  @Input() nzTitle!: string;
  @Input() nzHref!: string;
  @Input() nzLink!: string;
  @Input() nzId!: string;
  @Input() nzIframeHeight: number | null = 360;
  @Input() nzComponentName = '';
  @Input() nzSelector = '';
  @Input() nzGenerateCommand = '';
  @Input() nzIframe: boolean = false;

  @Input()
  set nzIframeSource(value: string) {
    if (value !== 'null') {
      this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
  }

  navigateToFragment(): void {
    if (this.platform.isBrowser) {
      window.location.hash = this.nzLink;
    }
  }

  copyCode(): void {
    setTimeout(() => this.codeLoading.set(!this.codeLoaded()), 100);
    this.getDemoCode().subscribe(data => {
      this.codeLoading.set(false);
      this.clipboard.copy(data.rawCode);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1000);
    });
  }

  copyGenerateCommand(command: string): void {
    this.clipboard.copy(command);
    this.commandCopied.set(true);
    setTimeout(() => this.commandCopied.set(false), 1000);
  }

  expandCode(expanded: boolean): void {
    this.expanded.set(expanded);
    if (expanded) {
      this.getDemoCode().subscribe();
    }
  }

  openOnlineIDE(): void {
    setTimeout(() => this.onlineIDELoading.set(!this.codeLoaded()), 100);
    this.getDemoCode().subscribe(data => {
      this.onlineIDELoading.set(false);
      this.onlineIdeService.openOnStackBlitz(this.nzComponentName, data.rawCode, this.nzSelector);
    });
  }

  private getDemoCode(): Observable<DemoCode> {
    return this.appService.getCode(this.nzId).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(data => {
        this.highlightCode.set(data.highlightCode);
      })
    );
  }
}
