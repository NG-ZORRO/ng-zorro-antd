import { Component, QueryList, ViewChild } from '@angular/core';
import { async, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzOptionContainerComponent } from './nz-option-container.component';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';
import { NzSelectModule } from './nz-select.module';

import { createMouseEvent, dispatchKeyboardEvent } from '../core/testing';

describe('nz-select option container', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzSelectModule, NoopAnimationsModule ],
      declarations: [ NzTestOptionContainerSingleComponent, NzTestOptionContainerTagsComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture;
    let testComponent;
    let oc;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestOptionContainerSingleComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      oc = fixture.debugElement.query(By.directive(NzOptionContainerComponent));
    });
    it('should listOfTemplateOption correct', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testComponent.templateOptionChange).toHaveBeenCalledTimes(1);
        expect(testComponent.listOfTemplateOption.length).toBe(9);
      });
    }));
    it('should template option change work', async(() => {
      fixture.detectChanges();
      const queryList = testComponent.generateListOfOption([
        {
          value   : { value: 'test1' },
          label   : 'test1',
          disabled: false
        },
        {
          value   : { value: 'test2' },
          label   : 'test2',
          disabled: false
        },
        {
          value   : { value: 'test3' },
          label   : 'test3',
          disabled: true
        },
        {
          value   : { value: 'test4' },
          label   : 'test4',
          disabled: true
        }
      ]);
      testComponent.listOfNzOptionComponent.reset(queryList.toArray());
      testComponent.listOfNzOptionComponent.notifyOnChanges();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testComponent.templateOptionChange).toHaveBeenCalledTimes(2);
        expect(testComponent.listOfTemplateOption.length).toBe(10);
      });
    }));
    it('should template group option change work', async(() => {
      fixture.detectChanges();
      const queryList = testComponent.generateListOfGroupOption([
        {
          label       : 'group1',
          listOfOption: testComponent.generateListOfOption([
            {
              value   : { value: 'sub1-1' },
              label   : 'sub1-1',
              disabled: false
            },
            {
              value   : { value: 'sub1-2' },
              label   : 'sub1-2',
              disabled: false
            },
            {
              value   : { value: 'sub1-3' },
              label   : 'sub1-3',
              disabled: true
            }
          ])
        }
      ]);
      testComponent.listOfNzOptionGroupComponent.reset(queryList.toArray());
      testComponent.listOfNzOptionGroupComponent.notifyOnChanges();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testComponent.templateOptionChange).toHaveBeenCalledTimes(2);
        expect(testComponent.listOfTemplateOption.length).toBe(6);
      });
    }));
    it('should group sub list option change work', async(() => {
      fixture.detectChanges();
      const queryList = testComponent.generateListOfOption([
        {
          value   : { value: 'sub1-1' },
          label   : 'sub1-1',
          disabled: false
        },
        {
          value   : { value: 'sub1-2' },
          label   : 'sub1-2',
          disabled: false
        }
      ]);
      testComponent.listOfNzOptionGroupComponent.first.listOfNzOptionComponent.reset(queryList.toArray());
      testComponent.listOfNzOptionGroupComponent.first.listOfNzOptionComponent.notifyOnChanges();
      fixture.whenStable().then(() => {
        expect(testComponent.templateOptionChange).toHaveBeenCalledTimes(2);
        expect(testComponent.listOfTemplateOption.length).toBe(8);
      });
    }));
    it('should click option work', async(() => {
      fixture.detectChanges();
      const lis = oc.nativeElement.querySelectorAll('.ant-select-dropdown-menu-item');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        lis[ 1 ].click();
        fixture.detectChanges();
        expect(testComponent.listOfSelectedValue[ 0 ].value).toBe('test2');
        expect(testComponent.clickOption).toHaveBeenCalledTimes(1);
        expect(testComponent.updateListOfSelectedValueFromOptionContainer).toHaveBeenCalledTimes(1);
      });
    }));
    it('should up arrow keydown work', async(() => {
      fixture.detectChanges();
      const ul = oc.nativeElement.querySelector('.ant-select-dropdown-menu');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        dispatchKeyboardEvent(ul, 'keydown', 38);
        fixture.detectChanges();
        expect(oc.nativeElement.querySelector('.ant-select-dropdown-menu-item-active').innerText).toBe('sub2-3');
      });
    }));
    it('should down arrow keydown work', async(() => {
      fixture.detectChanges();
      const ul = oc.nativeElement.querySelector('.ant-select-dropdown-menu');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        dispatchKeyboardEvent(ul, 'keydown', 40);
        dispatchKeyboardEvent(ul, 'keydown', 40);
        fixture.detectChanges();
        expect(oc.nativeElement.querySelector('.ant-select-dropdown-menu-item-active').innerText).toBe('test2');
      });
    }));
    it('should enter keydown same option work', async(() => {
      fixture.detectChanges();
      const ul = oc.nativeElement.querySelector('.ant-select-dropdown-menu');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        dispatchKeyboardEvent(ul, 'keydown', 13);
        fixture.detectChanges();
        expect(testComponent.clickOption).toHaveBeenCalledTimes(1);
        expect(testComponent.updateListOfSelectedValueFromOptionContainer).toHaveBeenCalledTimes(0);
      });
    }));
    it('should enter keydown other option work', async(() => {
      fixture.detectChanges();
      const ul = oc.nativeElement.querySelector('.ant-select-dropdown-menu');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        dispatchKeyboardEvent(ul, 'keydown', 40);
        dispatchKeyboardEvent(ul, 'keydown', 40);
        fixture.detectChanges();
        dispatchKeyboardEvent(ul, 'keydown', 13);
        fixture.detectChanges();
        expect(testComponent.clickOption).toHaveBeenCalledTimes(1);
        expect(testComponent.listOfSelectedValue[ 0 ].value).toBe('test2');
        expect(testComponent.updateListOfSelectedValueFromOptionContainer).toHaveBeenCalledTimes(1);
      });
    }));
    it('should reset active work', async(() => {
      fixture.detectChanges();
      const ul = oc.nativeElement.querySelector('.ant-select-dropdown-menu');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        dispatchKeyboardEvent(ul, 'keydown', 40);
        dispatchKeyboardEvent(ul, 'keydown', 40);
        fixture.detectChanges();
        expect(oc.nativeElement.querySelector('.ant-select-dropdown-menu-item-active').innerText).toBe('test2');
        testComponent.nzOptionContainerComponent.resetActiveOption();
        fixture.detectChanges();
        expect(oc.nativeElement.querySelector('.ant-select-dropdown-menu-item-active')).toBeNull();
      });
    }));
    it('should search work', () => {
      fixture.detectChanges();
      const ul = oc.nativeElement.querySelector('.ant-select-dropdown-menu');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        dispatchKeyboardEvent(ul, 'keydown', 40);
        dispatchKeyboardEvent(ul, 'keydown', 40);
        fixture.detectChanges();
        expect(oc.nativeElement.querySelector('.ant-select-dropdown-menu-item-active').innerText).toBe('test2');
        testComponent.searchValue = 'sub1-1';
        fixture.detectChanges();
        expect(oc.nativeElement.querySelector('.ant-select-dropdown-menu-item-active').innerText).toBe('sub1-1');
      });
    });
    it('should scroll bottom work', () => {
      fixture.detectChanges();
      const ul = oc.nativeElement.querySelector('.ant-select-dropdown-menu');
      const scrollEvent = createMouseEvent('scroll');
      testComponent.nzOptionContainerComponent.dropDownScroll(scrollEvent, ul);
      fixture.detectChanges();
      expect(testComponent.scrollToBottom).toHaveBeenCalledTimes(1);
    });
  });
  describe('option with tags', () => {
    let fixture;
    let testComponent;
    let oc;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestOptionContainerTagsComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      oc = fixture.debugElement.query(By.directive(NzOptionContainerComponent));
    });
    it('should tags option correct', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testComponent.nzOptionContainerComponent.listOfTagOption.length).toBe(1);
      });
    }));
    it('should click tag option work', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testComponent.nzOptionContainerComponent.listOfTagOption.length).toBe(1);
        oc.nativeElement.querySelectorAll('.ant-select-dropdown-menu-item-selected')[ 1 ].click();
        fixture.detectChanges();
        expect(testComponent.nzOptionContainerComponent.listOfTagOption.length).toBe(0);
        expect(testComponent.listOfSelectedValue.length).toBe(1);
        expect(testComponent.listOfSelectedValue[ 0 ]).toBe('test1');
      });
    }));
    it('should keydown enter tags option work', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testComponent.nzOptionContainerComponent.listOfTagOption.length).toBe(1);
        const ul = oc.nativeElement.querySelector('.ant-select-dropdown-menu');
        dispatchKeyboardEvent(ul, 'keydown', 38);
        dispatchKeyboardEvent(ul, 'keydown', 38);
        fixture.detectChanges();
        dispatchKeyboardEvent(ul, 'keydown', 13);
        fixture.detectChanges();
        expect(testComponent.nzOptionContainerComponent.listOfTagOption.length).toBe(1);
        expect(testComponent.listOfSelectedValue.length).toBe(3);
      });
    }));
    it('should add tags when enter click', async(() => {
      testComponent.searchValue = 'tagstest';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testComponent.nzOptionContainerComponent.listOfTagOption.length).toBe(1);
        const ul = oc.nativeElement.querySelector('.ant-select-dropdown-menu');
        dispatchKeyboardEvent(ul, 'keydown', 13);
        fixture.detectChanges();
        expect(testComponent.nzOptionContainerComponent.listOfTagOption.length).toBe(2);
        expect(testComponent.listOfSelectedValue.length).toBe(3);
      });
    }));
  });
});

