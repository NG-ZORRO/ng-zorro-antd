import { Component, QueryList, ViewEncapsulation } from '@angular/core';
import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReplaySubject, Subject } from 'rxjs';
import { dispatchFakeEvent } from '../core/testing';
import { NzOptionContainerComponent } from './nz-option-container.component';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';
import { defaultFilterOption } from './nz-option.pipe';
import { NzSelectModule } from './nz-select.module';
import { NzSelectService } from './nz-select.service';

export const createListOfOption = (count, prefix = 'option') => {
  const list = [];
  for (let i = 0; i < count; i++) {
    const option = new NzOptionComponent();
    option.nzValue = `${prefix}_value_${i}`;
    option.nzLabel = `${prefix}_label_${i}`;
    list.push(option);
  }
  return list;
};
export const createListOfGroupOption = (groupCount, optionCount) => {
  const list = [];
  for (let i = 0; i < groupCount; i++) {
    const queryList = new QueryList<NzOptionComponent>();
    queryList.reset(createListOfOption(optionCount, `${i}_inner_option`));
    const option = new NzOptionGroupComponent();
    option.nzLabel = `group_label_${i}`;
    option.listOfNzOptionComponent = queryList;
    list.push(option);
  }
  return list;
};

describe('nz-select option container', () => {
  beforeEach(fakeAsync(() => {
    let nzSelectServiceStub: Partial<NzSelectService>;
    nzSelectServiceStub = {
      searchValue                 : '',
      filterOption                : defaultFilterOption,
      serverSearch                : false,
      listOfNzOptionComponent     : createListOfOption(20),
      check$                      : new Subject(),
      activatedOption$            : new ReplaySubject(1),
      listOfNzOptionGroupComponent: createListOfGroupOption(10, 10),
      listOfSelectedValue$        : new Subject(),
      compareWith                 : (o1, o2) => o1 === o2
    };
    TestBed.configureTestingModule({
      imports     : [ NzSelectModule, NoopAnimationsModule ],
      providers   : [ { provide: NzSelectService, useValue: nzSelectServiceStub } ],
      declarations: [ NzOptionContainerSpecComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture;
    let testComponent;
    let oc;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzOptionContainerSpecComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      oc = fixture.debugElement.query(By.directive(NzOptionContainerComponent));
    });
    it('should scrollToBottom emit', () => {
      fixture.detectChanges();
      expect(testComponent.scrollToBottom).toHaveBeenCalledTimes(0);
      const ul = oc.injector.get(NzOptionContainerComponent).dropdownUl.nativeElement;
      ul.scrollTop = ul.scrollHeight - ul.clientHeight;
      dispatchFakeEvent(ul, 'scroll');
      fixture.detectChanges();
      expect(testComponent.scrollToBottom).toHaveBeenCalledTimes(1);
    });
    it('should scrollIntoViewIfNeeded', fakeAsync(() => {
      fixture.detectChanges();
      const nzSelectService = fixture.debugElement.injector.get(NzSelectService);
      nzSelectService.activatedOption$.next(nzSelectService.listOfNzOptionComponent[ nzSelectService.listOfNzOptionComponent.length - 1 ]);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const ul = oc.injector.get(NzOptionContainerComponent).dropdownUl.nativeElement;
      expect(ul.scrollTop).toBeGreaterThan(0);
    }));
    it('should destroy piped', () => {
      fixture.detectChanges();
      const checkSpy = spyOn(oc.injector.get(NzOptionContainerComponent).cdr, 'markForCheck');
      fixture.detectChanges();
      expect(checkSpy).toHaveBeenCalledTimes(0);
      const nzSelectService = fixture.debugElement.injector.get(NzSelectService);
      nzSelectService.check$.next();
      fixture.detectChanges();
      expect(checkSpy).toHaveBeenCalledTimes(1);
      testComponent.destroy = true;
      fixture.detectChanges();
      nzSelectService.check$.next();
      fixture.detectChanges();
      expect(checkSpy).toHaveBeenCalledTimes(1);
    });
  });
});

@Component({
  template     : `
    <div nz-option-container
      *ngIf="!destroy"
      [nzMenuItemSelectedIcon]="iconTemplate"
      [nzNotFoundContent]="notFoundContent"
      (nzScrollToBottom)="scrollToBottom($event)">
    </div>
    <ng-template #iconTemplate>icon</ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [
    '../style/index.less',
    './style/index.less'
  ]
})
export class NzOptionContainerSpecComponent {
  destroy = false;
  scrollToBottom = jasmine.createSpy('scrollToBottom callback');
  notFoundContent = 'not found';
}
