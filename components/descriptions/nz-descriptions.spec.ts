import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzDescriptionsComponent } from './nz-descriptions.component';
import { NzDescriptionsModule } from './nz-descriptions.module';

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

      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(1);

      testComponent.colspanArray = [1, 1, 1, 2, 3, 1, 5];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(3);
      expect(spyOnWarn).toHaveBeenCalledTimes(2);
      expect(spyOnWarn).toHaveBeenCalledWith('"nzColumn" is 3 but we have row length 5');
      expect(spyOnWarn).toHaveBeenCalledWith('"nzColumn" is 3 but we have row length 6');

      testComponent.column = 5;
      testComponent.colspanArray = [1, 2, 3];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(1);
      expect(spyOnWarn).toHaveBeenCalledTimes(4);
      expect(spyOnWarn).toHaveBeenCalledWith('"nzColumn" is 5 but we have row length 6');

      testComponent.colspanArray = [1, 2, 2];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-descriptions-row');
      expect(rows.length).toBe(1);
    });
  });
});

@Component({
  selector: 'nz-test-descriptions',
  template: `
    <nz-descriptions [nzTitle]="title" [nzBordered]="bordered" [nzColumn]="column">
      <nz-descriptions-item *ngFor="let col of colspanArray; let i = index" [nzTitle]="'Title' + i" [nzSpan]="col">
      </nz-descriptions-item>
    </nz-descriptions>
  `
})
export class NzTestDescriptionsComponent {
  @ViewChild(NzDescriptionsComponent)
  descriptionComponent: NzDescriptionsComponent;
  bordered = false;
  colspanArray: number[] = [1, 1, 1];
  column: number | { [key: string]: number } = 3;
  title = 'Title';
}
