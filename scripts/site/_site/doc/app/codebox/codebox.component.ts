import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { environment } from '../../environments/environment';
import { AppService, DemoCode } from '../app.service';
import { OnlineIdeService } from '../online-ide/online-ide.service';
import { NzHighlightComponent } from './highlight.component';

@Component({
    selector: 'nz-code-box',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule, NzToolTipModule, NzHighlightComponent],
  templateUrl: './codebox.component.html',
  styleUrls: ['./codebox.component.less'],
  host: {
    ngSkipHydration: ''
  }
})
export class NzCodeBoxComponent implements OnInit, OnDestroy {
  private document: Document = inject(DOCUMENT);
  highlightCode?: string;
  copied = false;
  commandCopied = false;
  showIframe: boolean = false;
  simulateIFrame: boolean = false;
  iframe?: SafeUrl;
  language = 'zh';
  theme = 'default';
  destroy$ = new Subject<void>();
  codeLoaded = false;
  onlineIDELoading = false;
  copyLoading = false;
  @Input() nzTitle!: string;
  @Input() nzExpanded = false;
  @Input() nzHref!: string;
  @Input() nzLink!: string;
  @Input() nzId!: string;
  @Input() nzIframeHeight: number | null = 360;
  @Input() nzComponentName = '';
  @Input() nzSelector = '';
  @Input() nzGenerateCommand = '';

  @Input()
  set nzIframeSource(value: string) {
    this.showIframe = value !== 'null' && environment.production;
    this.simulateIFrame = value !== 'null' && !environment.production;
    this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  navigateToFragment(): void {
    if (this.platform.isBrowser) {
      window.location.hash = this.nzLink;
    }
  }

  copyCode(): void {
    setTimeout(() => {
      this.copyLoading = !this.codeLoaded;
      this.cdr.markForCheck();
    }, 120);
    this.getDemoCode().subscribe(data => {
      this.copyLoading = false;
      this.cdr.markForCheck();
      this.copy(data.rawCode).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
          this.cdr.markForCheck();
        }, 1000);
      });
    });
  }

  copyGenerateCommand(command: string): void {
    this.copy(command).then(() => {
      this.commandCopied = true;
      setTimeout(() => {
        this.commandCopied = false;
        this.cdr.markForCheck();
      }, 1000);
    });
  }

  copy(value: string): Promise<string> {
    return new Promise<string>((resolve): void => {
      // @ts-ignore
      let copyTextArea = null as HTMLTextAreaElement;
      try {
        copyTextArea = this.document.createElement('textarea');
        copyTextArea.style.height = '0px';
        copyTextArea.style.opacity = '0';
        copyTextArea.style.width = '0px';
        this.document.body.appendChild(copyTextArea);
        copyTextArea.value = value;
        copyTextArea.select();
        this.document.execCommand('copy');
        resolve(value);
      } finally {
        if (copyTextArea && copyTextArea.parentNode) {
          copyTextArea.parentNode.removeChild(copyTextArea);
        }
      }
    });
  }

  expandCode(expanded: boolean): void {
    this.nzExpanded = expanded;
    if (expanded) {
      this.getDemoCode().subscribe();
    }
    this.cdr.markForCheck();
  }

  openOnlineIDE(): void {
    setTimeout(() => {
      this.onlineIDELoading = !this.codeLoaded;
      this.cdr.markForCheck();
    }, 120);
    this.getDemoCode().subscribe(data => {
      this.onlineIDELoading = false;
      this.cdr.markForCheck();
      this.onlineIdeService.openOnStackBlitz(this.nzComponentName, data.rawCode, this.nzSelector);
    });
  }

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private appService: AppService,
    private platform: Platform,
    private onlineIdeService: OnlineIdeService
  ) {}

  ngOnInit(): void {
    this.appService.theme$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.theme = data;
      this.cdr.markForCheck();
    });
    this.appService.language$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.language = data;
      this.cdr.markForCheck();
    });
  }

  getDemoCode(): Observable<DemoCode> {
    return this.appService.getCode(this.nzId).pipe(
      takeUntil(this.destroy$),
      tap(data => {
        if (data) {
          this.highlightCode = data.highlightCode;
          this.codeLoaded = true;
          this.cdr.markForCheck();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
