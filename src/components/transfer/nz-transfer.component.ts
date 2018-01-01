// tslint:disable:member-ordering
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { NzLocaleService } from '../locale/index';
import { toBoolean } from '../util/convert';
import { TransferItem } from './item';

export interface TransferCanMove {
  direction: string;
  list: TransferItem[];
}

export interface TransferChange {
  from: string;
  to: string;
  list: TransferItem[];
}

export interface TransferSearchChange {
  direction: string;
  value: string;
}

export interface TransferSelectChange {
  direction: string;
  checked: boolean;
  list: TransferItem[];
  item: TransferItem;
}

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
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzTransferComponent implements OnChanges {
  private _showSearch = false;

  leftFilter = '';
  rightFilter = '';

  // region: fields

  @Input() nzDataSource: TransferItem[] = [];
  @Input() nzTitles: string[] = this._locale.translate('Transfer.titles').split(',');
  @Input() nzOperations: string[] = [];
  @Input() nzListStyle: object;
  @Input() nzItemUnit = this._locale.translate('Transfer.itemUnit');
  @Input() nzItemsUnit = this._locale.translate('Transfer.itemsUnit');
  @Input() canMove: (arg: TransferCanMove) => Observable<TransferItem[]> = (arg: TransferCanMove) => of(arg.list);
  @ContentChild('render') render: TemplateRef<void>;
  @ContentChild('footer') footer: TemplateRef<void>;

  // search
  @Input()
  set nzShowSearch(value: boolean) {
    this._showSearch = toBoolean(value);
  }

  get nzShowSearch(): boolean {
    return this._showSearch;
  }

  @Input() nzFilterOption: (inputValue: string, item: TransferItem) => boolean;
  @Input() nzSearchPlaceholder = this._locale.translate('Transfer.searchPlaceholder');
  @Input() nzNotFoundContent = this._locale.translate('Transfer.notFoundContent');

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
    return this[direction === 'left' ? 'leftDataSource' : 'rightDataSource'].filter(w => w.checked);
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
    this.cd.detectChanges();
  }

  // endregion

  // region: operation

  leftActive = false;
  rightActive = false;

  private updateOperationStatus(direction: string, count?: number): void {
    this[direction === 'right' ? 'leftActive' : 'rightActive'] = (typeof count === 'undefined' ? this.getCheckedData(direction).filter(w => !w.disabled).length : count) > 0;
    this.cd.detectChanges();
  }

  moveToLeft = () => this.moveTo('left');
  moveToRight = () => this.moveTo('right');

  moveTo(direction: string): void {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    this.updateOperationStatus(oppositeDirection, 0);
    const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
    const moveList = datasource.filter(item => item.checked === true && !item.disabled);
    this.canMove({ direction, list: moveList })
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
      const idx = datasource.indexOf(item);
      if (idx === -1) continue;
      item.checked = false;
      targetDatasource.push(item);
      datasource.splice(idx, 1);
    }
    this.updateOperationStatus(oppositeDirection);
    this.nzChange.emit({
      from: oppositeDirection,
      to: direction,
      list
    });
    // this.nzSelectChange.emit({ direction: oppositeDirection, list: [] });
  }

  // endregion

  constructor(private _locale: NzLocaleService, private el: ElementRef, private cd: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('nzDataSource' in changes || 'nzTargetKeys' in changes) {
      this.splitDataSource();
      this.updateOperationStatus('left');
      this.updateOperationStatus('right');
    }
    this.cd.detectChanges();
  }
}
