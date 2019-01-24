import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzListModule } from '../list';
import { NzEmbedEmptyComponent } from './nz-embed-empty.component';
import { NZ_DEFAULT_EMPTY_CONTENT, NZ_EMPTY_COMPONENT_NAME } from './nz-empty-config';
import { NzEmptyComponent } from './nz-empty.component';
import { NzEmptyModule } from './nz-empty.module';
import { NzEmptyService } from './nz-empty.service';

describe('nz-empty', () => {
  let fixture;
  let testComponent;
  let emptyComponent;
  let embedComponent;

  /**
   * Basic usage.
   */
  describe('basic', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports     : [ CommonModule, NzEmptyModule ],
        declarations: [ NzEmptyTestBasicComponent ]
      }).compileComponents();

      fixture = TestBed.createComponent(NzEmptyTestBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      emptyComponent = fixture.debugElement.query(By.directive(NzEmptyComponent));
      fixture.detectChanges();
    });

    it('should render image, description on default situation', () => {
      expect(emptyComponent.nativeElement.classList.contains('ant-empty')).toBe(true);

      const imageEl = emptyComponent.nativeElement.firstChild;
      expect(imageEl.tagName).toBe('DIV');
      expect(imageEl.classList.contains('ant-empty-image')).toBe(true);
      expect(imageEl.firstElementChild.tagName).toBe('IMG');
      expect(imageEl.firstElementChild.getAttribute('alt')).toBe('empty');
      expect(imageEl.firstElementChild.src).toContain('data:image');

      const contentEl = emptyComponent.nativeElement.lastElementChild;
      expect(contentEl.tagName).toBe('P');
      expect(contentEl.innerText.trim()).toBe('暂无数据');
    });

    it('should render image, content and footer as template', () => {
      testComponent.image = testComponent.imageTpl;
      testComponent.content = testComponent.contentTpl;
      testComponent.footer = testComponent.footerTpl;

      fixture.detectChanges();

      expect(emptyComponent.nativeElement.classList.contains('ant-empty')).toBe(true);

      const imageEl = emptyComponent.nativeElement.firstChild;
      expect(imageEl.tagName).toBe('DIV');
      expect(imageEl.classList.contains('ant-empty-image')).toBe(true);
      expect(imageEl.innerText).toBe('Image');

      const contentEl = emptyComponent.nativeElement.querySelector('.ant-empty-description');
      expect(contentEl).not.toBeFalsy();
      expect(contentEl.tagName).toBe('P');
      expect(contentEl.innerText).toBe('Content');

      const footerEl = emptyComponent.nativeElement.lastElementChild;
      expect(footerEl.tagName).toBe('DIV');
      expect(footerEl.classList.contains('ant-empty-footer')).toBe(true);
      expect(footerEl.innerText).toBe('Footer');
    });

    it('should render image, content and footer as string and change `alt`', () => {
      testComponent.image = 'https://ng.ant.design/assets/img/logo.svg';
      testComponent.content = 'zorro icon';
      testComponent.footer = 'Footer';

      fixture.detectChanges();

      expect(emptyComponent.nativeElement.classList.contains('ant-empty')).toBe(true);

      const imageEl = emptyComponent.nativeElement.firstChild;
      expect(imageEl.tagName).toBe('DIV');
      expect(imageEl.classList.contains('ant-empty-image')).toBe(true);
      expect(imageEl.firstElementChild.tagName).toBe('IMG');
      expect(imageEl.firstElementChild.getAttribute('alt')).toBe('zorro icon');
      expect(imageEl.firstElementChild.src).toContain('ng.ant.design');

      const contentEl = emptyComponent.nativeElement.querySelector('.ant-empty-description');
      expect(contentEl).not.toBeFalsy();
      expect(contentEl.tagName).toBe('P');
      expect(contentEl.innerText).toBe('zorro icon');

      const footerEl = emptyComponent.nativeElement.lastElementChild;
      expect(footerEl.tagName).toBe('DIV');
      expect(footerEl.classList.contains('ant-empty-footer')).toBe(true);
      expect(footerEl.innerText).toBe('Footer');
    });

    // TODO: need to add i18n test later.
  });

  /**
   * Config default empty content via `NzEmptyService`'s `setDefaultEmptyContent` method.
   */
  describe('embed', () => {
    describe('service method', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [ NzEmptyTestServiceModule ]
        }).compileComponents();

        fixture = TestBed.createComponent(NzEmptyTestServiceComponent);
        testComponent = fixture.debugElement.componentInstance;
      });

      it('should components\' prop has priority', fakeAsync(() => {
        const refresh = () => {
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          embedComponent = fixture.debugElement.query(By.directive(NzEmbedEmptyComponent));
          emptyComponent = fixture.debugElement.query(By.directive(NzEmptyComponent));
        };

        refresh();

        // Default.
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeTruthy();
        expect(emptyComponent.nativeElement.classList.contains('ant-empty')).toBe(true);
        expect(emptyComponent.nativeElement.classList.contains('ant-empty-normal')).toBe(true);
        const imageEl = emptyComponent.nativeElement.firstChild;
        expect(imageEl.tagName).toBe('DIV');
        expect(imageEl.classList.contains('ant-empty-image')).toBe(true);
        expect(imageEl.firstElementChild.tagName).toBe('IMG');
        expect(imageEl.firstElementChild.getAttribute('alt')).toBe('empty');
        expect(imageEl.firstElementChild.src).toContain('data:image/svg+xml');

        // Prop.
        testComponent.noResult = 'list';
        refresh();
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeFalsy();
        expect(embedComponent.nativeElement.innerText).toBe('list');

        // Null.
        testComponent.noResult = null;
        refresh();
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeFalsy();
        expect(embedComponent.nativeElement.innerText).toBe('');
      }));

      it('should support string, template and component', fakeAsync(() => {
        const refresh = () => {
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          embedComponent = fixture.debugElement.query(By.directive(NzEmbedEmptyComponent));
          emptyComponent = fixture.debugElement.query(By.directive(NzEmptyComponent));
        };

        // String.
        testComponent.changeToString();
        refresh();
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeFalsy();
        expect(embedComponent.nativeElement.innerText).toBe('empty');

        // Template.
        testComponent.changeToTemplate();
        refresh();
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeFalsy();
        const divEl = embedComponent.nativeElement.firstElementChild;
        expect(divEl).toBeTruthy();
        expect(divEl.tagName).toBe('DIV');
        expect(divEl.innerText).toBe('I am in template list');

        // FIXME: This is not supported yet, see https://github.com/angular/angular/issues/15634.
        // Component.
        // testComponent.changeToComponent();
        // refresh();
        // expect(embedComponent).toBeTruthy();
        // expect(emptyComponent).toBeFalsy();
        // const componentEl = embedComponent.nativeElement.nextSibling;
        // expect(componentEl).toBeTruthy();
        // expect(componentEl.tagName).toBe('NZ-EMPTY-TEST-CUSTOM');
        // expect(componentEl.innerText).toBe(`I'm in component list`);

        // Reset.
        testComponent.reset();
        refresh();
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeTruthy();
        expect(emptyComponent.nativeElement.classList.contains('ant-empty')).toBe(true);
        expect(emptyComponent.nativeElement.classList.contains('ant-empty-normal')).toBe(true);
        const imageEl = emptyComponent.nativeElement.firstChild;
        expect(imageEl.tagName).toBe('DIV');
        expect(imageEl.classList.contains('ant-empty-image')).toBe(true);
        expect(imageEl.firstElementChild.tagName).toBe('IMG');
        expect(imageEl.firstElementChild.getAttribute('alt')).toBe('empty');
        expect(imageEl.firstElementChild.src).toContain('data:image/svg+xml');
      }));

      it('should raise error when set a invalid default value', () => {
        expect(() => {
          testComponent.changeToInvalid();
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
        }).toThrowError();
      });
    });

    /**
     * Config default empty content via injection.
     */
    describe('service injection', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [ NzEmptyTestInjectionModule ]
        }).compileComponents();

        fixture = TestBed.createComponent(NzEmptyTestServiceComponent);
        testComponent = fixture.debugElement.componentInstance;
      });

      it('should support injection', fakeAsync(() => {
        const refresh = () => {
          fixture.detectChanges();
          tick();
          fixture.detectChanges();

          embedComponent = fixture.debugElement.query(By.directive(NzEmbedEmptyComponent));
          emptyComponent = fixture.debugElement.query(By.directive(NzEmptyComponent));
        };

        refresh();

        // Component.
        expect(embedComponent).toBeTruthy();
        expect(emptyComponent).toBeFalsy();
        const componentEl = embedComponent.nativeElement.nextSibling;
        expect(componentEl).toBeTruthy();
        expect(componentEl.tagName).toBe('NZ-EMPTY-TEST-CUSTOM');
        expect(componentEl.innerText).toBe(`I'm in component list`);
      }));
    });
  });
});

