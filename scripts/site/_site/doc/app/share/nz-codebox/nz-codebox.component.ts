import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import sdk from '@stackblitz/sdk';
import { VERSION } from 'ng-zorro-antd/version'
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppService, DemoCode } from '../../app.service';
import { stackBlitzConfiguration } from './stack-blitz';

@Component({
  selector       : 'nz-code-box',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './nz-codebox.component.html',
  styleUrls      : [ './nz-codebox.component.less' ]
})
export class NzCodeBoxComponent implements OnInit, OnDestroy {
  highlightCode: string;
  copied = false;
  commandCopied = false;
  showIframe: boolean;
  simulateIFrame: boolean;
  iframe: SafeUrl;
  language = 'zh';
  theme = 'default';
  destroy$ = new Subject();
  codeLoaded = false;
  openStackBlitzLoading = false;
  copyLoading = false;
  @Input() nzTitle: string;
  @Input() nzExpanded = false;
  @Input() nzHref: string;
  @Input() nzLink: string;
  @Input() nzId: string;
  @Input() nzIframeHeight = 360;
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
    const promise = new Promise<string>(
      (resolve): void => {
        // @ts-ignore
        let copyTextArea = null as HTMLTextAreaElement;
        try {
          copyTextArea = this.dom.createElement('textarea');
          copyTextArea.style.height = '0px';
          copyTextArea.style.opacity = '0';
          copyTextArea.style.width = '0px';
          this.dom.body.appendChild(copyTextArea);
          copyTextArea.value = value;
          copyTextArea.select();
          this.dom.execCommand('copy');
          resolve(value);
        } finally {
          if (copyTextArea && copyTextArea.parentNode) {
            copyTextArea.parentNode.removeChild(copyTextArea);
          }
        }
      }
    );

    return promise;
  }

  expandCode(expanded: boolean): void {
    this.nzExpanded = expanded;
    if (expanded) {
      this.getDemoCode().subscribe();
    }
  }

  openOnStackBlitz(): void {
    setTimeout(() => {
      this.openStackBlitzLoading = !this.codeLoaded;
      this.check();
    }, 120);
    this.getDemoCode().subscribe(data => {
      this.openStackBlitzLoading = false;
      this.check();
      sdk.openProject(stackBlitzConfiguration(this.nzComponentName, data.rawCode, this.nzSelector, VERSION.full));
    });
  }

  check(): void {
    this.cdr.markForCheck();
  }

  // tslint:disable-next-line:no-any
  constructor(@Inject(DOCUMENT) private dom: any,
              private sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef,
              private appService: AppService,
              private platform: Platform) {
  }

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
      }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
