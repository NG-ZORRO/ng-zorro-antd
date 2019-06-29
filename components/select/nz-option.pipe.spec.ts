import { QueryList } from '@angular/core';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionComponent } from './nz-option.component';
import { defaultFilterOption, NzFilterGroupOptionPipe, NzFilterOptionPipe } from './nz-option.pipe';

// tslint:disable-next-line:no-any
function generateOption(value: any, label: string): NzOptionComponent {
  const option = new NzOptionComponent();
  option.nzValue = value;
  option.nzLabel = label;
  return option;
}

function generateGroupOption(label: string, value: NzOptionComponent[]): NzOptionGroupComponent {
  const optionGroup = new NzOptionGroupComponent();
  const queryList = new QueryList<NzOptionComponent>();
  queryList.reset(value);
  optionGroup.listOfNzOptionComponent = queryList;
  optionGroup.nzLabel = label;
  return optionGroup;
}

// tslint:disable-next-line:no-any
function compareWith(o1: any, o2: any): boolean {
  return o1 === o2;
}

describe('nz-option pipe', () => {
  describe('NzFilterOptionPipe', () => {
    let pipe: NzFilterOptionPipe;
    let listOfOption: NzOptionComponent[];
    beforeEach(() => {
      pipe = new NzFilterOptionPipe();
      listOfOption = [];
      for (let i = 0; i < 10; i++) {
        listOfOption.push(generateOption(`value${i}`, `label${i}`));
      }
    });
    it('should return correct value with inputValue', () => {
      const result = pipe.transform(listOfOption, '9', defaultFilterOption, false, false, [], compareWith);
      expect(result[0].nzLabel).toBe('label9');
      expect(result.length).toBe(1);
    });
    it('should return correct value with null option', () => {
      const result = pipe.transform([new NzOptionComponent()], 'a', defaultFilterOption, false, false, [], compareWith);
      expect(result.length).toBe(0);
    });
    it('should return correct value with filterOption', () => {
      const filterOption = (input: string, option: NzOptionComponent) => {
        if (option && option.nzLabel) {
          return option.nzLabel.toLowerCase().indexOf(input.toLowerCase().replace('9', '8')) > -1;
        } else {
          return false;
        }
      };
      const result = pipe.transform(listOfOption, '9', filterOption, false, false, [], compareWith);
      expect(result[0].nzLabel).toBe('label8');
      expect(result.length).toBe(1);
    });
    it('should return correct value without inputValue', () => {
      const result = pipe.transform(listOfOption, '', defaultFilterOption, false, false, [], compareWith);
      expect(result.length).toBe(10);
    });
    it('should return correct value with serverSearch', () => {
      const result = pipe.transform(listOfOption, 'absd', defaultFilterOption, true, false, [], compareWith);
      expect(result.length).toBe(10);
    });
    it('should return correct value with hide selected options', () => {
      const result = pipe.transform(
        listOfOption,
        '',
        defaultFilterOption,
        false,
        true,
        ['value1', 'value2'],
        compareWith
      );
      expect(result.length).toBe(8);
    });
  });
  describe('NzFilterGroupOptionPipe', () => {
    let pipe: NzFilterGroupOptionPipe;
    let listOfGroupOption: NzOptionGroupComponent[];
    beforeEach(() => {
      pipe = new NzFilterGroupOptionPipe();
      listOfGroupOption = [
        generateGroupOption('g1', [generateOption('a', 'a'), generateOption('b', 'b')]),
        generateGroupOption('g2', [generateOption('b', 'b'), generateOption('c', 'c')])
      ];
    });
    it('should return correct value with inputValue', () => {
      const result01 = pipe.transform(listOfGroupOption, 'a', defaultFilterOption, false, false, [], compareWith);
      expect(result01[0].nzLabel).toBe('g1');
      expect(result01.length).toBe(1);
      const result02 = pipe.transform(listOfGroupOption, 'b', defaultFilterOption, false, false, [], compareWith);
      expect(result02.length).toBe(2);
    });
    it('should return correct value with filterOption', () => {
      const filterOption = (input: string, option: NzOptionComponent) => {
        if (option && option.nzLabel) {
          return option.nzLabel.toLowerCase().indexOf(input.toLowerCase().replace('a', 'c')) > -1;
        } else {
          return false;
        }
      };
      const result = pipe.transform(listOfGroupOption, 'a', filterOption, false, false, [], compareWith);
      expect(result[0].nzLabel).toBe('g2');
      expect(result.length).toBe(1);
    });
    it('should return correct value without inputValue', () => {
      const result = pipe.transform(listOfGroupOption, '', defaultFilterOption, false, false, [], compareWith);
      expect(result.length).toBe(2);
    });
    it('should return correct value with serverSearch', () => {
      const result = pipe.transform(listOfGroupOption, 'absd', defaultFilterOption, true, false, [], compareWith);
      expect(result.length).toBe(2);
    });
    it('should return correct value with hide selected options', () => {
      const result = pipe.transform(listOfGroupOption, '', defaultFilterOption, false, true, ['a', 'b'], compareWith);
      expect(result.length).toBe(1);
    });
  });
});
