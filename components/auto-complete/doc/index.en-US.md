---
category: Components
type: Data Entry
title: Autocomplete
---

Autocomplete function of input field.

## When To Use

When there is a need for autocomplete functionality.

## API

```html
<input nz-input [(ngModel)]="value" [nzAutocomplete]="auto">
<nz-autocomplete [nzDataSource]="['12345', '23456', '34567']" #auto></nz-autocomplete>
```

```html
<input nz-input [(ngModel)]="value" [nzAutocomplete]="auto">
<nz-autocomplete #auto>
  <nz-auto-option [nzValue]="'12345'">12345</nz-auto-option>
  <nz-auto-option [nzValue]="'23456'">23456</nz-auto-option>
  <nz-auto-option [nzValue]="'34567'">34567</nz-auto-option>
</nz-autocomplete>
```

### [nzAutocomplete]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| nzAutocomplete | used to bind `nzAutocomplete` components | `NzAutocompleteComponent` | - |

### nz-autocomplete

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| nzBackfill | backfill selected item the input when using keyboard | `boolean` | `false` |
| nzDataSource | Data source for autocomplete | `AutocompleteDataSource` | - |
| nzDefaultActiveFirstOption | Whether active first option by default | `boolean` | `true` |
| nzWidth | Custom width, unit px | `number` | trigger element width |

