import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nz-demo-table-virtual',
  template: `
    <button nz-button (click)="scrollToIndex(200)">Scroll To Index 200</button>
    <br />
    <br />
    <nz-table
      nzVirtualScroll
      [nzVirtualItemSize]="54"
      [nzData]="listOfData"
      [nzFrontPagination]="false"
      [nzShowPagination]="false"
      [nzScroll]="{ x: '1300px', y: '240px' }"
    >
      <thead>
        <tr>
          <th nzWidth="200px" nzLeft="0px">Full Name</th>
          <th nzWidth="100px" nzLeft="200px">Age</th>
          <th nzWidth="100px">Index</th>
          <th nzWidth="100px">Column 1</th>
          <th nzWidth="100px">Column 2</th>
          <th nzWidth="100px">Column 3</th>
          <th nzWidth="100px">Column 4</th>
          <th nzWidth="100px">Column 5</th>
          <th nzWidth="100px">Column 6</th>
          <th nzWidth="100px">Column 7</th>
          <th nzWidth="100px">Column 8</th>
          <th nzWidth="100px" nzRight="0px">Action</th>
        </tr>
      </thead>
      <tbody>
        <ng-template nz-virtual-scroll let-data let-index="index">
          <tr>
            <td nzLeft="0px">{{ data.name }} {{ index }}</td>
            <td nzLeft="200px">{{ data.age }}</td>
            <td>{{ data.index }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td nzRight="0px">
              <a>action</a>
            </td>
          </tr>
        </ng-template>
      </tbody>
    </nz-table>
  `
})
export class NzDemoTableVirtualComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NzTableComponent) nzTableComponent: NzTableComponent;
  private destroy$ = new Subject();
  listOfData: any[] = [];

  scrollToIndex(index: number): void {
    this.nzTableComponent.cdkVirtualScrollViewport.scrollToIndex(index);
  }

  ngOnInit(): void {
    for (let i = 0; i < 20000; i++) {
      this.listOfData.push({
        index: i,
        name: `Edward King`,
        age: 32,
        address: `London`
      });
    }
  }

  ngAfterViewInit(): void {
    this.nzTableComponent.cdkVirtualScrollViewport.scrolledIndexChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log('scroll index to', data);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
