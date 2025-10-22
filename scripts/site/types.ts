/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type Language = 'zh' | 'en';
export interface I18n<T> {
  zh: T;
  en: T;
}

export interface IframeMeta {
  /**
   * iframe height
   */
  height: number;
  /**
   * iframe url
   */
  source?: string;
}

export interface I18nTitle {
  /**
   * title in Chinese
   */
  'zh-CN': string;
  /**
   * title in English
   */
  'en-US': string;
}

export interface ComponentIndexDocMeta {
  /**
   * category of the component
   */
  category: string;
  /**
   * type of the component
   */
  type: string;
  /**
   * title of the component
   */
  title: string;
  /**
   * cover image url
   */
  cover: string;
  /**
   * subtitle of the component
   */
  subtitle?: string;
  /**
   * description of the component
   */
  description?: string;
  /**
   * raw description content
   */
  rawDescription?: string;
  /**
   * order of the component
   */
  order?: number;
  /**
   * Columns of the showcases, defauls to 2
   */
  cols?: 1 | 2;
  /**
   * whether the documentation is hidden
   */
  hidden?: boolean;
  /**
   * whether the component is experimental
   */
  experimental?: boolean;
  /**
   * whether the demo page exists
   */
  hasDemoPage?: boolean;
  /**
   * tag of the component
   */
  tag?: string;
  /**
   * content of the component
   */
  __content?: string;
}

export type ComponentIndexDocMap = Record<string, I18n<ComponentIndexDocMeta>>;

export interface ComponentIndexDoc {
  /**
   * path of the component
   */
  path: string;
  /**
   * when to use the component
   */
  whenToUse: string;
  /**
   * metadata of the component
   */
  meta: ComponentIndexDocMeta;
  /**
   * API documentation
   */
  api: string;
}

export interface ComponentDemoDocMeta {
  /**
   * display order of the demo
   */
  order: number;
  /**
   * title of the demo
   */
  title: I18nTitle;
  /**
   * API support version
   */
  version: string;
  /**
   * iframe configuration
   */
  iframe?: IframeMeta;
  /**
   * whether the demo is debugging
   */
  debug?: boolean;
  /**
   * content of the demo
   */
  __content?: string;
}

export interface ComponentDemoDoc {
  key: string;
  /**
   * metadata of the demo
   */
  meta: ComponentDemoDocMeta;
  /**
   * name of the demo component
   */
  name: string;
  /**
   * content in Chinese
   */
  zh: string;
  /**
   * content in English
   */
  en: string;
  /**
   * code content in Chinese
   */
  zhCode: string;
  /**
   * code content in English
   */
  enCode: string;
  /**
   * code content in typescript
   */
  ts: string;
}

export interface ComponentDemoPage {
  /**
   * raw content of demo page
   */
  raw: string;
  /**
   * chinese code content
   */
  zhCode: string;
  /**
   * english code content
   */
  enCode: string;
}

export interface ComponentDemo {
  /**
   * demo name
   */
  name: string;
  /**
   * chinese doc content metadata
   */
  docZh: ComponentIndexDoc;
  /**
   * english doc content
   */
  docEn: ComponentIndexDoc;
  /**
   * demo content
   */
  demoMap: Record<string, ComponentDemoDoc>;
  /**
   * demo page content
   */
  pageDemo?: ComponentDemoPage;
  /**
   * standalone mode
   */
  standalone?: boolean;
}

export interface IntroRouter {
  path: string;
  label: string;
  language: string;
  order: number;
  hidden: boolean;
  description: string;
  experimental?: boolean;
}

export interface ComponentChildRouter {
  path: string;
  label: string;
  description: string;
  zh: string;
  cover?: string;
  /**
   * The tag of version since the component is available.
   */
  tag?: string;
  /**
   * Whether the component is hidden.
   */
  hidden?: boolean;
  /**
   * Whether the component is experimental.
   */
  experimental?: boolean;
}

export interface ComponentRouter {
  name: string;
  language: string;
  children: ComponentChildRouter[];
  experimentalChildren: ComponentChildRouter[];
}

export interface RouterList {
  intro: IntroRouter[];
  components: ComponentRouter[];
}
