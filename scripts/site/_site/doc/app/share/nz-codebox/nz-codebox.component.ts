import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input, OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import sdk from '@stackblitz/sdk';
import { VERSION } from 'ng-zorro-antd'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppService } from '../../app.service';
import { stackBlitzConfiguration } from './stack-blitz';

@Component({
  selector       : 'nz-code-box',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './nz-codebox.component.html',
  styleUrls      : [ './nz-codebox.component.less' ]
})
export class NzCodeBoxComponent implements OnInit, OnDestroy {
  rawCode: string;
  copied = false;
  commandCopied = false;
  showIframe: boolean;
  simulateIFrame: boolean;
  iframe: SafeUrl;
  language = 'zh';
  destroy$ = new Subject();
  @Input() nzCode: string;
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

  @Input()
  get nzRawCode(): string {
    return this.rawCode;
  }

  set nzRawCode(value: string) {
    this.rawCode = decodeURIComponent(value).trim();
  }

  navigateToFragment(): void {
    if (this.platform.isBrowser) {
      window.location.hash = this.nzLink;
    }
  }

  copyCode(code: string): void {
    this.copy(code).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
        this.check();
      }, 1000);
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

  openOnStackBlitz() {
    sdk.openProject(stackBlitzConfiguration(this.nzComponentName, this.nzRawCode, this.nzSelector, VERSION.full));
  }

  check() {
    this.cdr.markForCheck();
  }

  constructor(@Inject(DOCUMENT) private dom: any,
              private sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef,
              private appService: AppService,
              private platform: Platform) {
  }

  ngOnInit(): void {
    this.appService.language$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.language = data;
      this.check();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
