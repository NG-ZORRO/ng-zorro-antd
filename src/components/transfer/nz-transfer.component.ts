// tslint:disable:member-ordering
import { Component, ViewEncapsulation, Input, Output, ContentChild, TemplateRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NzLocaleService } from '../locale/index';
import { TransferItem } from './item';

@Component({
  selector: 'nz-transfer',
  template: `
    <nz-transfer-list class="ant-transfer-list" [ngStyle]="nzListStyle" data-direction="left"
        [titleText]="nzTitles[0]"
        [dataSource]="leftDataSource"
        [filter]="leftFilter"
        [filterOption]="nzFilterOption"
        (filterChange)="handleFilterChange($event)"
        [render]="render"
        [showSearch]="nzShowSearch"
        [searchPlaceholder]="nzSearchPlaceholder"
        [notFoundContent]="nzNotFoundContent"
        [itemUnit]="nzItemUnit"
        [itemsUnit]="nzItemsUnit"
        [footer]="footer"
        (handleSelect)="handleLeftSelect($event)"
        (handleSelectAll)="handleLeftSelectAll($event)"></nz-transfer-list>
    <div class="ant-transfer-operation">
        <button nz-button (click)="moveToLeft()" [disabled]="!leftActive" [nzType]="'primary'" [nzSize]="'small'">
            <i class="anticon anticon-left"></i><span *ngIf="nzOperations[1]">{{nzOperations[1]}}</span>
        </button>
        <button nz-button (click)="moveToRight()" [disabled]="!rightActive" [nzType]="'primary'" [nzSize]="'small'">
            <i class="anticon anticon-right"></i><span *ngIf="nzOperations[0]">{{nzOperations[0]}}</span>
        </button>
    </div>
    <nz-transfer-list class="ant-transfer-list" [ngStyle]="nzListStyle" data-direction="right"
        [titleText]="nzTitles[1]"
        [dataSource]="rightDataSource"
        [filter]="rightFilter"
        [filterOption]="nzFilterOption"
        (filterChange)="handleFilterChange($event)"
        [render]="render"
        [showSearch]="nzShowSearch"
        [searchPlaceholder]="nzSearchPlaceholder"
        [notFoundContent]="nzNotFoundContent"
        [itemUnit]="nzItemUnit"
        [itemsUnit]="nzItemsUnit"
        [footer]="footer"
        (handleSelect)="handleRightSelect($event)"
        (handleSelectAll)="handleRightSelectAll($event)"></nz-transfer-list>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './style/index.less',
    './style/patch.less'
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.ant-transfer]': 'true'
  }
})
export class NzTransferComponent implements OnChanges {

  leftFilter = '';
  rightFilter = '';

  // region: fields

  @Input() nzDataSource: TransferItem[] = [];
  @Input() nzTitles: string[] = this._locale.translate('Transfer.titles').split(',');
  @Input() nzOperations: string[] = [];
  @Input() nzListStyle: Object;
  @Input() nzItemUnit = this._locale.translate('Transfer.itemUnit');
  @Input() nzItemsUnit = this._locale.translate('Transfer.itemsUnit');
  @ContentChild('render') render: TemplateRef<any>;
  @ContentChild('footer') footer: TemplateRef<any>;

  // search
  @Input() nzShowSearch = false;
  @Input() nzFilterOption: (inputValue: any, item: any) => boolean;
  @Input() nzSearchPlaceholder = this._locale.translate('Transfer.searchPlaceholder');
  @Input() nzNotFoundContent = this._locale.translate('Transfer.notFoundContent');

  // events
  @Output() nzChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() nzSearchChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() nzSelectChange: EventEmitter<any> = new EventEmitter<any>();

  // endregion

  // region: process data

  // left
  leftDataSource: TransferItem[] = [];

  // right
  rightDataSource: TransferItem[] = [];

  private splitDataSource() {
    this.leftDataSource = [];
    this.rightDataSource = [];
    this.nzDataSource.forEach(record => {
      if (record.direction === 'right') {
        this.rightDataSource.push(record);
      } else {
        this.leftDataSource.push(record);
      }
    });
  }

  private getCheckedData(direction: string): TransferItem[] {
    return this[direction === 'left' ? 'leftDataSource' : 'rightDataSource'].filter(w => w.checked);
  }

  handleLeftSelectAll = (checked: boolean) => this.handleSelect('left', checked);
  handleRightSelectAll = (checked: boolean) => this.handleSelect('right', checked);

  handleLeftSelect = (item: TransferItem) => this.handleSelect('left', item.checked, item);
  handleRightSelect = (item: TransferItem) => this.handleSelect('right', item.checked, item);

  handleSelect(direction: 'left' | 'right', checked: boolean, item?: TransferItem) {
    const list = this.getCheckedData(direction);
    this.updateOperationStatus(direction, list.length);
    this.nzSelectChange.emit({ direction, checked, list, item });
  }

  handleFilterChange(ret: any) {
    this.nzSearchChange.emit(ret);
  }

  // endregion

  // region: operation

  leftActive = false;
  rightActive = false;

  private updateOperationStatus(direction: string, count: number) {
    this[direction === 'right' ? 'leftActive' : 'rightActive'] = count > 0;
  }

  moveToLeft = () => this.moveTo('left');
  moveToRight = () => this.moveTo('right');

  moveTo(direction: string) {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
    const targetDatasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
    const moveList: TransferItem[] = [];
    for (let i = 0; i < datasource.length; i++) {
      const item = datasource[i];
      if (item.checked === true && !item.disabled) {
        item.checked = false;
        moveList.push(item);
        targetDatasource.push(item);
        datasource.splice(i, 1);
        --i;
      }
    }
    this.updateOperationStatus(oppositeDirection, 0);
    this.nzChange.emit({
      from: oppositeDirection,
      to: direction,
      list: moveList
    });
    // this.nzSelectChange.emit({ direction: oppositeDirection, list: [] });
  }

  // endregion

  constructor(private _locale: NzLocaleService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('nzDataSource' in changes || 'nzTargetKeys' in changes) {
      this.splitDataSource();
      this.updateOperationStatus('left', this.leftDataSource.filter(w => w.checked && !w.disabled).length)
      this.updateOperationStatus('right', this.rightDataSource.filter(w => w.checked && !w.disabled).length)
    }
  }
}
