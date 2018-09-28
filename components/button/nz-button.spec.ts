import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzDemoButtonBasicComponent } from './demo/basic';
import { NzDemoButtonBlockComponent } from './demo/block';
import { NzDemoButtonButtonGroupComponent } from './demo/button-group';
import { NzDemoButtonDisabledComponent } from './demo/disabled';
import { NzDemoButtonGhostComponent } from './demo/ghost';
import { NzDemoButtonIconComponent } from './demo/icon';
import { NzDemoButtonLoadingComponent } from './demo/loading';
import { NzDemoButtonSizeComponent } from './demo/size';
import { NzButtonGroupComponent } from './nz-button-group.component';
import { NzButtonComponent } from './nz-button.component';
import { NzButtonModule } from './nz-button.module';

describe('button', () => {
  let testComponent;
  let fixture;
  describe('basic', () => {
    let buttons;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzButtonModule ],
        declarations: [ NzDemoButtonBasicComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttons[ 0 ].nativeElement.classList.contains('ant-btn-primary')).toBe(true);
      expect(buttons[ 1 ].nativeElement.classList.contains('ant-btn-default')).toBe(true);
      expect(buttons[ 2 ].nativeElement.classList.contains('ant-btn-dashed')).toBe(true);
      expect(buttons[ 3 ].nativeElement.classList.contains('ant-btn-danger')).toBe(true);
    });
  });
  describe('button-group', () => {
    let buttonGroup;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzButtonModule ],
        declarations: [ NzDemoButtonButtonGroupComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonButtonGroupComponent);
      testComponent = fixture.debugElement.componentInstance;
      buttonGroup = fixture.debugElement.query(By.directive(NzButtonGroupComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttonGroup.nativeElement.firstElementChild.classList.contains('ant-btn-group')).toBe(true);
    });
    it('should have no white space', () => {
      fixture.detectChanges();
      expect(Array.from(buttonGroup.nativeElement.firstElementChild).some((node: HTMLElement) => node.nodeType === 3)).toBe(false);
    });
  });
  describe('disabled', () => {
    let buttons;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzButtonModule ],
        declarations: [ NzDemoButtonDisabledComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonDisabledComponent);
      testComponent = fixture.debugElement.componentInstance;
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct attribute', () => {
      fixture.detectChanges();
      expect(!!buttons[ 1 ].nativeElement.attributes.getNamedItem('disabled')).toBe(true);
    });
  });
  describe('ghost', () => {
    let buttons;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzButtonModule ],
        declarations: [ NzDemoButtonGhostComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonGhostComponent);
      testComponent = fixture.debugElement.componentInstance;
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttons[ 0 ].nativeElement.classList.contains('ant-btn-background-ghost')).toBe(true);
      expect(buttons[ 1 ].nativeElement.classList.contains('ant-btn-background-ghost')).toBe(true);
      expect(buttons[ 2 ].nativeElement.classList.contains('ant-btn-background-ghost')).toBe(true);
      expect(buttons[ 3 ].nativeElement.classList.contains('ant-btn-background-ghost')).toBe(true);
    });
  });
  describe('icon', () => {
    let buttons;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzButtonModule ],
        declarations: [ NzDemoButtonIconComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonIconComponent);
      testComponent = fixture.debugElement.componentInstance;
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttons[ 0 ].nativeElement.classList.contains('ant-btn-icon-only')).toBe(true);
      expect(buttons[ 0 ].nativeElement.classList.contains('ant-btn-circle')).toBe(true);
      expect(buttons[ 1 ].nativeElement.classList.contains('ant-btn-icon-only')).toBe(false);
      expect(buttons[ 1 ].nativeElement.firstElementChild.classList.contains('anticon-search')).toBe(true);
      expect(buttons[ 1 ].nativeElement.firstElementChild.style.cssText).toBe('display: inline-block;');
    });
  });
  describe('loading', () => {
    let buttons;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzButtonModule ],
        declarations: [ NzDemoButtonLoadingComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonLoadingComponent);
      testComponent = fixture.debugElement.componentInstance;
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttons[ 0 ].nativeElement.classList.contains('ant-btn-loading')).toBe(true);
    });
    it('should loading when click without icon', fakeAsync(() => {
      const button = buttons[ 2 ];
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild.localName).toBe('span');
      button.nativeElement.click();
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(true);
      expect(button.nativeElement.firstElementChild.classList.contains('anticon-spin')).toBe(true);
      expect(button.nativeElement.firstElementChild.classList.contains('anticon-loading')).toBe(true);
      expect(button.nativeElement.firstElementChild.localName).toBe('i');
      tick(5000);
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild.localName).toBe('span');
    }));
    it('should loading when click with icon', fakeAsync(() => {
      const button = buttons[ 3 ];
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild.classList.contains('anticon-spin')).toBe(false);
      expect(button.nativeElement.firstElementChild.classList.contains('anticon-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild.localName).toBe('i');
      button.nativeElement.click();
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(true);
      expect(button.nativeElement.firstElementChild.classList.contains('anticon-spin')).toBe(true);
      expect(button.nativeElement.firstElementChild.classList.contains('anticon-loading')).toBe(true);
      expect(button.nativeElement.firstElementChild.localName).toBe('i');
      tick(5000);
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild.classList.contains('anticon-spin')).toBe(false);
      expect(button.nativeElement.firstElementChild.classList.contains('anticon-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild.localName).toBe('i');
    }));
  });
  describe('size', () => {
    let buttons;
    let buttonGroup;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzButtonModule ],
        declarations: [ NzDemoButtonSizeComponent ],
        schemas     : [ NO_ERRORS_SCHEMA ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonSizeComponent);
      testComponent = fixture.debugElement.componentInstance;
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent)).filter((item, index) => index < 6);
      buttonGroup = fixture.debugElement.query(By.directive(NzButtonGroupComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttons.every(button => button.nativeElement.classList.contains('ant-btn-lg'))).toBe(true);
      expect(buttonGroup.nativeElement.firstElementChild.classList.contains('ant-btn-group-lg')).toBe(true);
      testComponent.size = 'default';
      fixture.detectChanges();
      expect(buttons.every(button => button.nativeElement.classList.contains('ant-btn-lg'))).toBe(false);
      expect(buttonGroup.nativeElement.firstElementChild.classList.contains('ant-btn-group-lg')).toBe(false);
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(buttons.every(button => button.nativeElement.classList.contains('ant-btn-sm'))).toBe(true);
      expect(buttonGroup.nativeElement.firstElementChild.classList.contains('ant-btn-group-sm')).toBe(true);
    });
  });
  describe('icon', () => {
    let button;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzButtonModule ],
        declarations: [ NzTestButtonSearchComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestButtonSearchComponent);
      testComponent = fixture.debugElement.componentInstance;
      button = fixture.debugElement.query(By.directive(NzButtonComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-input-search-button')).toBe(true);
    });
  });
  describe('block', () => {
    let buttons;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzButtonModule ],
        declarations: [ NzDemoButtonBlockComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonBlockComponent);
      testComponent = fixture.debugElement.componentInstance;
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttons[ 0 ].nativeElement.classList.contains('ant-btn-primary')).toBe(true);
      expect(buttons[ 1 ].nativeElement.classList.contains('ant-btn-default')).toBe(true);
      expect(buttons[ 2 ].nativeElement.classList.contains('ant-btn-dashed')).toBe(true);
      expect(buttons[ 3 ].nativeElement.classList.contains('ant-btn-danger')).toBe(true);

      expect(buttons[ 0 ].nativeElement.classList.contains('ant-btn-block')).toBe(true);
      expect(buttons[ 1 ].nativeElement.classList.contains('ant-btn-block')).toBe(true);
      expect(buttons[ 2 ].nativeElement.classList.contains('ant-btn-block')).toBe(true);
      expect(buttons[ 3 ].nativeElement.classList.contains('ant-btn-block')).toBe(true);
    });
  });

});

@Component({
  selector: 'nz-test-button-search',
  template: `
    <button nz-button nzSearch></button>`
})
export class NzTestButtonSearchComponent {
}
