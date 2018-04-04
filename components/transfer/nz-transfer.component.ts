import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { toBoolean } from '../core/util/convert';
import { NzI18nService } from '../i18n/nz-i18n.service';

import { TransferCanMove, TransferChange, TransferItem, TransferSearchChange, TransferSelectChange } from './interface';

@Component({
  selector           : 'nz-transfer',
  preserveWhitespaces: false,
  template           : `
    <nz-transfer-list class="ant-transfer-list" [ngStyle]="nzListStyle" data-direction="left"
      [titleText]="nzTitles[0]"
      [dataSource]="leftDataSource"
      [filter]="leftFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [render]="nzRender"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit"
      [itemsUnit]="nzItemsUnit"
      [footer]="nzFooter"
      (handleSelect)="handleLeftSelect($event)"
      (handleSelectAll)="handleLeftSelectAll($event)"></nz-transfer-list>
    <div class="ant-transfer-operation">
      <button nz-button (click)="moveToLeft()" [disabled]="!leftActive" [nzType]="'primary'" [nzSize]="'small'">
        <i class="anticon anticon-left"></i><span *ngIf="nzOperations[1]">{{ nzOperations[1] }}</span>
      </button>
      <button nz-button (click)="moveToRight()" [disabled]="!rightActive" [nzType]="'primary'" [nzSize]="'small'">
        <i class="anticon anticon-right"></i><span *ngIf="nzOperations[0]">{{ nzOperations[0] }}</span>
      </button>
    </div>
    <nz-transfer-list class="ant-transfer-list" [ngStyle]="nzListStyle" data-direction="right"
      [titleText]="nzTitles[1]"
      [dataSource]="rightDataSource"
      [filter]="rightFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [render]="nzRender"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit"
      [itemsUnit]="nzItemsUnit"
      [footer]="nzFooter"
      (handleSelect)="handleRightSelect($event)"
      (handleSelectAll)="handleRightSelectAll($event)"></nz-transfer-list>
  `,
  host               : {
    '[class.ant-transfer]': 'true'
  }
})
export class NzTransferComponent implements OnChanges {
  private _showSearch = false;

  leftFilter = '';
  rightFilter = '';

  // region: fields

  @Input() nzDataSource: TransferItem[] = [];
  @Input() nzTitles: string[] = ['', ''];
  @Input() nzOperations: string[] = [];
  @Input() nzListStyle: object;
  @Input() nzItemUnit = this.i18n.translate('Transfer.itemUnit');
  @Input() nzItemsUnit = this.i18n.translate('Transfer.itemsUnit');
  @Input() nzCanMove: (arg: TransferCanMove) => Observable<TransferItem[]> = (arg: TransferCanMove) => of(arg.list);
  @Input() nzRender: TemplateRef<void>;
  @Input() nzFooter: TemplateRef<void>;

  // search
  @Input()
  set nzShowSearch(value: boolean) {
    this._showSearch = toBoolean(value);
  }

  get nzShowSearch(): boolean {
    return this._showSearch;
  }

  @Input() nzFilterOption: (inputValue: string, item: TransferItem) => boolean;
  @Input() nzSearchPlaceholder = this.i18n.translate('Transfer.searchPlaceholder');
  @Input() nzNotFoundContent = this.i18n.translate('Transfer.notFoundContent');

  // events
  @Output() nzChange: EventEmitter<TransferChange> = new EventEmitter();
  @Output() nzSearchChange: EventEmitter<TransferSearchChange> = new EventEmitter();
  @Output() nzSelectChange: EventEmitter<TransferSelectChange> = new EventEmitter();

  // endregion

  // region: process data

  // left
  leftDataSource: TransferItem[] = [];

  // right
  rightDataSource: TransferItem[] = [];

  private splitDataSource(): void {
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
    return this[ direction === 'left' ? 'leftDataSource' : 'rightDataSource' ].filter(w => w.checked);
  }

  handleLeftSelectAll = (checked: boolean) => this.handleSelect('left', checked);
  handleRightSelectAll = (checked: boolean) => this.handleSelect('right', checked);

  handleLeftSelect = (item: TransferItem) => this.handleSelect('left', item.checked, item);
  handleRightSelect = (item: TransferItem) => this.handleSelect('right', item.checked, item);

  handleSelect(direction: 'left' | 'right', checked: boolean, item?: TransferItem): void {
    const list = this.getCheckedData(direction);
    this.updateOperationStatus(direction, list.length);
    this.nzSelectChange.emit({ direction, checked, list, item });
  }

  handleFilterChange(ret: { direction: string, value: string }): void {
    this.nzSearchChange.emit(ret);
  }

  // endregion

  // region: operation

  leftActive = false;
  rightActive = false;

  private updateOperationStatus(direction: string, count?: number): void {
    this[ direction === 'right' ? 'leftActive' : 'rightActive' ] = (typeof count === 'undefined' ? this.getCheckedData(direction).filter(w => !w.disabled).length : count) > 0;
  }

  moveToLeft = () => this.moveTo('left');
  moveToRight = () => this.moveTo('right');

  moveTo(direction: string): void {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    this.updateOperationStatus(oppositeDirection, 0);
    const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
    const moveList = datasource.filter(item => item.checked === true && !item.disabled);
    this.nzCanMove({ direction, list: moveList })
    .subscribe(
      newMoveList => this.truthMoveTo(direction, newMoveList.filter(i => !!i)),
      () => moveList.forEach(i => i.checked = false)
    );
  }

  private truthMoveTo(direction: string, list: TransferItem[]): void {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
    const targetDatasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
    for (const item of list) {
      item.checked = false;
      targetDatasource.push(item);
      datasource.splice(datasource.indexOf(item), 1);
    }
    this.updateOperationStatus(oppositeDirection);
    this.nzChange.emit({
      from: oppositeDirection,
      to  : direction,
      list
    });
  }

  // endregion

  constructor(private i18n: NzI18nService, private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('nzDataSource' in changes) {
      this.splitDataSource();
      this.updateOperationStatus('left');
      this.updateOperationStatus('right');
    }
  }
}