@Component({
  selector: 'nz-test-option-container-single',
  template: `
    <div
      nz-option-container
      [listOfNzOptionComponent]="listOfNzOptionComponent"
      [listOfNzOptionGroupComponent]="listOfNzOptionGroupComponent"
      [nzSearchValue]="searchValue"
      [nzFilterOption]="filterOption"
      [nzServerSearch]="serverSearch"
      [compareWith]="compareFn"
      [nzNotFoundContent]="notFoundContent"
      [nzMode]="mode"
      (nzScrollToBottom)="scrollToBottom()"
      (nzClickOption)="clickOption()"
      (nzListOfTemplateOptionChange)="templateOptionChange($event);listOfTemplateOptionChange($event)"
      (nzListOfSelectedValueChange)="updateListOfSelectedValueFromOptionContainer($event)"
      [(nzListOfSelectedValue)]="listOfSelectedValue">
    </div>
  `
})
export class NzTestOptionContainerSingleComponent {
  @ViewChild(NzOptionContainerComponent) nzOptionContainerComponent: NzOptionContainerComponent;
  listOfNzOptionComponent = this.generateListOfOption([
    {
      value   : { value: 'test1' },
      label   : 'test1',
      disabled: false
    },
    {
      value   : { value: 'test2' },
      label   : 'test2',
      disabled: false
    },
    {
      value   : { value: 'test3' },
      label   : 'test3',
      disabled: true
    }
  ]);
  listOfNzOptionGroupComponent = this.generateListOfGroupOption([
    {
      label       : 'group1',
      listOfOption: this.generateListOfOption([
        {
          value   : { value: 'sub1-1' },
          label   : 'sub1-1',
          disabled: false
        },
        {
          value   : { value: 'sub1-2' },
          label   : 'sub1-2',
          disabled: false
        },
        {
          value   : { value: 'sub1-3' },
          label   : 'sub1-3',
          disabled: true
        }
      ])
    },
    {
      label       : 'group2',
      listOfOption: this.generateListOfOption([
        {
          value   : { value: 'sub2-1' },
          label   : 'sub2-1',
          disabled: false
        },
        {
          value   : { value: 'sub2-2' },
          label   : 'sub2-2',
          disabled: false
        },
        {
          value   : { value: 'sub2-3' },
          label   : 'sub2-3',
          disabled: false
        }
      ])
    }
  ]);
  listOfTemplateOption = [];
  listOfSelectedValue = [ { value: 'test1' } ];
  searchValue = '';
  serverSearch = false;
  mode = 'default';
  notFoundContent = 'not found';
  // tslint:disable-next-line:no-any
  compareFn = (o1: any, o2: any) => o1 && o2 ? o1.value === o2.value : o1 === o2;
  scrollToBottom = jasmine.createSpy('scroll to bottom');
  clickOption = jasmine.createSpy('click option');
  templateOptionChange = jasmine.createSpy('template option');
  updateListOfSelectedValueFromOptionContainer = jasmine.createSpy('selected value change');

