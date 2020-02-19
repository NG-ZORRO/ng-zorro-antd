/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { editor } from 'monaco-editor';
import IEditorConstructionOptions = editor.IEditorConstructionOptions;
import IDiffEditorConstructionOptions = editor.IDiffEditorConstructionOptions;

export type EditorOptions = IEditorConstructionOptions;
export type DiffEditorOptions = IDiffEditorConstructionOptions;
export type JoinedEditorOptions = EditorOptions | DiffEditorOptions;

export type NzEditorMode = 'normal' | 'diff';

export enum NzCodeEditorLoadingStatus {
  UNLOAD = 'unload',
  LOADING = 'loading',
  LOADED = 'LOADED'
}

export interface NzCodeEditorConfig {
  assetsRoot?: string | SafeUrl;
  defaultEditorOption?: JoinedEditorOptions;
  useStaticLoading?: boolean;

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
