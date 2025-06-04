/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { editor, Environment } from 'monaco-editor';

import IStandAloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;
import IDiffEditorConstructionOptions = editor.IDiffEditorConstructionOptions;

declare global {
  interface Window {
    MonacoEnvironment?: Environment | undefined;
  }
}

export type EditorOptions = IStandAloneEditorConstructionOptions;
export type DiffEditorOptions = IDiffEditorConstructionOptions;
export type JoinedEditorOptions = EditorOptions | DiffEditorOptions;

export type NzEditorMode = 'normal' | 'diff';

export const NzCodeEditorLoadingStatus = {
  UNLOAD: 'unload',
  LOADING: 'loading',
  LOADED: 'LOADED'
} as const;

export type NzCodeEditorLoadingStatus = (typeof NzCodeEditorLoadingStatus)[keyof typeof NzCodeEditorLoadingStatus];
