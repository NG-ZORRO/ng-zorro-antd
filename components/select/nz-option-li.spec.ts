import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReplaySubject, Subject } from 'rxjs';
import { dispatchFakeEvent } from '../core/testing';
import { NzOptionLiComponent } from './nz-option-li.component';
import { NzOptionComponent } from './nz-option.component';
import { NzSelectService } from './nz-select.service';

describe('select option li', () => {
  beforeEach(fakeAsync(() => {
    let nzSelectServiceStub: Partial<NzSelectService>;
    nzSelectServiceStub = {
      activatedOption$    : new ReplaySubject(1),
      listOfSelectedValue$: new Subject(),
      compareWith         : (o1, o2) => o1 === o2,
      clickOption         : () => {
      }
    };
    TestBed.configureTestingModule({
      providers   : [ { provide: NzSelectService, useValue: nzSelectServiceStub } ],
      declarations: [ NzTestSelectOptionLiComponent, NzOptionLiComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture;
    let testComponent;
    let li;
    let liComponent;
    let nzSelectService;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSelectOptionLiComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      li = fixture.debugElement.query(By.directive(NzOptionLiComponent));
      liComponent = li.injector.get(NzOptionLiComponent);
      nzSelectService = fixture.debugElement.injector.get(NzSelectService);
    });
    it('should selected work', () => {
      fixture.detectChanges();
      expect(liComponent.selected).toBe(false);
      nzSelectService.listOfSelectedValue$.next([ '01_value' ]);
      fixture.detectChanges();
      expect(liComponent.selected).toBe(true);
      nzSelectService.listOfSelectedValue$.next([ '01_label' ]);
      fixture.detectChanges();
      expect(liComponent.selected).toBe(false);
    });
    it('should active work', () => {
      fixture.detectChanges();
      expect(liComponent.active).toBe(false);
      const option01 = new NzOptionComponent();
      option01.nzLabel = '01_label';
      option01.nzValue = '01_value';
      nzSelectService.activatedOption$.next(option01);
      fixture.detectChanges();
      expect(liComponent.active).toBe(true);
      nzSelectService.activatedOption$.next(null);
      fixture.detectChanges();
      expect(liComponent.active).toBe(false);
    });
    it('should destroy piped', () => {
      fixture.detectChanges();
      const checkSpy = spyOn(liComponent.cdr, 'markForCheck');
      expect(checkSpy).toHaveBeenCalledTimes(0);
      nzSelectService.listOfSelectedValue$.next([ '01_value' ]);
      fixture.detectChanges();
      expect(checkSpy).toHaveBeenCalledTimes(1);
      testComponent.destroy = true;
      fixture.detectChanges();
      nzSelectService.listOfSelectedValue$.next([ '01_value' ]);
      fixture.detectChanges();
      expect(checkSpy).toHaveBeenCalledTimes(1);
    });
    it('should host click trigger', () => {
      fixture.detectChanges();
      const clickSpy = spyOn(nzSelectService, 'clickOption');
      fixture.detectChanges();
      expect(clickSpy).toHaveBeenCalledTimes(0);
      dispatchFakeEvent(li.nativeElement, 'click');
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });
  });
});

@Component({
  template: `
    <li nz-option-li *ngIf="!destroy" [nzOption]="option" [nzMenuItemSelectedIcon]="icon"></li>
    <ng-template #icon>icon</ng-template>
  `
})
export class NzTestSelectOptionLiComponent {
  option = new NzOptionComponent();
  destroy = false;

  constructor() {
    this.option.nzLabel = '01_label';
    this.option.nzValue = '01_value';
  }
}
