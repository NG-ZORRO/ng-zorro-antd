/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { PREFIX, warn, warnDeprecation } from 'ng-zorro-antd/core/logger';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BehaviorSubject, Observable, of as observableOf, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JoinedEditorOptions, NZ_CODE_EDITOR_CONFIG, NzCodeEditorConfig, NzCodeEditorLoadingStatus } from './typings';

declare const monaco: NzSafeAny;

const NZ_CONFIG_COMPONENT_NAME = 'codeEditor';

function tryTriggerFunc(fn?: (...args: NzSafeAny[]) => NzSafeAny): (...args: NzSafeAny) => void {
  return (...args: NzSafeAny[]) => {
    if (fn) {
      fn(...args);
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class NzCodeEditorService {
  private document: Document;
  private firstEditorInitialized = false;
  private loaded$ = new Subject<boolean>();
  private loadingStatus = NzCodeEditorLoadingStatus.UNLOAD;
  private option: JoinedEditorOptions;
  private config: NzCodeEditorConfig;

  option$ = new BehaviorSubject<JoinedEditorOptions>(this.option);

  constructor(
    private readonly nzConfigService: NzConfigService,
    @Inject(DOCUMENT) _document: NzSafeAny,
    @Inject(NZ_CODE_EDITOR_CONFIG) @Optional() config?: NzCodeEditorConfig
  ) {
    const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);

    if (config) {
      warnDeprecation(
        `'NZ_CODE_EDITOR_CONFIG' is deprecated and will be removed in next minor version. Please use 'NzConfigService' instead.`
      );
    }

    this.document = _document;
    this.config = { ...config, ...globalConfig };
    this.option = this.config.defaultEditorOption || {};

    this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME).subscribe(() => {
      const newGlobalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME);
      if (newGlobalConfig) {
        this._updateDefaultOption(newGlobalConfig.defaultEditorOption);
      }
    });
  }

  updateDefaultOption(option: JoinedEditorOptions): void {
    warnDeprecation(
      `'updateDefaultOption' is deprecated and will be removed in next minor version. Please use 'set' of 'NzConfigService' instead.`
    );

    this._updateDefaultOption(option);
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

    tryTriggerFunc(this.config.onLoad)();
  }

  private onInit(): void {
    if (!this.firstEditorInitialized) {
      this.firstEditorInitialized = true;
      tryTriggerFunc(this.config.onFirstEditorInit)();
    }

    tryTriggerFunc(this.config.onInit)();
  }

  private getLatestOption(): JoinedEditorOptions {
    return { ...this.option };
  }
}
