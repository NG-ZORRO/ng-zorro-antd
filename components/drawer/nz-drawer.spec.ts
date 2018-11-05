import {
  Component, Input,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { async, fakeAsync, flush, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayContainer } from '@angular/cdk/overlay';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NzDrawerRef } from './nz-drawer-ref';
import { NzDrawerComponent } from './nz-drawer.component';
import { NzDrawerModule } from './nz-drawer.module';
import { NzDrawerService } from './nz-drawer.service';

describe('NzDrawerComponent', () => {
  let component: NzTestDrawerComponent;
  let fixture: ComponentFixture<NzTestDrawerComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ NzDrawerModule ],
      declarations: [ NzTestDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([ OverlayContainer ], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    component.close();
    overlayContainer.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open work', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect(component.drawerComponent.nzVisible).toBe(true);
  });

  it('should close work', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    component.close();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(false);
    expect(component.drawerComponent.nzVisible).toBe(false);
  });

  it('should set body overflow', fakeAsync(() => {
    component.open();
    fixture.detectChanges();
    expect(document.body.style.overflow).toBe('hidden');
    component.close();
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();
    expect(document.body.style.overflow).toBe('');
  }));

  it('should hied close button', () => {
    component.closable = false;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-close')).toBe(null);

  });

  it('should closable', () => {
    component.closable = true;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-close') as HTMLElement).click();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(false);
  });

  it('should not close when click mask', () => {
    component.maskClosable = false;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).click();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
  });

  it('should close when click mask', () => {
    component.maskClosable = true;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).click();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(false);
  });

  it('should not show mask', () => {
    component.showMask = false;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask')).toBe(null);
    component.showMask = true;
    fixture.detectChanges();
  });

  it('should set nzMaskStyle & nzBodyStyle', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).style.color).toBe('gray');
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-body') as HTMLElement).style.color).toBe('gray');
  });

  it('should not render title', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-header')).toBe(null);
  });

  it('should support string title', () => {
    component.title = component.stringTitle;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title') as HTMLElement).innerText.trim()).toBe('test');
  });

  it('should support TemplateRef title', () => {
    component.title = component.templateTitle;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title .custom-title')).not.toBe(null);
  });

  it('should support custom width', () => {
    component.width = '500px';
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content') as HTMLElement).getBoundingClientRect().width).toBe(500);
  });

  it('should support custom number type width', () => {
    component.width = 520;
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content') as HTMLElement).getBoundingClientRect().width).toBe(520);
  });

  it('should support custom height', () => {
    component.height = '500px';
    component.placement = 'top';
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement).getBoundingClientRect().height).toBe(500);
    component.placement = 'left';
    fixture.detectChanges();
  });

  it('should support custom number type height', () => {
    component.height = 520;
    component.placement = 'top';
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement).getBoundingClientRect().height).toBe(520);
    component.placement = 'left';
    fixture.detectChanges();
  });

  it('should nzWrapClassName work', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement).classList.contains('test-class')).toBe(true);
  });

  it('should nzZIndex work', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).style.zIndex).toBe('1001');
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement).style.zIndex).toBe('1001');
  });

  it('should nzPlacement work', () => {
    component.open();
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-bottom')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-top')).toBe(false);
    component.placement = 'right';
    fixture.detectChanges();
    component.close();
    fixture.detectChanges();
    component.open();
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-right')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-bottom')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-top')).toBe(false);
    component.placement = 'top';
    fixture.detectChanges();
    component.close();
    fixture.detectChanges();
    component.open();
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-right')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-bottom')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-top')).toBe(true);
    component.placement = 'bottom';
    fixture.detectChanges();
    component.close();
    fixture.detectChanges();
    component.open();
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-right')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-bottom')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-top')).toBe(false);
    component.close();
    fixture.detectChanges();
    component.placement = 'Invalid';
    fixture.detectChanges();
    component.open();
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-right')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-bottom')).toBe(false);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-top')).toBe(false);
    component.close();
    fixture.detectChanges();
  });

  it('should nzOffsetX work', () => {
    component.open();
    component.placement = 'left';
    component.width = '300px';
    component.offsetX = 100;
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe('translateX(100px)');
    fixture.detectChanges();
    component.placement = 'right';
    component.offsetX = 100;
    fixture.detectChanges();
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe('translateX(-100px)');
    component.close();
    fixture.detectChanges();
  });

  it('should nzOffsetY work', () => {
    component.open();
    component.placement = 'top';
    component.height = '300px';
    component.offsetY = 100;
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-drawer').classList.contains('ant-drawer-open')).toBe(true);
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe('translateY(100px)');
    fixture.detectChanges();
    component.placement = 'bottom';
    component.offsetY = 100;
    fixture.detectChanges();
    expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe('translateY(-100px)');
    component.close();
    fixture.detectChanges();
  });

  it('should allow scroll', () => {
    component.placement = 'right';
    component.open();
    fixture.detectChanges();
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-wrapper-body') as HTMLElement).style.overflow).toBe('auto');
    expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-wrapper-body') as HTMLElement).style.height).toBe('100%');
  });
});