  listOfTemplateOptionChange(value: NzOptionComponent[]): void {
    this.listOfTemplateOption = value;
  }

  filterOption = (input: string, option: NzOptionComponent): boolean => {
    if (option && option.nzLabel) {
      return option.nzLabel.toLowerCase().indexOf(input.toLowerCase()) > -1;
    } else {
      return false;
    }
  }

  // tslint:disable-next-line:no-any
  generateOption(value: any, label: string, disabled: boolean): NzOptionComponent {
    const option = new NzOptionComponent();
    option.nzValue = value;
    option.nzLabel = label;
    option.nzDisabled = disabled;
    return option;
  }

  // tslint:disable-next-line:no-any
  generateGroupOption(label: string, listOfOption: QueryList<NzOptionComponent>): NzOptionGroupComponent {
    const groupOption = new NzOptionGroupComponent();
    groupOption.nzLabel = label;
    groupOption.listOfNzOptionComponent = listOfOption;
    return groupOption;
  }

  // tslint:disable-next-line:no-any
  generateListOfOption(value: Array<{ value: any, label: string, disabled: boolean }>): QueryList<NzOptionComponent> {
    const queryList = new QueryList<NzOptionComponent>();
    const arr = [];
    value.forEach(item => arr.push(this.generateOption(item.value, item.label, item.disabled)));
    queryList.reset(arr);
    return queryList;
  }

