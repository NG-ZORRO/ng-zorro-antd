import { Component, OnInit, Input, forwardRef, NgModule, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from '../../../index.showcase';
import { API } from '../services/api';

export interface GoodOpt {
    goodId: string,
    name: string
}

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GoodSelectComponent),
    multi: true
};
// <nz-select
//         class="good-select"
//         [style.width]="_width"
//         nzKeepUnListOptions
//         [nzMode]="'multiple'"
//         [nzPlaceHolder]="'请选择关键字'"
//         (nzSearchChange)="searchChange($event)"
//         [(ngModel)]="selectedMultipleOption"
//         [nzNotFoundContent]="'无法找到'">
//         <nz-option
//         *ngFor="let option of searchOptions"
//         [nzLabel]="option[0]"
//         [nzValue]="option[0]">
//         </nz-option>
//     </nz-select>
@Component({
    selector: `good-select`,
    template: `
    <nz-select 
        [style.width]="_width" 
        [nzPlaceHolder]="placeHolder" 
        [nzMode]="_nzMode" 
        [nzAllowClear]="_allowClear"
        [nzNotFoundContent]="'找不到选项'"
        (nzOpenChange)="yztOpenChange($event)"
        (nzScrollToBottom)="yztScrollToBottom()"
        (nzSearchChange)="yztSearchChange($event)"
        [(ngModel)]="value">
        <nz-option
            *ngFor="let option of options"
            [nzLabel]="option.name"
            [nzValue]="option.goodId"
            [nzDisabled]="option.disabled">
            <ng-template *ngIf="_hasTemplate" [ngTemplateOutlet]="_content" #nzOptionTemplate></ng-template>
        </nz-option>
    </nz-select>
    `,
    styles: [`
    .good-select{
        display: inline-block;
    }
    `],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class GoodSelectComponent implements ControlValueAccessor, OnInit {

    private onTouchedCallback: () => () => {};
    private onChangeCallback: (_: any) => () => {};

    options: Array<GoodOpt> = [];
    // 单选的时候传字符串，多选传数组
    _value: string;
    _width = "100%";
    _content: TemplateRef<any>;
    _allowClear = true;
    _nzMode = "combobox";
    _hasTemplate = false;
    firstNum = 0;

    @Input() placeholder = "请选择品名";
    @Input() rowsNum = 10;

    set value(v: string) {
        this._value = v;
        this.onChangeCallback(v);
    }

    get value(): string {
        return this._value;
    };

    @Input() set width(v: any) {
        this._width = Array.from(v).includes("%") ? `${v}%` : isNaN(parseInt(v)) ? this._width : `${v}px`;
    }

    @Input() set nzMode(v) {
        this._nzMode = v;
        this._allowClear = v === "combobox" ? true : false;
    };

    @Input() set customTemplate(tpl: TemplateRef<any>) {
        if (tpl instanceof TemplateRef) {
            this._content = tpl;
            this._hasTemplate = true;
        }
    }

    @Output() openChange: EventEmitter<any> = new EventEmitter()

    constructor(private api: API) {
    }

    ngOnInit() {
    }

    yztSearchChange(event) {
        console.log(event, "yztSearchChange");
        this.firstNum = 0;
        this.queryData(event);
    }

    yztOpenChange(event) {
        console.log(event, "yztOpenChange")
        this.openChange.emit(event);
    }

    yztScrollToBottom() {
        console.log("yztScrollToBottom")
        this.queryData()
    }

    // 写入值
    writeValue(value: any) {
        if (value !== this._value) {
            this._value = value;
        }
    }

    // 注册变化处理事件
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // 注册触摸事件
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    /**
     * 查询数据
     * @param $event
     */
    queryData(searchText?: string) {
        const goodName = searchText;
        let pageParms = { "first": this.firstNum, "rows": this.rowsNum };
        this.api.call("abnormalOtherHandleController.waybillGoodsQuery", pageParms, {
            name: goodName
        }).ok(json => {
            let result: any = json.result && json.result.content || [];
            this.options = result || [];
            this.firstNum += this.rowsNum;
        }).fail(err => {
            throw new Error(err);
        });
    }


}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
    ],
    declarations: [
        GoodSelectComponent
    ],
    exports: [GoodSelectComponent]
})
export class GoodSelectModule { }
