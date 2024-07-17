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
import { environment } from '../../../environments/environment';
import { AppService, DemoCode } from '../../app.service';
import { OnlineIdeService } from '../../online-ide/online-ide.service';

@Component({
  selector: 'nz-code-box',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  destroy$ = new Subject<boolean>();
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
      this.check();
    }, 120);
    this.getDemoCode().subscribe(data => {
      this.copyLoading = false;
      this.check();
      this.copy(data.rawCode).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
          this.check();
        }, 1000);
      });
    });
  }

  copyGenerateCommand(command: string): void {
    this.copy(command).then(() => {
      this.commandCopied = true;
      setTimeout(() => {
        this.commandCopied = false;
        this.check();
      }, 1000);
    });
  }

  copy(value: string): Promise<string> {
    const promise = new Promise<string>((resolve): void => {
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

    return promise;
  }

  expandCode(expanded: boolean): void {
    this.nzExpanded = expanded;
    if (expanded) {
      this.getDemoCode().subscribe();
    }
  }

  openOnlineIDE(): void {
    setTimeout(() => {
      this.onlineIDELoading = !this.codeLoaded;
      this.check();
    }, 120);
    this.getDemoCode().subscribe(data => {
      this.onlineIDELoading = false;
      this.check();
      this.onlineIdeService.openOnStackBlitz(this.nzComponentName, data.rawCode, this.nzSelector);
    });
  }

  check(): void {
    this.cdr.markForCheck();
  }

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private appService: AppService,
    private platform: Platform,
    private onlineIdeService: OnlineIdeService
  ) { }

  ngOnInit(): void {
    this.appService.theme$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.theme = data;
      this.check();
    });
    this.appService.language$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.language = data;
      this.check();
    });
  }

  getDemoCode(): Observable<DemoCode> {
    return this.appService.getCode(this.nzId).pipe(
      takeUntil(this.destroy$),
      tap(data => {
        if (data) {
          this.highlightCode = data.highlightCode;
          this.codeLoaded = true;
          this.check();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
