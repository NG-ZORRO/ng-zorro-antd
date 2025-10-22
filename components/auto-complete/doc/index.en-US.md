---
category: Components
type: Data Entry
title: AutoComplete
cover: 'https://gw.alipayobjects.com/zos/alicdn/qtJm4yt45/AutoComplete.svg'
description: AutoComplete function of input field.
---

## When To Use

When there is a need for autocomplete functionality.

## API

```html
<input nz-input [(ngModel)]="value" [nzAutocomplete]="auto" />
<nz-autocomplete [nzDataSource]="['12345', '23456', '34567']" #auto></nz-autocomplete>
```

```html
<input nz-input [(ngModel)]="value" [nzAutocomplete]="auto" />
<nz-autocomplete #auto>
  <nz-auto-option [nzValue]="'12345'">12345</nz-auto-option>
  <nz-auto-option [nzValue]="'23456'">23456</nz-auto-option>
  <nz-auto-option [nzValue]="'34567'">34567</nz-auto-option>
</nz-autocomplete>
```

### [nzAutocomplete]

| Property           | Description                              | Type                      | Default |
| ------------------ | ---------------------------------------- | ------------------------- | ------- |
| `[nzAutocomplete]` | used to bind `nzAutocomplete` components | `NzAutocompleteComponent` | -       |

### nz-autocomplete

| Property                       | Description                                                                                    | Type                            | Default                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------- |
| `[nzBackfill]`                 | backfill selected item the input when using keyboard                                           | `boolean`                       | `false`                         |
| `[nzDataSource]`               | Data source for autocomplete                                                                   | `AutocompleteDataSource`        | -                               |
| `[nzDefaultActiveFirstOption]` | Whether active first option by default                                                         | `boolean`                       | `true`                          |
| `[nzWidth]`                    | Custom width, unit px                                                                          | `number`                        | trigger element width           |
| `[nzOverlayClassName]`         | Class name of the dropdown root element                                                        | `string`                        | -                               |
| `[nzOverlayStyle]`             | Style of the dropdown root element                                                             | `object`                        | -                               |
| `[compareWith]`                | Same as [SelectControlValueAccessor](https://angular.dev/api/forms/SelectControlValueAccessor) | `(o1: any, o2: any) => boolean` | `(o1: any, o2: any) => o1===o2` |

### nz-auto-option

| Property       | Description                          | Type      | Default |
| -------------- | ------------------------------------ | --------- | ------- |
| `[nzValue]`    | bind ngModel of the trigger element  | `any`     | -       |
| `[nzLabel]`    | display value of the trigger element | `string`  | -       |
| `[nzDisabled]` | disabled option                      | `boolean` | `false` |

## FAQ

### Q: The overlay layer element does not follow the scroll position when scrolling

By default, the overlay layer element uses body as the scroll container. If using another scroll container, add the [CdkScrollable](https://material.angular.dev/cdk/scrolling/api#CdkScrollable) directive to the custom scroll container element.
Note: You need to import the `CdkScrollable` directive or `ScrollingModule` module from `@angular/cdk/scrolling`.
