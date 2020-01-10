import { Style } from '@schematics/angular/application/schema';

export interface Schema {
  project: string;
  style: Style;
  prefix: string;
}
