import { BACKSPACE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, NgZone, ViewChild } from '@angular/core';
import { async, fakeAsync, flush, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  createKeyboardEvent,
  dispatchFakeEvent,
  dispatchMouseEvent,
  typeInElement,
  MockNgZone,
  NzTreeNode,
  NzTreeNodeOptions
} from 'ng-zorro-antd/core';

import { NzTreeSelectComponent } from './nz-tree-select.component';
import { NzTreeSelectModule } from './nz-tree-select.module';

describe('tree-select component', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let zone: MockNgZone;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzTreeSelectModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule],
      declarations: [
        NzTestTreeSelectBasicComponent,
        NzTestTreeSelectCheckableComponent,
        NzTestTreeSelectFormComponent,
        NzTestTreeSelectCustomizedIconComponent
      ],
      providers: [
        {
          provide: NgZone,
          useFactory: () => {
            zone = new MockNgZone();
            return zone;
          }
        }
      ]
    });
    TestBed.compileComponents();
    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  }));

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  describe('basic', () => {
    let fixture: ComponentFixture<NzTestTreeSelectBasicComponent>;
    let testComponent: NzTestTreeSelectBasicComponent;
    let treeSelectComponent: NzTreeSelectComponent;
    let treeSelect: DebugElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
      treeSelectComponent = treeSelect.componentInstance;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
    }));

    it('should size work', fakeAsync(() => {
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-sm');
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-lg');
    }));
    it('should allowClear work', () => {
      expect(treeSelect.nativeElement.classList).not.toContain('ant-select-allow-clear');
      testComponent.allowClear = true;
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-allow-clear');
    });
    it('should click toggle open', () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(false);
    });
    it('should close when the outside clicks', () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      dispatchFakeEvent(overlayContainerElement.querySelector('.cdk-overlay-backdrop')!, 'click');
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(false);
      fixture.detectChanges();
    });
    it('should disabled work', fakeAsync(() => {
      expect(treeSelect.nativeElement.classList).toContain('ant-select-enabled');
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).not.toContain('ant-select-enabled');
      expect(treeSelect.nativeElement.classList).toContain('ant-select-disabled');
      expect(treeSelectComponent.nzOpen).toBe(false);
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      tick();
      expect(treeSelectComponent.nzOpen).toBe(false);
      treeSelectComponent.openDropdown();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      tick();
    }));
    it('should dropdownMatchSelectWidth work', () => {
      testComponent.dropdownMatchSelectWidth = true;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
      expect(overlayPane.style.width).toBe('250px');
      treeSelectComponent.closeDropDown();
      fixture.detectChanges();
      testComponent.dropdownMatchSelectWidth = false;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      expect(overlayPane.style.minWidth).toBe('250px');
    });
    it('should clear value work', fakeAsync(() => {
      testComponent.allowClear = true;
      fixture.detectChanges();
      expect(testComponent.value).toBe('10001');
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      treeSelect.nativeElement.querySelector('.ant-select-selection__clear').click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(null);
    }));
    it('should set null value work', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.value).toBe('10001');
      testComponent.nzSelectTreeComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.setNull();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.value).toBe(null);
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toEqual(0);
      expect(testComponent.nzSelectTreeComponent.value.length).toBe(0);
    }));
    it('should dropdown style work', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      flush();
      const targetElement = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(targetElement.style.height).toBe('120px');
    }));
    it('should click option close dropdown', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      fixture.detectChanges();
      const targetNode = overlayContainerElement.querySelectorAll('nz-tree-node')[2];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      flush();
      expect(treeSelectComponent.nzOpen).toBe(false);
    }));
    it('should showSearch work', fakeAsync(() => {
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.showSearch = true;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelect.nativeElement.querySelector('.ant-select-search--inline')).not.toBeNull();
      testComponent.showSearch = false;
      fixture.detectChanges();
      tick();
      expect(treeSelect.nativeElement.querySelector('.ant-select-search--inline')).toBeNull();
    }));
    it('should display no data', fakeAsync(() => {
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.showSearch = true;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeFalsy();
      fixture.detectChanges();
      treeSelectComponent.inputValue = 'invalid_value';
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBe('');
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeTruthy();
    }));
    it('should selectedValueDisplay style correct', fakeAsync(() => {
      testComponent.showSearch = true;
      fixture.detectChanges();
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      const selectedValueEl = treeSelect.nativeElement.querySelector('.ant-select-selection-selected-value');
      const inputEl = treeSelect.nativeElement.querySelector('.ant-select-search__field');
      expect(selectedValueEl.style.display).toBe('block');
      expect(selectedValueEl.style.opacity).toBe('1');
      treeSelectComponent.nzOpen = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(selectedValueEl.style.display).toBe('block');
      expect(selectedValueEl.style.opacity).toBe('0.4');
      inputEl.value = 'test';
      dispatchFakeEvent(inputEl, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectedValueEl.style.display).toBe('none');
      expect(selectedValueEl.style.opacity).toBe('1');
    }));
    it('should max tag count work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.multiple = true;
      fixture.detectChanges();
      testComponent.value = ['1001', '10001', '100011', '100012'];
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(treeSelect.nativeElement.querySelectorAll('.ant-select-selection__choice').length).toBe(4);
      testComponent.maxTagCount = 2;
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(treeSelect.nativeElement.querySelectorAll('.ant-select-selection__choice').length).toBe(3);
      const maxTagPlaceholderElement = treeSelect.nativeElement
        .querySelectorAll('.ant-select-selection__choice')[2]
        .querySelector('.ant-select-selection__choice__content');
      expect(maxTagPlaceholderElement).toBeTruthy();
      expect(maxTagPlaceholderElement.innerText.trim()).toBe(
        `+ ${testComponent.value.length - testComponent.maxTagCount} ...`
      );
    }));

    it('should set selectable', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      let node = overlayContainerElement.querySelector('nz-tree-node')!;
      dispatchMouseEvent(node, 'click');
      fixture.detectChanges();
      flush();
      expect(treeSelectComponent.nzOpen).toBe(false);
      testComponent.nodes[0].selectable = false;
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      node = overlayContainerElement.querySelector('nz-tree-node')!;
      dispatchMouseEvent(node, 'click');
      fixture.detectChanges();
      flush();
      expect(treeSelectComponent.nzOpen).toBe(true);
    }));
  });

  describe('checkable', () => {
    let fixture: ComponentFixture<NzTestTreeSelectCheckableComponent>;
    let testComponent: NzTestTreeSelectCheckableComponent;
    let treeSelectComponent: NzTreeSelectComponent;
    let treeSelect: DebugElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectCheckableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
      treeSelectComponent = treeSelect.componentInstance;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
    }));

    it('should is multiple', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      expect(treeSelectComponent.isMultiple).toBe(true);
      flush();
    }));

    it('should update input width', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      testComponent.showSearch = true;
      fixture.detectChanges();
      flush();
      const input = treeSelect.nativeElement.querySelector('input') as HTMLInputElement;
      typeInElement('test', input);
      fixture.detectChanges();
      flush();
      typeInElement('test test test', input);
      fixture.detectChanges();
      flush();
      treeSelectComponent.inputValue = '';
      fixture.detectChanges();
      flush();
      typeInElement('', input);
      fixture.detectChanges();
      flush();
      zone.simulateZoneExit();
      fixture.detectChanges();
      expect(input.style.width === '').toBe(true);
    }));

    it('should set null value work', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.value![0]).toBe('1000122');
      testComponent.setNull();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.value).toBe(null);
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toBe(0);
      expect(testComponent.nzSelectTreeComponent.value.length).toBe(0);
    }));

    it('should not check strictly work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.value = ['1001', '10001', '100012'];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toBe(1);
    }));

    it('should check strictly work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.checkStrictly = true;
      testComponent.value = ['1001', '10001', '100012'];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toBe(3);
      testComponent.checkStrictly = false;
      fixture.detectChanges();
    }));

    it('should remove checked when press backs', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      testComponent.showSearch = true;
      fixture.detectChanges();
      flush();
      const input = treeSelect.nativeElement.querySelector('input') as HTMLInputElement;
      const BACKSPACE_EVENT = createKeyboardEvent('keydown', BACKSPACE, input);
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      expect(treeSelectComponent.selectedNodes.length === 1).toBe(true);
      treeSelectComponent.onKeyDownInput(BACKSPACE_EVENT);
      fixture.detectChanges();
      tick(200);
      expect(treeSelectComponent.selectedNodes.length === 0).toBe(true);
      treeSelectComponent.onKeyDownInput(BACKSPACE_EVENT);
      fixture.detectChanges();
      tick(200);
      expect(treeSelectComponent.selectedNodes.length === 0).toBe(true);
    }));

    it('should click option not close dropdown', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      fixture.detectChanges();
      const targetNode = overlayContainerElement.querySelectorAll('nz-tree-node')[2];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      flush();
      expect(treeSelectComponent.nzOpen).toBe(true);
    }));

    it('should prevent open the dropdown when click remove', fakeAsync(() => {
      testComponent.value = ['1000122'];
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(treeSelectComponent.selectedNodes.length).toBe(1);
      treeSelect.nativeElement.querySelector('.ant-select-selection__choice__remove').click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(treeSelectComponent.selectedNodes.length).toBe(0);
      expect(treeSelectComponent.nzOpen).toBe(false);
    }));

    it('should display no data', fakeAsync(() => {
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.showSearch = true;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeFalsy();
      fixture.detectChanges();
      treeSelectComponent.inputValue = 'invalid_value';
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBe('');
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeTruthy();
    }));
  });

  describe('form', () => {
    let fixture: ComponentFixture<NzTestTreeSelectFormComponent>;
    let testComponent: NzTestTreeSelectFormComponent;
    let treeSelect: DebugElement;
    let treeSelectComponent: NzTreeSelectComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectFormComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
      treeSelectComponent = treeSelect.componentInstance;
    });
    it('should set disabled work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).not.toContain('ant-select-disabled');
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-disabled');
    }));

    it('should set null value work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('select')!.value).toBe('10021');
      testComponent.setNull();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.formGroup.get('select')!.value).toBe(null);
      expect(treeSelectComponent.selectedNodes.length).toBe(0);
      expect(treeSelectComponent.value.length).toBe(0);
    }));
  });

  describe('tree component', () => {
    let fixture: ComponentFixture<NzTestTreeSelectCheckableComponent>;
    let testComponent: NzTestTreeSelectCheckableComponent;
    let treeSelectComponent: NzTreeSelectComponent;
    let treeSelect: DebugElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectCheckableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
      treeSelectComponent = treeSelect.componentInstance;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
    }));

    it('should keep expand state', () => {
      testComponent.expandKeys = [];
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzDefaultExpandedKeys.length === 0).toBe(true);
      expect(treeSelectComponent.nzExpandedKeys.length === 0).toBe(true);
      expect(treeSelectComponent.nzOpen).toBe(true);
      let targetSwitcher = overlayContainerElement.querySelector('.ant-select-tree-switcher')!;
      expect(targetSwitcher.classList.contains('ant-select-tree-switcher_close')).toBe(true);
      fixture.detectChanges();
      dispatchMouseEvent(targetSwitcher, 'click');
      fixture.detectChanges();
      expect(targetSwitcher.classList.contains('ant-select-tree-switcher_open')).toBe(true);
      expect(treeSelectComponent.nzDefaultExpandedKeys[0] === '1001').toBe(true);
      expect(treeSelectComponent.nzExpandedKeys[0] === '1001').toBe(true);
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(false);
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      targetSwitcher = overlayContainerElement.querySelector('.ant-select-tree-switcher')!;
      expect(treeSelectComponent.nzOpen).toBe(true);
      expect(targetSwitcher.classList.contains('ant-select-tree-switcher_open')).toBe(true);
      expect(treeSelectComponent.nzDefaultExpandedKeys[0] === '1001').toBe(true);
      expect(treeSelectComponent.nzExpandedKeys[0] === '1001').toBe(true);
    });
  });

  describe('customized icon', () => {
    let fixture: ComponentFixture<NzTestTreeSelectCustomizedIconComponent>;
    let treeSelect: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectCustomizedIconComponent);
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
    });
    it('should display', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('i.anticon.anticon-frown-o')).toBeTruthy();
    }));
  });
});

