import {
  Injectable,
  TemplateRef
} from '@angular/core';

export class BaseOptions {

  /**
   * The modal display status
   */
  public visible = false;

  /**
   * The modal title
   */
  public title: string | TemplateRef<any>;

  /**
   * The modal content
   *
   * string | TemplateRef<any> | component
   *
   * A reference to a <ng-template> tag that if set will override the popovers template. Use like so:
   * <ng-template #customTemplate let-options="options">
   *   <div [class]="'popover ' + options.placement" style="display: block">
   *     My custom template
   *   </div>
   * </ng-template>
   *
   * Then pass customTemplate to the mwlConfirm directive like so `[content]="customTemplate"`
   *
   */
  public content: any;
  public class: string;

  /**
   * The modal width
   */
  public width: string | number;

  /**
   * The modal zIndex
   */
  public zIndex: number;

  /**
   * The modal ok button text
   */
  public okText: string;

  /**
   * The modal cancel button text
   */
  public cancelText: string;

  /**
   * A custom CSS style to be added to the modal
   */
  public style: Object;

  /**
   * The modal ok button handler
   */
  public onOk: Function;

  /**
   * The modal cancel button handler
   */
  public onCancel: Function;

}

@Injectable()
export class ModalOptions extends BaseOptions {

  public closable = true;
  public maskClosable = true;
  public wrapClassName: string;
  public footer: TemplateRef<any> | boolean;
  public componentParams: Object;

}

@Injectable()
export class ConfirmOptions extends BaseOptions {

  public iconType: string;
  public confirmType: string;

}
