import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
import { getProjectStyleFile } from '@angular/cdk/schematics';
import { Style } from '@schematics/angular/application/schema';

export function getProjectStyle(project: WorkspaceProject): Style {
  const stylesPath = getProjectStyleFile(project);
  const style = stylesPath ? stylesPath.split('.').pop() :  Style.Css;
  return style as Style;
}