  generateListOfGroupOption(value: Array<{ label: string, listOfOption: QueryList<NzOptionComponent> }>): QueryList<NzOptionGroupComponent> {
    const queryList = new QueryList<NzOptionGroupComponent>();
    const arr = [];
    value.forEach(item => arr.push(this.generateGroupOption(item.label, item.listOfOption)));
    queryList.reset(arr);
    return queryList;
  }
}

@Component({
  selector: 'nz-test-option-container-tags',
  template: `
    <div
      nz-option-container
      [listOfNzOptionComponent]="listOfNzOptionComponent"
      [listOfNzOptionGroupComponent]="listOfNzOptionGroupComponent"
      [nzSearchValue]="searchValue"
      [nzFilterOption]="filterOption"
      [nzServerSearch]="serverSearch"
      [nzNotFoundContent]="notFoundContent"
      [nzMaxMultipleCount]="maxMultipleCount"
      [nzMode]="mode"
      (nzListOfSelectedValueChange)="updateListOfSelectedValueFromOptionContainer($event)"
      [(nzListOfSelectedValue)]="listOfSelectedValue">
    </div>
  `
})
export class NzTestOptionContainerTagsComponent {
  @ViewChild(NzOptionContainerComponent) nzOptionContainerComponent: NzOptionContainerComponent;
  listOfNzOptionComponent = this.generateListOfOption([
    {
      value   : 'test1',
      label   : 'test1',
      disabled: false
    },
    {
      value   : 'test2',
      label   : 'test2',
      disabled: false
    },
    {
      value   : 'test3',
      label   : 'test3',
      disabled: true
    }
  ]);
  listOfNzOptionGroupComponent = this.generateListOfGroupOption([
    {
      label       : 'group1',
      listOfOption: this.generateListOfOption([
        {
          value   : 'sub1-1',
          label   : 'sub1-1',
          disabled: false
        },
        {
          value   : 'sub1-2',
          label   : 'sub1-2',
          disabled: false
        },
        {
          value   : 'sub1-3',
          label   : 'sub1-3',
          disabled: true
        }
      ])
    },
    {
      label       : 'group2',
      listOfOption: this.generateListOfOption([
        {
          value   : 'sub2-1',
          label   : 'sub2-1',
          disabled: false
        },
        {
          value   : 'sub2-2',
          label   : 'sub2-2',
          disabled: false
        },
        {
          value   : 'sub2-3',
          label   : 'sub2-3',
          disabled: false
        }
      ])
    }
  ]);
  listOfSelectedValue = [ 'test1', 'testtags' ];
  searchValue = '';
  serverSearch = false;
  mode = 'tags';
  maxMultipleCount = Infinity;
  notFoundContent = 'not found';
  scrollToBottom = jasmine.createSpy('scroll to bottom');
  clickOption = jasmine.createSpy('click option');
  templateOptionChange = jasmine.createSpy('template option');
  updateListOfSelectedValueFromOptionContainer = jasmine.createSpy('selected value change');
  filterOption = (input: string, option: NzOptionComponent): boolean => {
    if (option && option.nzLabel) {
      return option.nzLabel.toLowerCase().indexOf(input.toLowerCase()) > -1;
    } else {
      return false;
    }
  }

  // tslint:disable-next-line:no-any
  generateOption(value: any, label: string, disabled: boolean): NzOptionComponent {
    const option = new NzOptionComponent();
    option.nzValue = value;
    option.nzLabel = label;
    option.nzDisabled = disabled;
    return option;
  }

  // tslint:disable-next-line:no-any
  generateGroupOption(label: string, listOfOption: QueryList<NzOptionComponent>): NzOptionGroupComponent {
    const groupOption = new NzOptionGroupComponent();
    groupOption.nzLabel = label;
    groupOption.listOfNzOptionComponent = listOfOption;
    return groupOption;
  }

  // tslint:disable-next-line:no-any
  generateListOfOption(value: Array<{ value: any, label: string, disabled: boolean }>): QueryList<NzOptionComponent> {
    const queryList = new QueryList<NzOptionComponent>();
    const arr = [];
    value.forEach(item => arr.push(this.generateOption(item.value, item.label, item.disabled)));
    queryList.reset(arr);
    return queryList;
  }

  generateListOfGroupOption(value: Array<{ label: string, listOfOption: QueryList<NzOptionComponent> }>): QueryList<NzOptionGroupComponent> {
    const queryList = new QueryList<NzOptionGroupComponent>();
    const arr = [];
    value.forEach(item => arr.push(this.generateGroupOption(item.label, item.listOfOption)));
    queryList.reset(arr);
    return queryList;
  }
}
