import {
  Injectable,
  ComponentRef,
  ComponentFactory,
  ApplicationRef,
  TemplateRef,
  Type,
  ComponentFactoryResolver,
  ModuleWithComponentFactories
} from '@angular/core';
import { NzModalComponent } from './nz-modal.component';
import { NzConfirmComponent } from './nz-confirm.component';
import { ModalOptions, ConfirmOptions } from './nz-modal-options.provider';
import { NzModalSubject } from './nz-modal-subject.service';
import { NzLocaleService } from '../locale/index';

export interface ConfigInterface {
  type?: string;
  title?: any;
  content?: any;
  width?: string | number;
  zIndex?: number;
  iconType?: string;
  okText?: string;
  nzClass?: string;
  cancelText?: string;
  style?: any;
  class?: string;
  closable?: boolean;
  maskClosable?: boolean;
  wrapClassName?: string;
  footer?: TemplateRef<any> | boolean;
  showConfirmLoading?: boolean;
  onOk?: Function;
  onCancel?: Function;
  componentParams?: Object;
  moduleWithComponentFactories?: ModuleWithComponentFactories<any>;
}

@Injectable()
export class NzModalService {

  _modalCompFactory: ComponentFactory<NzModalComponent>;
  _confirmCompFactory: ComponentFactory<NzConfirmComponent>;

  constructor(private _appRef: ApplicationRef,
              private _cfr: ComponentFactoryResolver,
              private _locale: NzLocaleService) {
    this._modalCompFactory = this._cfr.resolveComponentFactory(NzModalComponent);
    this._confirmCompFactory = this._cfr.resolveComponentFactory(NzConfirmComponent);
  }

  _initConfig(config: Object, options: Object = {}): Object {
    const props = {};
    const optionalParams: string[] = [
      'componentParams', // 将componentParams放在第一位是因为必须在content赋值前进行赋值
      'visible',
      'title',
      'content',
      'footer',
      'width',
      'zIndex',
      'okText',
      'cancelText',
      'style',
      'class',
      'onOk',
      'onCancel',
      'closable',
      'maskClosable',
      'wrapClassName',
      'iconType',
      'confirmType',
      'moduleWithComponentFactories'
    ];

    config = Object.assign(options, config);
    optionalParams.forEach(key => {
      if (config[ key ] !== undefined) {
        const modalKey = 'nz' + key.replace(/^\w{1}/, (a) => {
          return a.toLocaleUpperCase();
        });
        props[ modalKey ] = config[ key ];
      }
    });

    const isShowConfirmLoading = !!config[ 'showConfirmLoading' ];
    props[ 'onOk' ] = this._getConfirmCb(props[ 'nzOnOk' ], isShowConfirmLoading);
    props[ 'onCancel' ] = this._getConfirmCb(props[ 'nzOnCancel' ]);
    // 在service模式下，不需要nzOnOk，防止触发this.nzOnOk.emit(e);
    delete props[ 'nzOnOk' ];
    delete props[ 'nzOnCancel' ];
    return props;
  }

  _getConfirmCb(fn?: Function, isShowConfirmLoading: boolean = false): Function {
    return (_close, _instance) => {
      if (isShowConfirmLoading) {
        _instance.nzConfirmLoading = true;
      }
      if (fn) {
        const ret = fn();
        if (!ret) {
          _close();
        } else if (ret.then) {
          ret.then(_close);
        }
      } else {
        _close();
      }
    };
  }

  _open(props: ConfigInterface, factory: ComponentFactory<any>): NzModalSubject {
    // 在body的内部最前插入一个<nz-modal></nz-modal>方便进行ApplicationRef.bootstrap
    document.body.insertBefore(document.createElement(factory.selector), document.body.firstChild);
    // document.body.appendChild(document.createElement(factory.selector));
    let customComponentFactory: ComponentFactory<any>;
    let compRef: ComponentRef<any>;
    let instance: any;
    let subject: any;

    if (props[ 'nzContent' ] instanceof Type) {
      customComponentFactory = this._cfr.resolveComponentFactory(props[ 'nzContent' ]);
      // 将编译出来的ngmodule中的用户component的factory作为modal内容存入
      props[ 'nzContent' ] = customComponentFactory;
    }

    compRef = this._appRef.bootstrap(factory);
    instance = compRef.instance;
    subject = instance.subject;

    [ 'onOk', 'onCancel' ].forEach((eventType: string) => {
      subject.on(eventType, () => {
        const eventHandler = props[ eventType ];
        if (eventHandler) {
          eventHandler(() => {
            instance.nzVisible = false;
            setTimeout(() => {
              compRef.destroy();
            }, 200);
          }, instance);
        }
      });
    });

    Object.assign(instance, props, {
      nzVisible: true
    });

    return subject;
  }

  // protected createComponentModule (componentType: any) {
  //   @NgModule({
  //     declarations: [ componentType ]
  //   })
  //   class CustomComponentModule {}
  //   return CustomComponentModule;
  // }

  /**
   * Open modal dialog
   */
  open(config: ConfigInterface): NzModalSubject {
    const options: ModalOptions = new ModalOptions();
    const props = this._initConfig(config, options);
    return this._open(props, this._modalCompFactory);
  }

  /**
   * Open confirm dialog
   */
  _openConfirm(config: ConfigInterface): NzModalSubject {
    const options: ConfirmOptions = new ConfirmOptions();
    const props = this._initConfig(config, options);
    return this._open(props, this._confirmCompFactory);
  }

  /**
   * Open info dialog
   */
  info(props: ConfigInterface): NzModalSubject {
    const config = Object.assign({}, {
      confirmType: 'info',
      iconType   : 'info-circle'
    }, props);
    return this._openConfirm(config);
  }

  /**
   * Open success dialog
   */
  success(props: ConfigInterface): NzModalSubject {
    const config = Object.assign({
      confirmType: 'success',
      iconType   : 'check-circle'
    }, props);
    return this._openConfirm(config);
  }

  /**
   * Open error dialog
   */
  error(props: ConfigInterface): NzModalSubject {
    const config = Object.assign({
      confirmType: 'error',
      iconType   : 'cross-circle'
    }, props);
    return this._openConfirm(config);
  }

  /**
   * Open warning dialog
   */
  warning(props: ConfigInterface): NzModalSubject {
    const config = Object.assign({
      confirmType: 'warning',
      iconType   : 'exclamation-circle'
    }, props);
    return this._openConfirm(config);
  }

  /**
   * Open confirm dialog
   */
  confirm(props: ConfigInterface): NzModalSubject {
    const config = Object.assign({
      confirmType: 'confirm',
      okText     : this._locale.translate('Modal.okText'),
      cancelText : this._locale.translate('Modal.cancelText')
    }, props);
    return this._openConfirm(config);
  }
}
