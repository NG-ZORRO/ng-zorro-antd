/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { copySync, mkdirsSync, readFileSync, readJsonSync, outputFileSync, outputJsonSync, } from 'fs-extra';
import { sync as glob } from 'glob';

import path from 'path';

import { buildConfig } from '../build-config';

interface DemoMeta {
  fileContent: string,
  componentName: string,
  demoName: string,
  template: string,
  styles: string,
  selector: string,
  className: string
}

const componentsPath = buildConfig.componentsDir;
const demoDirPath = path.join(buildConfig.projectDir, 'schematics/demo');
const collectionPath = path.join(demoDirPath, 'collection.json');

const TEST_FILE_CONTENT =
  `import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

describe('<%= classify(name) %>Component', () => {
  let component: <%= classify(name) %>Component;
  let fixture: ComponentFixture<<%= classify(name) %>Component>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ <%= classify(name) %>Component ]
    })
    .compileComponents();
    ;

    fixture = TestBed.createComponent(<%= classify(name) %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
`;

function getComponentPaths(): string[] {
  return glob(path.join(componentsPath, '**/demo/*.ts'));
}

function parse(filePath: string): DemoMeta {
  const fileContent = readFileSync(filePath, 'utf-8');
  const pathSplit = filePath.split('components/')[1].split('/');
  const componentName = pathSplit[0] || '';
  const demoName = (pathSplit[2] && pathSplit[2].split('.')[0]) ? pathSplit[2].split('.')[0] : '';
  const template = getTemplate(fileContent);
  const styles = getStyles(fileContent);
  const selector = getSelector(fileContent);
  const className = getClassName(fileContent);
  return {
    fileContent,
    componentName,
    demoName,
    template,
    styles,
    selector,
    className
  };
}

function getTemplate(fileContent: string): string {
  const match = fileContent.match(/template\s*:\s*`([\s\S]*?)`/);
  return match ? match[1] || '' : '';
}

function getStyles(fileContent: string): string {
  const match = fileContent.match(/styles\s*:\s*\[\s*`([\s\S]*?)`\s*\]/);
  return match ? match[1] || '' : '';
}

function getClassName(fileContent: string): string {
  const match = fileContent.match(/export\s*class\s*(.+?)\s.*/);
  return match ? match[1] || '' : '';
}

function getSelector(fileContent: string): string {
  const match = fileContent.match(/selector\s*:\s*'(.+?)'\s*/);
  return match ? match[1] || '' : '';
}

function replaceTemplate(demoComponent: DemoMeta): string {
  return demoComponent.fileContent
    .replace(/selector\s*:\s*'(.+?)'\s*/, () => `selector: '<%= selector %>'`)
    .replace(new RegExp(demoComponent.className), () => `<%= classify(name) %>Component`)
    .replace(/styles\s*:\s*\[\s*`([\s\S]*?)`\s*\]/, () => `<% if(inlineStyle) { %>styles: [\`${demoComponent.styles}\`]<% } else { %>styleUrls: ['./<%= dasherize(name) %>.component.<%= style %>']<% } %>`)
    .replace(/template\s*:\s*`([\s\S]*?)`/, () => `<% if(inlineTemplate) { %>template: \`${demoComponent.template}\`<% } else { %>templateUrl: './<%= dasherize(name) %>.component.html'<% } %>`);
}

function createSchematic(demoComponent: DemoMeta): void {
  const demoPath = path.resolve(demoDirPath, `./${demoComponent.componentName}-${demoComponent.demoName}`);
  const filesPath = path.resolve(__dirname, `${demoPath}/files/__path__/__name@dasherize@if-flat__`);
  const schemaPath = `${demoPath}/schema.json`;
  mkdirsSync(filesPath);

  copySync(path.resolve(__dirname, `./template/index.ts.template`), `${demoPath}/index.ts`);
  copySync(path.resolve(__dirname, `./template/schema.json.template`), `${demoPath}/schema.json`);
  copySync(path.resolve(__dirname, `./template/schema.ts.template`), `${demoPath}/schema.ts`);

  const schemaJson = readJsonSync(schemaPath);
  schemaJson.$id = `${demoComponent.demoName}-${demoComponent.componentName}`;
  schemaJson.title = `NG-ZORRO ${demoComponent.demoName} ${demoComponent.componentName}`;
  outputJsonSync(schemaPath, schemaJson);

  outputFileSync(`${filesPath}/__name@dasherize__.component.__style__.template`, demoComponent.styles);
  outputFileSync(`${filesPath}/__name@dasherize__.component.html.template`, demoComponent.template);
  outputFileSync(`${filesPath}/__name@dasherize__.component.spec.ts.template`, TEST_FILE_CONTENT);
  outputFileSync(`${filesPath}/__name@dasherize__.component.ts.template`, replaceTemplate(demoComponent));

  const collectionJson = readJsonSync(collectionPath, { throws: false }) || { schematics: {} };
  collectionJson.schematics = {
    ...collectionJson.schematics,
    [`${demoComponent.componentName}-${demoComponent.demoName}`]: {
      description: schemaJson.title,
      factory: `./demo/${demoComponent.componentName}-${demoComponent.demoName}`,
      schema: `./demo/${demoComponent.componentName}-${demoComponent.demoName}/schema.json`
    }
  };
  outputJsonSync(collectionPath, collectionJson, { spaces: '  ' });
}

export function generate(): void {
  const componentPath = getComponentPaths();
  componentPath.forEach(p => {
    try {
      createSchematic(parse(p));
    } catch (e) {
      console.error(`error ${p}`);
      console.error(e);
    }
  });
}