@Component({
  template: `
    <nz-tree-select
      style="width:250px;position: relative;display: block;"
      nzPlaceHolder="Please select"
      [nzExpandedKeys]="expandKeys"
      [nzNodes]="nodes"
      [(ngModel)]="value"
      [nzSize]="size"
      [nzAllowClear]="allowClear"
      [nzDropdownMatchSelectWidth]="dropdownMatchSelectWidth"
      [nzDisabled]="disabled"
      [nzShowSearch]="showSearch"
      [nzMultiple]="multiple"
      [nzMaxTagCount]="maxTagCount"
      [nzDropdownStyle]="{ height: '120px' }"
    >
    </nz-tree-select>
  `
})
export class NzTestTreeSelectBasicComponent {
  @ViewChild(NzTreeSelectComponent, { static: false }) nzSelectTreeComponent: NzTreeSelectComponent;
  expandKeys = ['1001', '10001'];
  value: string | string[] | null = '10001';
  size = 'default';
  allowClear = false;
  disabled = false;
  showSearch = false;
  dropdownMatchSelectWidth = true;
  multiple = false;
  maxTagCount = Infinity;
  nodes: NzTreeNodeOptions[] = [
    {
      title: 'root1',
      key: '1001',
      children: [
        {
          title: 'child1',
          key: '10001',
          children: [
            {
              title: 'child1.1',
              key: '100011',
              children: []
            },
            {
              title: 'child1.2',
              key: '100012',
              children: [
                {
                  title: 'grandchild1.2.1',
                  key: '1000121',
                  isLeaf: true,
                  disabled: true
                },
                {
                  title: 'grandchild1.2.2',
                  key: '1000122',
                  isLeaf: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'root2',
      key: '1002',
      children: [
        {
          title: 'child2.1',
          key: '10021',
          children: [],
          disableCheckbox: true
        },
        {
          title: 'child2.2',
          key: '10022',
          children: [
            {
              title: 'grandchild2.2.1',
              key: '100221',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];

  setNull(): void {
    this.value = null;
  }
}

@Component({
  template: `
    <nz-tree-select
      style="width: 250px"
      nzPlaceHolder="Please select"
      [nzDefaultExpandedKeys]="expandKeys"
      [nzNodes]="nodes"
      [nzShowSearch]="showSearch"
      [nzCheckable]="true"
      [nzCheckStrictly]="checkStrictly"
      [(ngModel)]="value"
    >
    </nz-tree-select>
  `
})
export class NzTestTreeSelectCheckableComponent {
  @ViewChild(NzTreeSelectComponent, { static: false }) nzSelectTreeComponent: NzTreeSelectComponent;
  expandKeys = ['1001', '10001'];
  value: string[] | null = ['1000122'];
  showSearch = false;
  checkStrictly = false;
  nodes = [
    {
      title: 'root1',
      key: '1001',
      children: [
        {
          title: 'child1',
          key: '10001',
          children: [
            {
              title: 'child1.1',
              key: '100011',
              children: []
            },
            {
              title: 'child1.2',
              key: '100012',
              children: [
                {
                  title: 'grandchild1.2.1',
                  key: '1000121',
                  isLeaf: true,
                  disabled: true
                },
                {
                  title: 'grandchild1.2.2',
                  key: '1000122',
                  isLeaf: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'root2',
      key: '1002',
      children: [
        {
          title: 'child2.1',
          key: '10021',
          children: [],
          disableCheckbox: true
        },
        {
          title: 'child2.2',
          key: '10022',
          children: [
            {
              title: 'grandchild2.2.1',
              key: '100221',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];

  setNull(): void {
    this.value = null;
  }
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <nz-tree-select formControlName="select" style="width: 250px" [nzNodes]="nodes"> </nz-tree-select>
    </form>
  `
})
export class NzTestTreeSelectFormComponent {
  formGroup: FormGroup;
  nodes = [
    {
      title: 'root2',
      key: '1002',
      children: [
        {
          title: 'child2.1',
          key: '10021'
        },
        {
          title: 'child2.2',
          key: '10022'
        }
      ]
    }
  ].map(item => new NzTreeNode(item));

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      select: '10021'
    });
  }

  disable(): void {
    this.formGroup.disable();
  }

  setNull(): void {
    this.formGroup.get('select')!.reset(null);
  }
}

@Component({
  template: `
    <nz-tree-select [nzNodes]="nodes" [(ngModel)]="value">
      <ng-template #nzTreeTemplate let-node>
        <span> <i class="anticon anticon-frown-o"></i> {{ node.title }} </span>
      </ng-template>
    </nz-tree-select>
  `
})
export class NzTestTreeSelectCustomizedIconComponent {
  value: string;
  nodes = [
    new NzTreeNode({
      title: 'root3',
      key: '1003',
      children: [
        {
          title: 'child3.1',
          key: '10031'
        },
        {
          title: 'child3.2',
          key: '10032'
        }
      ]
    })
  ];
}
