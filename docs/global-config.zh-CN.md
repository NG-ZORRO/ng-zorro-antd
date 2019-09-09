---
order: 7
title: 全局配置项
---

从 8.3.0 版本开始，我们给众多组件添加了**全局配置**功能，你可以通过全局配置来定义组件的默认行为，从而减少在模板中需要写的代码（让你的代码更加清爽），还能实现类似于切换主题的功能。

<blockquote style="border-color: red;"><p><strong>之前各组件单独提供的注入令牌将会在 ng-zorro-antd 9.x 版本中移除，请及时迁移！</strong></p></blockquote>

## 如何使用

想要为某些组件提供默认配置项，请在根注入器中根据注入令牌 `NZ_CONFIG` 提供一个符合 `NzConfig` 接口的对象，例如：

```typescript
import { NgZorroAntdModule, NzConfig, NZ_CONFIG } from 'ng-zorro-antd';

const ngZorroConfig: NzConfig = {
  // 注意没有 nz 前缀
  message: { nzTop: 120 },
  notification: { nzTop: 240 }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule
    NgZorroAntdModule,
  ],
  providers: [
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

这些全局配置项将会被注入 `NzConfigService` 当中并保存。

## 动态变更

你可以通过调用 `NzConfigService` 的 `set` 方法来改变某个组件的全局配置项，例如：

```typescript
import { NzConfigService } from 'ng-zorro-antd';

@Component({
  selector: 'app-change-zorro-config'
})
export class ChangeZorroConfigComponent {
  constructor(private nzConfigService: NzConfigService) {}

  onChangeConfig() {
    // 爷爷：我就喜欢大号字！
    this.nzConfigService.set('button', { nzSize: 'large' })
  }
}
```

所有的组件实例都会响应这些改变（只要它们没有被单独赋值）。

## 全局配置项的优先级

对于任何一个属性来说，各个来源的值的优先级如下：

**为组件的某个实例单独设置的值（通过模板或类似于 `service.create` 的方法）> 通过 `NZ_CONFIG` 提供的全局默认值（包括 `set` 方法） > 通过老的 API 提供的全局默认值 > NG-ZORRO 内置的默认值。**

例如，你想创建一个 NzNotification 组件：

1. 你在调用 `NzNotificationService.success` 时传递参数 `{ nzDuration: 6000 }`
2. 你通过 `NZ_CONFIG` 提供了全局默认值 `{ notification: { nzDuration: 5000 } }`
3. 你通过 `NZ_NOTIFICATION_CONFIG` 提供了全局默认值 `{ nzDuration: 4000 }`
4. NG-ZORRO 内部默认值为 4500

最终该 Notification 将会显示 6000 毫秒。

## 查看所有可用的全局配置项

`NzConfig` 接口提供的类型定义信息能够帮助你找到所有支持全局配置项的组件和属性。另外，每个组件的文档都会指出哪些属性可以通过全局配置项的方式指定。
