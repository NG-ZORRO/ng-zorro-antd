import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzDescriptionListComponent } from './nz-description-list.component';
import { NzDescriptionListModule } from './nz-description-list.module';

describe('nz description list', () => {
  let testComponent: NzTestDescriptionListComponent;
  let componentElement: HTMLElement;
  let fixture: ComponentFixture<NzTestDescriptionListComponent>;
  let descriptionComponent: NzDescriptionListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports     : [ CommonModule, NzDescriptionListModule ],
      declarations: [ NzTestDescriptionListComponent ]
    }).compileComponents();
  });

  describe('with different spans', () => {
    let rows;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDescriptionListComponent);
      testComponent = fixture.componentInstance;
      descriptionComponent = testComponent.descriptionComponent;
      componentElement = fixture.debugElement.nativeElement;

      fixture.detectChanges();
    });

    it('should have correct layout', () => {
      let title = componentElement.querySelector('.ant-description-list-title');
      const view = componentElement.querySelector('.ant-description-list-view');

      expect(title).toBeTruthy();
      expect(view).toBeTruthy();

      testComponent.title = '';
      fixture.detectChanges();
      title = componentElement.querySelector('.ant-description-list-title');
      expect(title).toBeFalsy();
    });

    it('should render spans correctly', () => {
      const spyOnWarn = spyOn(console, 'warn');

      rows = componentElement.querySelectorAll('.ant-description-list-item');
      expect(rows.length).toBe(1);

      testComponent.colspanArray = [ 1, 1, 1, 2, 3, 1, 5 ];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-description-list-item');
      expect(rows.length).toBe(3);
      expect(spyOnWarn).toHaveBeenCalledTimes(2);
      expect(spyOnWarn).toHaveBeenCalledWith('"nzColumn" is 3 but we have row length 5');
      expect(spyOnWarn).toHaveBeenCalledWith('"nzColumn" is 3 but we have row length 6');

      testComponent.column = 5;
      testComponent.colspanArray = [ 1, 2, 3 ];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-description-list-item');
      expect(rows.length).toBe(1);
      expect(spyOnWarn).toHaveBeenCalledTimes(3);
      expect(spyOnWarn).toHaveBeenCalledWith('"nzColumn" is 5 but we have row length 6');

      testComponent.colspanArray = [ 1, 2, 2 ];
      fixture.detectChanges();
      rows = componentElement.querySelectorAll('.ant-description-list-item');
      expect(rows.length).toBe(1);
    });
  });
});

@Component({
  selector: 'nz-test-description-list',
  template: `
    <nz-description-list [nzTitle]="title" [nzBorder]="border" [nzColumn]="column">
      <nz-description-list-item *ngFor="let col of colspanArray; let i = index"
                                [nzTitle]="'Title' + i"
                                [nzSpan]="col">
      </nz-description-list-item>
    </nz-description-list>
  `
})
export class NzTestDescriptionListComponent {
  @ViewChild(NzDescriptionListComponent) descriptionComponent: NzDescriptionListComponent;
  border = false;
  colspanArray: number[] = [ 1, 1, 1 ];
  column = 3;
  title = 'Title';
}
