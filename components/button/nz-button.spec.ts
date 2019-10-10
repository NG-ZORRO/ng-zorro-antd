import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

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
  describe('basic', () => {
    let fixture: ComponentFixture<NzDemoButtonBasicComponent>;
    let buttons: DebugElement[];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule],
        declarations: [NzDemoButtonBasicComponent],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonBasicComponent);
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttons[0].nativeElement.classList.contains('ant-btn-primary')).toBe(true);
      expect(buttons[1].nativeElement.classList.contains('ant-btn-default')).toBe(true);
      expect(buttons[2].nativeElement.classList.contains('ant-btn-dashed')).toBe(true);
      expect(buttons[3].nativeElement.classList.contains('ant-btn-danger')).toBe(true);
      expect(buttons[4].nativeElement.classList.contains('ant-btn-link')).toBe(true);
    });
  });

  describe('button-group', () => {
    let fixture: ComponentFixture<NzDemoButtonButtonGroupComponent>;
    let buttonGroup: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule],
        declarations: [NzDemoButtonButtonGroupComponent],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonButtonGroupComponent);
      buttonGroup = fixture.debugElement.query(By.directive(NzButtonGroupComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttonGroup.nativeElement.classList.contains('ant-btn-group')).toBe(true);
    });
    it('should have no white space', () => {
      fixture.detectChanges();
      expect(
        // @ts-ignore
        Array.from(buttonGroup.nativeElement.firstElementChild).some((node: HTMLElement) => node.nodeType === 3)
      ).toBe(false);
    });
  });

  describe('disabled', () => {
    let fixture: ComponentFixture<NzDemoButtonDisabledComponent>;
    let buttons: DebugElement[];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule],
        declarations: [NzDemoButtonDisabledComponent],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonDisabledComponent);
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct attribute', () => {
      fixture.detectChanges();
      expect(!!buttons[1].nativeElement.attributes.getNamedItem('disabled')).toBe(true);
    });
  });

  describe('ghost', () => {
    let fixture: ComponentFixture<NzDemoButtonGhostComponent>;
    let buttons: DebugElement[];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule],
        declarations: [NzDemoButtonGhostComponent],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonGhostComponent);
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttons.every(button => button.nativeElement.classList.contains('ant-btn-background-ghost'))).toBe(true);
    });
  });

  describe('icon', () => {
    let fixture: ComponentFixture<NzDemoButtonIconComponent>;
    let buttons: DebugElement[];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule, NzIconTestModule],
        declarations: [NzDemoButtonIconComponent],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonIconComponent);
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct style', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(buttons[0].nativeElement.classList.contains('ant-btn-icon-only')).toBe(true);
      expect(buttons[0].nativeElement.classList.contains('ant-btn-circle')).toBe(true);
      expect(buttons[2].nativeElement.classList.contains('ant-btn-icon-only')).toBe(false);
      expect(buttons[2].nativeElement.firstElementChild!.classList.contains('anticon-search')).toBe(true);
      expect(buttons[2].nativeElement.firstElementChild.style.cssText).toBe('display: inline-block;');
    }));
  });

  describe('loading', () => {
    let fixture: ComponentFixture<NzDemoButtonLoadingComponent>;
    let buttons: DebugElement[];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule, NzIconTestModule],
        declarations: [NzDemoButtonLoadingComponent],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonLoadingComponent);
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttons[0].nativeElement.classList.contains('ant-btn-loading')).toBe(true);
    });

    it('should loading when click without icon', fakeAsync(() => {
      const button = buttons[2];
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild.localName).toBe('span');
      button.nativeElement.click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(true);
      expect(button.nativeElement.firstElementChild.firstElementChild!.classList.contains('anticon-spin')).toBe(true);
      expect(button.nativeElement.firstElementChild!.classList.contains('anticon-loading')).toBe(true);
      expect(button.nativeElement.firstElementChild.localName).toBe('i');
      tick(5000);
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild.localName).toBe('span');
    }));

    it('should loading when click with icon', fakeAsync(() => {
      const button = buttons[3];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild.querySelector('svg')).not.toBe(null);
      expect(button.nativeElement.firstElementChild!.classList.contains('anticon-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild!.classList.contains('anticon-poweroff')).toBe(true);
      expect(button.nativeElement.firstElementChild.localName).toBe('i');
      button.nativeElement.click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(true);
      expect(button.nativeElement.firstElementChild.firstElementChild!.classList.contains('anticon-spin')).toBe(true);
      expect(button.nativeElement.firstElementChild!.classList.contains('anticon-loading')).toBe(true);
      expect(button.nativeElement.firstElementChild.localName).toBe('i');
      tick(5000);
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild.querySelector('svg')).not.toBe(null);
      expect(button.nativeElement.firstElementChild!.classList.contains('anticon-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild!.classList.contains('anticon-poweroff')).toBe(true);
      expect(button.nativeElement.firstElementChild.localName).toBe('i');
    }));
  });

  describe('size', () => {
    let fixture: ComponentFixture<NzDemoButtonSizeComponent>;
    let testComponent: NzDemoButtonSizeComponent;
    let buttons: DebugElement[];
    let buttonGroup: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule],
        declarations: [NzDemoButtonSizeComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonSizeComponent);
      testComponent = fixture.debugElement.componentInstance;
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent)).filter((_, index) => index < 6);
      buttonGroup = fixture.debugElement.query(By.directive(NzButtonGroupComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttons.every(button => button.nativeElement.classList.contains('ant-btn-lg'))).toBe(true);
      expect(buttonGroup.nativeElement.classList.contains('ant-btn-group-lg')).toBe(true);
      testComponent.size = 'default';
      fixture.detectChanges();
      expect(buttons.every(button => button.nativeElement.classList.contains('ant-btn-lg'))).toBe(false);
      expect(buttonGroup.nativeElement.classList.contains('ant-btn-group-lg')).toBe(false);
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(buttons.every(button => button.nativeElement.classList.contains('ant-btn-sm'))).toBe(true);
      expect(buttonGroup.nativeElement.classList.contains('ant-btn-group-sm')).toBe(true);
    });
  });

  describe('icon', () => {
    let fixture: ComponentFixture<NzTestButtonSearchComponent>;
    let button: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule],
        declarations: [NzTestButtonSearchComponent],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestButtonSearchComponent);
      button = fixture.debugElement.query(By.directive(NzButtonComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-input-search-button')).toBe(true);
    });
  });

  describe('block', () => {
    let fixture: ComponentFixture<NzDemoButtonBlockComponent>;
    let buttons: DebugElement[];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule],
        declarations: [NzDemoButtonBlockComponent],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoButtonBlockComponent);
      buttons = fixture.debugElement.queryAll(By.directive(NzButtonComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(buttons[0].nativeElement.classList.contains('ant-btn-primary')).toBe(true);
      expect(buttons[1].nativeElement.classList.contains('ant-btn-default')).toBe(true);
      expect(buttons[2].nativeElement.classList.contains('ant-btn-dashed')).toBe(true);
      expect(buttons[3].nativeElement.classList.contains('ant-btn-danger')).toBe(true);
      expect(buttons[4].nativeElement.classList.contains('ant-btn-link')).toBe(true);

      expect(buttons.every(button => button.nativeElement.classList.contains('ant-btn-block'))).toBe(true);
    });
  });

  describe('binding', () => {
    let fixture: ComponentFixture<NzTestButtonBindingComponent>;
    let button: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule, NzIconTestModule],
        declarations: [NzTestButtonBindingComponent],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestButtonBindingComponent);
      button = fixture.debugElement.query(By.directive(NzButtonComponent));
    });

    it('should hide icon when loading correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild.querySelector('svg')).not.toBe(null);
      expect(button.nativeElement.firstElementChild!.classList.contains('anticon-poweroff')).toBe(true);
      expect(button.nativeElement.firstElementChild!.classList.contains('anticon-loading')).toBe(false);
      button.nativeElement.click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(true);
      expect(button.nativeElement.firstElementChild!.classList.contains('anticon-loading')).toBe(true);
      expect(button.nativeElement.querySelector('.anticon-poweroff').style.cssText).toBe('display: none;');
      tick(5000);
      fixture.detectChanges();
      expect(button.nativeElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(button.nativeElement.firstElementChild!.classList.contains('anticon-loading')).toBe(false);
      expect(button.nativeElement.querySelector('.anticon-poweroff').style.cssText).toBe('display: inline-block;');
    }));
  });
  describe('with icon', () => {
    let fixture: ComponentFixture<NzTestButtonWithIconComponent>;
    let button: DebugElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NzButtonModule],
        declarations: [NzTestButtonWithIconComponent],
        providers: []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestButtonWithIconComponent);
      button = fixture.debugElement.query(By.directive(NzButtonComponent));
    });

    it('should have correct style', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(button.nativeElement.firstElementChild.tagName).toBe('SPAN');
    }));
  });
});

@Component({
  template: `
    <button nz-button nzSearch></button>
  `
})
export class NzTestButtonSearchComponent {}

// https://github.com/NG-ZORRO/ng-zorro-antd/issues/2191
@Component({
  template: `
    <button nz-button nzType="primary" (click)="load()" [nzLoading]="loading">
      <i nz-icon nzType="poweroff"></i> {{ 'Click me!' }}
    </button>
  `
})
export class NzTestButtonBindingComponent {
  loading = false;

  load(): void {
    this.loading = true;
    setTimeout(() => (this.loading = false), 5000);
  }
}
// https://github.com/NG-ZORRO/ng-zorro-antd/issues/3079
@Component({
  template: `
    <button nz-button>
      {{ title }}
      <i nz-icon nzType="caret-down"></i>
    </button>
  `
})
export class NzTestButtonWithIconComponent {
  title = 'button';
}
