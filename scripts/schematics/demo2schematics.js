const fs = require('fs-extra');
const path = require('path');
const glob = require('glob').sync;

const componentsPath = path.resolve(__dirname, '../../components');
const demoDirPath = path.resolve(__dirname, '../../schematics/demo');
const collectionPath = path.resolve(__dirname, '../../schematics/demo/collection.json');

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

    fixture = TestBed.createComponent(<%= classify(name) %>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
`;

/**
 * @returns {string[]}
 */
function getComponentPaths() {
  return glob(path.join(componentsPath, '**/demo/*.ts'))
}

/**
 * @param {string} filePath
 * @returns {{fileContent: string, componentName: string, demoName: string, template: string, styles: string, selector: string, className: string}}
 */
function parse(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const pathSplitted = filePath.split('components/')[1].split('/');
  const componentName = pathSplitted[0] || '';
  const demoName = (pathSplitted[2] && pathSplitted[2].split('.')[0]) ? pathSplitted[2].split('.')[0] : '';
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
  }
}

/**
 * @param {string} fileContent
 * @returns {string}
 */
function getTemplate(fileContent) {
  const match = fileContent.match(/template\s*:\s*`([\s\S]*?)`/);
  return match ? match[1] || '' : '';
}

/**
 * @param {string} fileContent
 * @returns {string}
 */
function getStyles(fileContent) {
  const match = fileContent.match(/styles\s*:\s*\[\s*`([\s\S]*?)`\s*\]/);
  return match ? match[1] || '' : '';
}

/**
 * @param {string} fileContent
 * @returns {string}
 */
function getClassName(fileContent) {
  const match = fileContent.match(/export\s*class\s*(.+?)\s.*/);
  return match ? match[1] || '' : '';
}

/**
 * @param {string} fileContent
 * @returns {string}
 */
function getSelector(fileContent) {
  const match = fileContent.match(/selector\s*:\s*'(.+?)'\s*/);
  return match ? match[1] || '' : '';
}

function replaceTemplate(demoComponent) {
  return demoComponent.fileContent
    .replace(/selector\s*:\s*'(.+?)'\s*/, () => `selector: '<%= selector %>'`)
    .replace(new RegExp(demoComponent.className), () => `<%= classify(name) %>Component`)
    .replace(/styles\s*:\s*\[\s*`([\s\S]*?)`\s*\]/, () => `<% if(inlineStyle) { %>styles: [\`${demoComponent.styles}\`]<% } else { %>styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']<% } %>`)
    .replace(/template\s*:\s*`([\s\S]*?)`/, () => `<% if(inlineTemplate) { %>template: \`${demoComponent.template}\`<% } else { %>templateUrl: './<%= dasherize(name) %>.component.html'<% } %>`)
}

/**
 * @param {{fileContent: string, componentName: string, demoName: string, template: string, styles: string, selector: string, className: string}} demoComponent
 */
function createSchematic(demoComponent) {
  const demoPath = path.resolve(demoDirPath, `./${demoComponent.componentName}-${demoComponent.demoName}`);
  const filesPath = path.resolve(__dirname, `${demoPath}/files/__path__/__name@dasherize@if-flat__`);
  const schemaPath = `${demoPath}/schema.json`;
  fs.mkdirsSync(filesPath);
  fs.copySync(path.resolve(__dirname, `./template`), demoPath);

  const schemaJson = fs.readJsonSync(schemaPath);
  schemaJson.id = `${demoComponent.demoName}-${demoComponent.componentName}`;
  schemaJson.title = `NG-ZORRO ${demoComponent.demoName} ${demoComponent.componentName}`;
  fs.outputJsonSync(schemaPath, schemaJson);

  fs.outputFileSync(`${filesPath}/__name@dasherize__.component.__styleext__`, demoComponent.styles);
  fs.outputFileSync(`${filesPath}/__name@dasherize__.component.html`, demoComponent.template);
  fs.outputFileSync(`${filesPath}/__name@dasherize__.component.spec.ts`, TEST_FILE_CONTENT);
  fs.outputFileSync(`${filesPath}/__name@dasherize__.component.ts`, replaceTemplate(demoComponent));

  const collectionJson = fs.readJsonSync(collectionPath, { throws: false }) || {schematics: {}};
  collectionJson.schematics = Object.assign(collectionJson.schematics, {
    [`${demoComponent.componentName}-${demoComponent.demoName}`]: {
      description: schemaJson.title,
      factory: `./demo/${demoComponent.componentName}-${demoComponent.demoName}`,
      schema: `./demo/${demoComponent.componentName}-${demoComponent.demoName}/schema.json`
    },
  });
  fs.outputJsonSync(collectionPath, collectionJson, {spaces: '  '});
}

function generate() {
  const componentPath = getComponentPaths();
  componentPath.forEach(path => {
    try {
      createSchematic(parse(path))
    } catch (e) {
      console.error(`error ${path}`);
      console.error(e);
    }
  });
  console.log(`success(${componentPath.length})`)
}

generate();
