import { TemplateRef } from '@angular/core';

export type NzDescriptionListSize = 'default' | 'middle' | 'small';

export interface NzDescriptionItemRenderProps {
  title: string | TemplateRef<void>;
  span: number;
  content: TemplateRef<void>;
}