@Component({
  selector: 'nz-empty-test-basic',
  template: `
    <nz-empty [nzNotFoundImage]="image" [nzNotFoundContent]="content" [nzNotFoundFooter]="footer">
      <ng-template #imageTpl>Image</ng-template>
      <ng-template #contentTpl>Content</ng-template>
      <ng-template #footerTpl>Footer</ng-template>
    </nz-empty>
  `
})
export class NzEmptyTestBasicComponent {
  @ViewChild('imageTpl') imageTpl: TemplateRef<void>;
  @ViewChild('contentTpl') contentTpl: TemplateRef<void>;
  @ViewChild('footerTpl') footerTpl: TemplateRef<void>;

  image = undefined;
  content = undefined;
  footer = undefined;
}

@Component({
  selector: 'nz-empty-test-service',
  template: `
    <nz-list [nzDataSource]="[]" [nzNoResult]="noResult"></nz-list>
    <ng-template #tpl let-component>
      <div>I am in template {{ component }}</div>
    </ng-template>
  `
})
export class NzEmptyTestServiceComponent {
  @ViewChild('tpl') template: TemplateRef<void>;

  noResult = undefined;

  constructor(private emptyService: NzEmptyService) {
  }

  reset(): void {
    this.emptyService.resetDefault();
  }

