---
category: Components
type: Data Entry
cols: 1
title: Transfer
cover: 'https://gw.alipayobjects.com/zos/alicdn/QAXskNI4G/Transfer.svg'
description: Double column transfer choice box.
---

## When To Use

- It is a select control essentially which can be use for selecting multiple items.
- Transfer can display more information for items and take up more space.

Transfer the elements between two columns intuitively and efficiently.

One or more elements can be selected from either column, one click on the proper `direction` button, and the transfer is done. The left column is considered the `source` and the right column is considered the `target`. As you can see in the API description, these names are reflected in.

## API

### nz-transfer

| Property                | Description                                                                                                                       | Type                                                   | Default               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------- |
| `[nzDataSource]`        | Used for setting the data source. Except for the elements whose keys are `direction: 'right'` prop, or using `nzTargetKeys` prop. | `TransferItem[]`                                       | `[]`                  |
| `[nzDisabled]`          | Whether the transfer is disabled                                                                                                  | `boolean`                                              | `false`               |
| `[nzTitles]`            | A set of titles that are sorted from left to right.                                                                               | `string[]`                                             | `['', '']`            |
| `[nzOperations]`        | A set of operations that are sorted from bottom to top.                                                                           | `string[]`                                             | `['', '']`            |
| `[nzListStyle]`         | A custom CSS style used for rendering the transfer columns. equals to `ngStyle`                                                   | `object`                                               | -                     |
| `[nzItemUnit]`          | single unit                                                                                                                       | `string`                                               | `'item'`              |
| `[nzItemsUnit]`         | multiple unit                                                                                                                     | `string`                                               | `'items'`             |
| `[nzRenderList]`        | Customize render list, please refer to the case.                                                                                  | `Array<TemplateRef<void> \| null>`                     | `[null, null]`        |
| `[nzRender]`            | The function to generate the item shown on a column. please refer to the case.                                                    | `TemplateRef<void>`                                    | -                     |
| `[nzFooter]`            | A function used for rendering the footer. please refer to the case.                                                               | `TemplateRef<void>`                                    | -                     |
| `[nzShowSelectAll]`     | Whether to display the select all box                                                                                             | `boolean`                                              | `true`                |
| `[nzShowSearch]`        | Whether a search box is shown on each column.                                                                                     | `boolean`                                              | `false`               |
| `[nzFilterOption]`      | A function to determine whether an item should be shown in a search result list                                                   | `(inputValue: string, item: TransferItem) => boolean`  | -                     |
| `[nzSearchPlaceholder]` | The hint text of the search box.                                                                                                  | `string`                                               | `'Search here'`       |
| `[nzNotFoundContent]`   | Text to display when a column is empty.                                                                                           | `string`                                               | `'The list is empty'` |
| `[nzCanMove]`           | A function to determine what items should be moved (by default all checked items are moved). please refer to the case.            | `(arg: TransferCanMove) => Observable<TransferItem[]>` | -                     |
| `[nzSelectedKeys]`      | A set of keys of selected items.                                                                                                  | `string[]`                                             | -                     |
| `[nzTargetKeys]`        | A set of keys of elements that are listed on the right column.                                                                    | `string[]`                                             | -                     |
| `[nzOneWay]`            | Display as single direction style                                                                                                 | `boolean`                                              | `false`               |
| `[nzStatus]`            | Set validation status                                                                                                             | `'error' \| 'warning'`                                 | -                     |
| `(nzChange)`            | A callback function that is executed when the transfer between columns is complete.                                               | `EventEmitter<TransferChange>`                         | -                     |
| `(nzSearchChange)`      | A callback function which is executed when search field are changed                                                               | `EventEmitter<TransferSearchChange>`                   | -                     |
| `(nzSelectChange)`      | A callback function which is executed when selected items are changed.                                                            | `EventEmitter<TransferSearchChange>`                   | -                     |

#### TransferItem

| Property  | Description                                                                                     | Type                | Default |
| --------- | ----------------------------------------------------------------------------------------------- | ------------------- | ------- |
| title     | Used to display and search keyword                                                              | `string`            | -       |
| direction | Used for setting the data source. Except the elements whose keys are `direction: 'right'` prop. | `'left' \| 'right'` | -       |
| disabled  | specifies whether the checkbox is disabled                                                      | `boolean`           | `false` |
| checked   | specifies whether the checkbox is selected                                                      | `boolean`           | `false` |

#### TransferCanMove

| Property  | Description                       | Type                | Default |
| --------- | --------------------------------- | ------------------- | ------- |
| direction | data direction                    | `'left' \| 'right'` | -       |
| list      | Used for setting the source data. | `TransferItem[]`    | `[]`    |

#### TransferChange

| Property | Description                       | Type                | Default |
| -------- | --------------------------------- | ------------------- | ------- |
| from     | data direction                    | `'left' \| 'right'` | -       |
| to       | data direction                    | `'left' \| 'right'` | -       |
| list     | Used for setting the source data. | `TransferItem[]`    | `[]`    |

#### TransferSearchChange

| Property  | Description    | Type                | Default |
| --------- | -------------- | ------------------- | ------- |
| direction | data direction | `'left' \| 'right'` | -       |
| value     | Search keyword | `string`            | -       |

#### nzRenderList

| Property          | Description             | Type                           | Default |
| ----------------- | ----------------------- | ------------------------------ | ------- |
| `direction`       | List render direction   | `'left' \| 'right'`            | -       |
| `disabled`        | Disable list or not     | `boolean`                      | -       |
| `items`           | Filtered items          | `TransferItem[]`               | -       |
| `onItemSelect`    | Select item             | `(item: TransferItem) => void` | -       |
| `onItemSelectAll` | Select a group of items | `(selected: boolean) => void`  | -       |
