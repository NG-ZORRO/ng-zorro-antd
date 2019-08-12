import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzDescriptionsModule } from './nz-descriptions.module';

// tslint:disable-next-line no-any
declare const viewport: any;

@Component({
  template: `
    <nz-descriptions [nzTitle]="title" [nzBordered]="bordered" [nzColumn]="column">
      <nz-descriptions-item *ngFor="let col of colspanArray; let i = index" [nzTitle]="itemTitle + i" [nzSpan]="col">
      </nz-descriptions-item>
    </nz-descriptions>
  `
})
export class NzTestDescriptionsComponent {
  bordered = false;
  colspanArray: number[] = [1, 1, 1];
  column: number | { [key: string]: number } = 3;
  title = 'Title';
  itemTitle = 'Item Title ';
}

describe('nz descriptions', () => {
  let testComponent: NzTestDescriptionsComponent;
  let componentElement: HTMLElement;
  let fixture: ComponentFixture<NzTestDescriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, NzDescriptionsModule],
      declarations: [NzTestDescriptionsComponent]
    }).compileComponents();
  });

  describe('with different spans', () => {
    let rows;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDescriptionsComponent);
      testComponent = fixture.componentInstance;
      componentElement = fixture.debugElement.nativeElement;

      fixture.detectChanges();
    });

    it('should have correct layout', () => {
      let title = componentElement.querySelector('.ant-descriptions-title');
      const view = componentElement.querySelector('.ant-descriptions-view');

      expect(title).toBeTruthy();
      expect(view).toBeTruthy();

      testComponent.title = '';
      fixture.detectChanges();
      title = componentElement.querySelector('.ant-descriptions-title');
      expect(title).toBeFalsy();
    });

    it('should render spans correctly', () => {
      const spyOnWarn = spyOn(console, 'warn');
      spyOnWarn.calls.reset();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(1);

      testComponent.colspanArray = [1, 1, 1, 2, 3, 1, 5];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(3);
      expect(spyOnWarn).toHaveBeenCalledTimes(2);
      expect(spyOnWarn).toHaveBeenCalledWith('[NG-ZORRO]:', '"nzColumn" is 3 but we have row length 5');
      expect(spyOnWarn).toHaveBeenCalledWith('[NG-ZORRO]:', '"nzColumn" is 3 but we have row length 6');

      testComponent.column = 5;
      testComponent.colspanArray = [1, 2, 3];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(1);
      expect(spyOnWarn).toHaveBeenCalledTimes(4);
      expect(spyOnWarn).toHaveBeenCalledWith('[NG-ZORRO]:', '"nzColumn" is 5 but we have row length 6');

      testComponent.colspanArray = [1, 2, 2];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(1);

      // Should the last fill the rest space.
      testComponent.colspanArray = [1, 1];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      const tds = componentElement.querySelectorAll('.ant-descriptions-item');
      expect(rows.length).toBe(1);
      expect((tds[1] as HTMLTableDataCellElement).colSpan).toBe(4);
      spyOnWarn.calls.reset();
    });

    it('should responsive work', fakeAsync(() => {
      testComponent.column = {
        xxl: 3,
        xl: 3,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1
      };
      testComponent.colspanArray = [1, 1, 1, 2, 3, 1, 5];

      viewport.set(1024, 1024);
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(3);

      viewport.set(320, 320);
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();

      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(7);

      viewport.reset();
    }));

    // fix #3795
    it('should change to use content work', fakeAsync(() => {
      let firstTitle = componentElement.querySelector('.ant-descriptions-item-label') as HTMLSpanElement;
      expect(firstTitle.innerText).toBe('Item Title 0');

      testComponent.itemTitle = 'Item ';
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      firstTitle = componentElement.querySelector('.ant-descriptions-item-label') as HTMLSpanElement;
      expect(firstTitle.innerText).toBe('Item 0');
    }));
  });
});