  changeToString(): void {
    this.emptyService.setDefaultContent('empty');
  }

  changeToTemplate(): void {
    this.emptyService.setDefaultContent(this.template);
  }

  changeToInvalid(): void {
    this.emptyService.setDefaultContent(false as any);  // tslint:disable-line:no-any
  }
}

@Component({
  selector: 'nz-empty-test-custom',
  template: `
    <div>I'm in component {{ name }}</div>
  `
})
export class NzEmptyTestCustomComponent {
  constructor(@Inject(NZ_EMPTY_COMPONENT_NAME) public name: string) {
  }
}

@NgModule({
  imports        : [ CommonModule, NzEmptyModule, NzListModule ],
  declarations   : [ NzEmptyTestServiceComponent, NzEmptyTestCustomComponent ],
  entryComponents: [ NzEmptyTestCustomComponent ],
  exports        : [ NzEmptyTestServiceComponent, NzEmptyTestCustomComponent ]
})
export class NzEmptyTestServiceModule {
}

@NgModule({
  imports        : [ CommonModule, NzEmptyModule, NzListModule ],
  declarations   : [ NzEmptyTestServiceComponent, NzEmptyTestCustomComponent ],
  entryComponents: [ NzEmptyTestCustomComponent ],
  exports        : [ NzEmptyTestServiceComponent, NzEmptyTestCustomComponent ],
  providers      : [
    {
      provide : NZ_DEFAULT_EMPTY_CONTENT,
      useValue: NzEmptyTestCustomComponent
    }
  ]
})
export class NzEmptyTestInjectionModule {
}
