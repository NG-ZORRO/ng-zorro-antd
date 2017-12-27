Semanticized vector graphics.

## Icon naming conventions

We give every icon a semantic naming convention as follows:

- Solid and line icons keep the same names, separated by `-o`, such as` question-circle` and `question-circle-o`;
- Name the order: `[Icon Name] - [Shape?] - [Tracing?] - [Orientation?]`.

> `?` Is optional.


## how to use

The use of `i` tag declaration component, specify the icon corresponding class attribute, the sample code is as follows:

```html
<i class = "anticon anticon - $ {type}"> </i>
```

## local deployment

The icon is hosted by default at [iconfont.cn] (http://iconfont.cn), the default public network is accessible. For local deployment, download the <a href="./assets/download/fonts.zip"> iconfont </a> file, extract it and place it in the folder 'assets / fonts` or another publicly accessible folder

> The `NgZorroAntdModule.forRoot ()` method accepts an optional configuration object for importing external font files of type {extraFontName: string, extraFontUrl: string} `.

E.g
```typescript
@NgModule ({
  ...
  imports: [
    ...
    NgZorroAntdModule.forRoot ({extraFontName: 'anticon', extraFontUrl: './assets/fonts/iconfont'})
    ...
  ]
  ...
})
```
## icon list

>Click the icon to copy the code.


