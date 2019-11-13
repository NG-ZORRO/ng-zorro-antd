---
order: 7
title: Global Configuration
---

From version 8.3.0, we add support of **global configuration** to many components. You can define the default behavior of the component through global configuration, thus reducing the code that needs to be written in the template, and support changing global config at runtime.

<blockquote style="border-color: red;"><p><strong>The injection tokens provided by components previously will be removed in the 9.x versions. Please migrate to the new API <code>NZ_CONFIG</code>.</strong></p></blockquote>

## How to Use?

If you want to provide default configurations to some components, you should provide an object that implements the interface `NzConfig` with the injection token `NZ_CONFIG`, in the root module (in another word, to the root injector). Like this:

```typescript
import { NgZorroAntdModule, NzConfig, NZ_CONFIG } from 'ng-zorro-antd';

const ngZorroConfig: NzConfig = {
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

These global configuration would be injected into a service named `NzConfigService` and gets stored.

### Provide Template Instances

Being global configuration's entries may accept `TemplateRef<T>` instances, we need a way to create them at application start-up, or, we have to submit them via `NzConfigService`.

The simpler approach is via `NzConfigService` in the root Component.

```typescript
export class AppComponent implements OnInit {
  @ViewChild('nzIndicatorTpl', { static: true })
  nzIndicator!: TemplateRef<void>;

  constructor(private readonly nzConfigService: NzConfigService) {}

  ngOnInit(): void {
    this.nzConfigService.set('spin', { nzIndicator: this.nzIndicator });
  }
}
```

However this causes the configuration to be spread around.

To solve that, at `NgModule` level we can use a `FactoryProvider` instead of a `ValueProvider` (shown above).

```typescript
// The module-level Component which contains template references.
// Exporting is required for AOT compatibility
@Component({
  template: `
    <ng-template #nzIndicatorTpl>
      <span class="ant-spin-dot">
        <i nz-icon [nzType]="'loading'"></i>
      </span>
    </ng-template>
  `
})
export class GlobalTemplatesComponent {
  @ViewChild('nzIndicatorTpl', { static: true })
  nzIndicator!: TemplateRef<void>;
}

// The Factory function
const nzConfigFactory = (
  injector: Injector,
  resolver: ComponentFactoryResolver
): NzConfig => {
  const factory = resolver.resolveComponentFactory(GlobalTemplatesComponent);
  const { nzIndicator } = factory.create(injector).instance;
  return {
    spin: {
      nzIndicator
    }
  };
};

@NgModule({
  imports: [],
  declarations: [
    AppComponent,
    GlobalTemplatesComponent
  ],
  providers: [
    { // The FactoryProvider
      provide: NZ_CONFIG,
      useFactory: nzConfigFactory,
      deps: [Injector, ComponentFactoryResolver]
    }
  ],
  entryComponents: [
    // Must be present here to be resolved by ComponentFactoryResolver.
    // Using Ivy it is not required
    GlobalTemplatesComponent
  ]
})
export class AppModule {}
```

## Dynamically Change Configurations

You can change the global config of a specific component by calling the `set` method of `NzConfigService`. For example, if you want to make all buttons to be barge in size by default, you should:

```typescript
import { NzConfigService } from 'ng-zorro-antd';

@Component({
  selector: 'app-change-zorro-config'
})
export class ChangeZorroConfigComponent {
  constructor(private nzConfigService: NzConfigService) {}

  onChangeConfig() {
    // Grandpa: Oh, I like that!
    this.nzConfigService.set('button', { nzSize: 'large' })
  }
}
```

## Priority of Global Configurations

For any property that supports global configuration, the sequence of priority is as follow:

**Parameters passed to an component instance (in templates or methods like `service.create` > global config provided with the injection token `NZ_CONFIG` > global config provided with legacy injection tokens > default value in ng-zorro-antd**

For example, if you want to create a `NzNotification` component:

1. When you call `NzNotificationService.success`, you passed `{ nzDuration: 6000 }` as the third parameter
2. You provide `{ notification: { nzDuration: 5000 } }` with `NZ_CONFIG`
3. You provide  `{ nzDuration: 4000 }` with `NZ_NOTIFICATION_CONFIG`
4. ng-zorro-antd has a default value of 4500

Eventually, this notification would keep open for 6000 milliseconds.

## Check all Available Globally Configurable Parameters

The interface `NzConfig` can provide completion suggestions of all components and parameters that are globally configurable. You can also check components' API for more details.
