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

