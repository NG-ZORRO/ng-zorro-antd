import { TemplateRef } from '@angular/core';

export type NzDescriptionsSize = 'default' | 'middle' | 'small';

export interface NzDescriptionsItemRenderProps {
  title: string | TemplateRef<void>;
  span: number;
  content: TemplateRef<void>;
}
