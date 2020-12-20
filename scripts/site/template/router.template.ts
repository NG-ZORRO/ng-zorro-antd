export interface RouterList {
  components: Array<{
    name: string;
    language: string;
    experimentalChildren: Array<{
      path: string;
      hidden: boolean;
      description: string;
      experimental: boolean;
      label: string;
      zh: string;
    }>;
    children: Array<{
      cover: string;
      path: string;
      hidden: boolean;
      description: string;
      experimental: boolean;
      label: string;
      zh: string;
    }>;
  }>;
  intro: Array<{
    path: string;
    label: string;
    language: string;
    order: number;
    description: string;
    experimental: boolean;
  }>;
}

export const ROUTER_LIST:RouterList = {
  'intro'     : {{intro}},
  'components': {{components}}
};
export const DEMO_ROUTES = [
{{routes}}
];
