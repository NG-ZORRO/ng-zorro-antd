/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { SafeUrl } from '@angular/platform-browser';

import { InjectionToken } from '@angular/core';

export type NzEditorMode = 'normal' | 'diff';

// tslint:disable-next-line no-any
export type JoinedEditorOption = any;

export enum NzCodeEditorLoadingStatus {
  UNLOAD = 'unload',
  LOADING = 'loading',
  LOADED = 'LOADED'
}

export interface NzCodeEditorConfig {
  assetsRoot?: string | SafeUrl;
  defaultEditorOption?: JoinedEditorOption;

  onLoad?(): void;

  onFirstEditorInit?(): void;

  onInit?(): void;
}

export const NZ_CODE_EDITOR_CONFIG = new InjectionToken<NzCodeEditorConfig>('nz-code-editor-config', {
  providedIn: 'root',
  factory: NZ_CODE_EDITOR_CONFIG_FACTORY
});

export function NZ_CODE_EDITOR_CONFIG_FACTORY(): NzCodeEditorConfig {
  return {};
}
