import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-auto-complete-certain-category',
  imports: [FormsModule, NzAutocompleteModule, NzFlexModule, NzIconModule, NzInputModule],
  template: `
    <nz-input-search>
      <input placeholder="input here" nz-input nzSize="large" [(ngModel)]="value" [nzAutocomplete]="auto" />
    </nz-input-search>
    <nz-autocomplete #auto>
      @for (group of options; track group.title) {
        <nz-auto-optgroup [nzLabel]="groupTitle">
          <ng-template #groupTitle>
            <nz-flex nzJustify="space-between">
              {{ group.title }}
              <a href="https://www.google.com/search?q=ng+zorro" rel="noopener noreferrer" target="_blank">More</a>
            </nz-flex>
          </ng-template>
          @for (option of group.children; track option.title) {
            <nz-auto-option [nzLabel]="option.title" [nzValue]="option.title">
              <nz-flex nzJustify="space-between">
                {{ option.title }}
                <span>
                  <nz-icon nzType="user" />
                  {{ option.count }}
                </span>
              </nz-flex>
            </nz-auto-option>
          }
        </nz-auto-optgroup>
      }
    </nz-autocomplete>
  `
})
export class NzDemoAutoCompleteCertainCategoryComponent {
  value?: string;
  readonly options = [
    {
      title: 'Libraries',
      children: [
        {
          title: 'AntDesign',
          count: 10000
        },
        {
          title: 'AntDesign UI',
          count: 10600
        }
      ]
    },
    {
      title: 'Solutions',
      children: [
        {
          title: 'AntDesign UI FAQ',
          count: 60100
        },
        {
          title: 'AntDesign FAQ',
          count: 30010
        }
      ]
    },
    {
      title: 'Articles',
      children: [
        {
          title: 'AntDesign design language',
          count: 100000
        }
      ]
    }
  ];
}
