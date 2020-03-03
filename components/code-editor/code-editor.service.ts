/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NzConfigService, NzSafeAny, PREFIX, warn } from 'ng-zorro-antd/core';
import { JoinedEditorOptions, NzCodeEditorConfig, NzCodeEditorLoadingStatus } from './typings';

declare const monaco: NzSafeAny;

const NZ_CONFIG_COMPONENT_NAME = 'codeEditor';

@Injectable({
  providedIn: 'root'
})
export class NzCodeEditorService {
  private readonly document: Document;
  private readonly loaded$ = new Subject<boolean>();
  private firstEditorInitialized = false;
  private loadingStatus = NzCodeEditorLoadingStatus.UNLOAD;
  private option: JoinedEditorOptions;
  private config: NzCodeEditorConfig;

  public readonly option$ = new BehaviorSubject<JoinedEditorOptions>(this.option);

  constructor(private readonly nzConfigService: NzConfigService, @Inject(DOCUMENT) _document: NzSafeAny) {
    const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);
    this.document = _document;
    this.config = { ...globalConfig };
    this.option = this.config.defaultEditorOption || {};

    this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME).subscribe(() => {
      const newGlobalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);
      if (newGlobalConfig) {
        this._updateDefaultOption(newGlobalConfig.defaultEditorOption);
      }
    });
  }

  private _updateDefaultOption(option: JoinedEditorOptions): void {
    this.option = { ...this.option, ...option };
    this.option$.next(this.option);

    if (option.theme) {
      monaco.editor.setTheme(option.theme);
    }
  }

  requestToInit(): Observable<JoinedEditorOptions> {
    if (this.loadingStatus === NzCodeEditorLoadingStatus.LOADED) {
      this.onInit();
      return observableOf(this.getLatestOption());
    }

    if (this.loadingStatus === NzCodeEditorLoadingStatus.UNLOAD) {
      if (this.config.useStaticLoading && typeof monaco === 'undefined') {
        warn(
          'You choose to use static loading but it seems that you forget ' +
            'to config webpack plugin correctly. Please refer to our official website' +
            'for more details about static loading.'
        );
      } else {
        this.loadMonacoScript();
      }
    }

    return this.loaded$.asObservable().pipe(
      tap(() => this.onInit()),
      map(() => this.getLatestOption())
    );
  }

  private loadMonacoScript(): void {
    if (this.config.useStaticLoading) {
      this.onLoad();
      return;
    }

    if (this.loadingStatus === NzCodeEditorLoadingStatus.LOADING) {
      return;
    }

    this.loadingStatus = NzCodeEditorLoadingStatus.LOADING;

    const assetsRoot = this.config.assetsRoot;
    const vs = assetsRoot ? `${assetsRoot}/vs` : 'assets/vs';
    const windowAsAny = window as NzSafeAny;
    const loadScript = this.document.createElement('script');

    loadScript.type = 'text/javascript';
    loadScript.src = `${vs}/loader.js`;
    loadScript.onload = () => {
      windowAsAny.require.config({
        paths: { vs }
      });
      windowAsAny.require(['vs/editor/editor.main'], () => {
        this.onLoad();
      });
    };
    loadScript.onerror = () => {
      throw new Error(`${PREFIX} cannot load assets of monaco editor from source "${vs}".`);
    };

    this.document.documentElement.appendChild(loadScript);
  }

  private onLoad(): void {
    this.loadingStatus = NzCodeEditorLoadingStatus.LOADED;
    this.loaded$.next(true);
    this.loaded$.complete();

    if (this.config.onLoad) {
      this.config.onLoad();
    }
  }

  private onInit(): void {
    if (!this.firstEditorInitialized) {
      this.firstEditorInitialized = true;
      if (this.config.onFirstEditorInit) {
        this.config.onFirstEditorInit();
      }
    }

    if (this.config.onInit) {
      this.config.onInit();
    }
  }

  private getLatestOption(): JoinedEditorOptions {
    return { ...this.option };
  }
}
