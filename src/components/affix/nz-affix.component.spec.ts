/* tslint:disable:no-unused-variable prefer-const */
import { Component, DebugElement } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzScrollService } from '../core/scroll/nz-scroll.service';
import { NzAffixComponent } from './nz-affix.component';
import { NzAffixModule } from './nz-affix.module';

describe('Component:nz-affix', () => {
  let scrollSrv: MockNzScrollService;
  let fixture: ComponentFixture<TestAffixComponent>;
  let context: TestAffixComponent;
  let el: HTMLDivElement;
  let comp: NzAffixComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzAffixModule],
      declarations: [TestAffixComponent],
      providers: [
        { provide: NzScrollService, useClass: MockNzScrollService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestAffixComponent);
    context = fixture.componentInstance;
    spyOn(context, 'onChange');
    fixture.detectChanges();
    el = fixture.nativeElement;
    comp = fixture.debugElement.query(By.css('nz-affix')).componentInstance as NzAffixComponent;
    tick();
  }));

  // it('should correctly initialize and attach to DOM', () => {
  //   expect(el.querySelectorAll('.ant-affix').length).toBe(1);
  // });

});

@Component({
  template: `
    <nz-affix [nzOffsetTop]="10" (nzChange)="onChange($event)">
      <button>Affix Button</button>
    </nz-affix>
  `
})
class TestAffixComponent {
  onChange(status: boolean): boolean {
    return status;
  }
}

class MockNzScrollService {

  getOffset(el: Element): { top: number, left: number } {
    return { top: 0, left: 0 };
  }

  getScroll(el?: Element | Window, top: boolean = true): number {
    return 0;
  }

}
