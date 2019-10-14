/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { of as observableOf, BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PREFIX } from 'ng-zorro-antd/core';
import {
  JoinedEditorOptions,
  NzCodeEditorConfig,
  NzCodeEditorLoadingStatus,
  NZ_CODE_EDITOR_CONFIG
} from './nz-code-editor.definitions';

// tslint:disable-next-line no-any
declare const monaco: any;

// tslint:disable no-any
function tryTriggerFunc(fn?: (...args: any[]) => any): (...args: any) => void {
  return (...args: any[]) => {
    if (fn) {
      fn(...args);
    }
  };
}
// tslint:enable no-any

@Injectable({
  providedIn: 'root'
})
export class NzCodeEditorService {
  private document: Document;
  private firstEditorInitialized = false;
  private loaded$ = new Subject<boolean>();
  private loadingStatus = NzCodeEditorLoadingStatus.UNLOAD;
  private option: JoinedEditorOptions;

  option$ = new BehaviorSubject<JoinedEditorOptions>(this.option);

  constructor(
    @Inject(NZ_CODE_EDITOR_CONFIG) private config: NzCodeEditorConfig,
    @Inject(DOCUMENT) _document: any // tslint:disable-line no-any
  ) {
    this.document = _document;
    this.option = this.config.defaultEditorOption || {};
  }

  // TODO: use config service later.
  updateDefaultOption(option: JoinedEditorOptions): void {
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
      this.loadMonacoScript();
    }

    return this.loaded$.asObservable().pipe(
      tap(() => this.onInit()),
      map(() => this.getLatestOption())
    );
  }

  private loadMonacoScript(): void {
    if (this.loadingStatus === NzCodeEditorLoadingStatus.LOADING) {
      return;
    }

    this.loadingStatus = NzCodeEditorLoadingStatus.LOADING;

    const assetsRoot = this.config.assetsRoot;
    const vs = assetsRoot ? `${assetsRoot}/vs` : 'assets/vs';
    const windowAsAny = window as any; // tslint:disable-line no-any
    const loadScript = this.document.createElement('script');

    loadScript.type = 'text/javascript';
    loadScript.src = `${vs}/loader.js`;
    loadScript.onload = () => {
      windowAsAny.require.config({
        paths: { vs }
      });
      windowAsAny.require(['vs/editor/editor.main'], () => {
        this.loadingStatus = NzCodeEditorLoadingStatus.LOADED;
        this.loaded$.next(true);
        this.loaded$.complete();
        this.onLoad();
      });
    };
    loadScript.onerror = () => {
      throw new Error(`${PREFIX} cannot load assets of monaco editor from source "${vs}".`);
    };

    this.document.documentElement.appendChild(loadScript);
  }

  private onInit(): void {
    if (!this.firstEditorInitialized) {
      this.firstEditorInitialized = true;
      tryTriggerFunc(this.config.onFirstEditorInit)();
    }

    tryTriggerFunc(this.config.onInit)();
  }

  private onLoad(): void {
    tryTriggerFunc(this.config.onLoad)();
  }

  private getLatestOption(): JoinedEditorOptions {
    return { ...this.option };
  }
}