describe('NzDrawerService', () => {
  let component: NzTestDrawerWithServiceComponent;
  let fixture: ComponentFixture<NzTestDrawerWithServiceComponent>;
  let overlayContainer: OverlayContainer;
  let drawerService: NzDrawerService;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ NzDrawerModule ],
      providers   : [NzDrawerService],
      declarations: [ NzTestDrawerWithServiceComponent, NzDrawerCustomComponent ]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: { entryComponents: [ NzDrawerCustomComponent ] }
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NzTestDrawerWithServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(inject([ OverlayContainer, NzDrawerService ], (oc: OverlayContainer, ds: NzDrawerService) => {
    overlayContainer = oc;
    drawerService = ds;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should create template content drawer', fakeAsync(() => {
    component.openTemplate();
    fixture.detectChanges();
    tick(300);
    expect(component.templateOpenSpy).toHaveBeenCalled();
    fixture.detectChanges();
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).click();
    tick(300);
    expect(component.templateCloseSpy).toHaveBeenCalled();
    fixture.detectChanges();
  }));

  it('should create component content drawer', fakeAsync(() => {
    const openSpy = jasmine.createSpy('afterOpen spy');
    const closeSpy = jasmine.createSpy('afterClose spy').and.returnValue(1);
    const drawerRef = drawerService.create({
      nzTitle        : 'Service',
      nzContent      : NzDrawerCustomComponent,
      nzContentParams: { value: 1 }
    });
    drawerRef.afterOpen.subscribe(openSpy);
    drawerRef.afterOpen.subscribe(closeSpy);
    fixture.detectChanges();
    expect(openSpy).not.toHaveBeenCalled();
    tick(300);
    expect(openSpy).toHaveBeenCalled();
    (overlayContainerElement.querySelector('.ant-drawer .close-btn') as HTMLElement).click();
    fixture.detectChanges();
    tick(300);
    expect(closeSpy).toHaveBeenCalled();
  }));

});

@Component({
  selector: 'nz-test-drawer',
  template: `
    <button (click)="open()">Open</button>
    <ng-template #customTitle>
      <span class="custom-title">title</span>
      <button class="close-btn"></button>
    </ng-template>
    <nz-drawer
      [nzMaskStyle]="{ color: 'gray' }"
      [nzBodyStyle]="{ color: 'gray' }"
      [nzMaskClosable]="maskClosable"
      [nzWrapClassName]="'test-class'"
      [nzZIndex]="1001"
      [nzClosable]="closable"
      [nzMask]="showMask"
      [nzVisible]="visible"
      [nzWidth]="width"
      [nzHeight]="height"
      [nzPlacement]="placement"
      [nzTitle]="title"
      [nzOffsetX]="offsetX"
      [nzOffsetY]="offsetY"
      (nzOnClose)="close()">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </nz-drawer>
  `,
  styles  : []
})
class NzTestDrawerComponent {
  visible = false;
  closable = true;
  maskClosable = true;
  showMask = true;
  title = null;
  stringTitle = 'test';
  width: string | number = '300px';
  height: string | number = '300px';
  placement = 'left';
  offsetX = 0;
  offsetY = 0;
  @ViewChild('customTitle') templateTitle: TemplateRef<void>;

  @ViewChild(NzDrawerComponent) drawerComponent: NzDrawerComponent;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}

@Component({
  selector: 'nz-test-drawer-with-service',
  template: `
    <ng-template #drawerTemplate>
      <span>Template</span>
    </ng-template>
  `
})
class NzTestDrawerWithServiceComponent {
  @ViewChild('drawerTemplate') drawerTemplate;
  templateOpenSpy = jasmine.createSpy('template afterOpen spy');
  templateCloseSpy = jasmine.createSpy('template afterClose spy');
  templateDrawerRef: NzDrawerRef;

  constructor(
    private drawerService: NzDrawerService
  ) {
  }

  openTemplate(): void {
    this.templateDrawerRef = this.drawerService.create({
      nzTitle        : 'Service',
      nzContent      : this.drawerTemplate
    });

    this.templateDrawerRef.afterOpen.subscribe(this.templateOpenSpy);
    this.templateDrawerRef.afterClose.subscribe(this.templateCloseSpy);
  }

}

@Component({
  selector: 'nz-drawer-custom-component',
  template: `
    <div>
      <p>Custom Component</p>
      <button class="close-btn" (click)="close()" nz-button>Close</button>
    </div>
  `
})
export class NzDrawerCustomComponent {

  @Input() value;
  constructor(
    private drawerRef: NzDrawerRef
  ) {
  }

  close(): void {
    this.drawerRef.close(this.value);
  }
}
