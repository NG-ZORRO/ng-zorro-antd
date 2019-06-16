import { createListOfOption } from './nz-option-container.spec';
import { NzOptionComponent } from './nz-option.component';
import { NzSelectService } from './nz-select.service';

describe('SelectService', () => {
  let service: NzSelectService;
  beforeEach(() => {
    service = new NzSelectService();
  });
  describe('includesSeparators', () => {
    const separators = [' ', ','];
    it('return true when given includes separators', () => {
      expect(service.includesSeparators(',foo,bar', separators)).toBe(true);
    });

    it('return false when given do not include separators', () => {
      expect(service.includesSeparators('foobar', separators)).toBe(false);
    });

    it('return false when string only has a leading separator', () => {
      expect(service.includesSeparators(',foobar', separators)).toBe(false);
    });
  });

  describe('splitBySeparators', () => {
    const separators = [' ', ','];
    it('split given string by separators', () => {
      const str = 'foo bar,baz';
      expect(service.splitBySeparators(str, separators)).toEqual(['foo', 'bar', 'baz']);
    });

    it('split string with leading separator ', () => {
      const str = ',foo';
      expect(service.splitBySeparators(str, separators)).toEqual(['foo']);
    });

    it('split string with trailling separator', () => {
      const str = 'foo,';
      expect(service.splitBySeparators(str, separators)).toEqual(['foo']);
    });

    it('split a separator', () => {
      const str = ',';
      expect(service.splitBySeparators(str, separators)).toEqual([]);
    });

    it('split two separators', () => {
      const str = ',,';
      expect(service.splitBySeparators(str, separators)).toEqual([]);
    });

    it('split two separators surrounded by valid input', () => {
      const str = 'a,,b';
      expect(service.splitBySeparators(str, separators)).toEqual(['a', 'b']);
    });

    it('split repeating separators with valid input throughout', () => {
      const str = ',,,a,b,,,c,d,,,e,';
      expect(service.splitBySeparators(str, separators)).toEqual(['a', 'b', 'c', 'd', 'e']);
    });

    it('split multiple repeating separators with valid input throughout', () => {
      const str = ',,,a b,  c,d, ,e    ,f';
      expect(service.splitBySeparators(str, separators)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    });
    it('split duplicated repeating separators with valid input throughout', () => {
      const str = ',,,a b,  c,d, ,e    ,f,a,b,c';
      expect(service.splitBySeparators(str, separators)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    });
  });
  describe('tag', () => {
    beforeEach(() => {
      service.mode = 'tags';
    });
    it('should updateListOfTagOption work', () => {
      service.listOfCachedSelectedOption = [
        { nzValue: `option_value_0`, nzLabel: `option_label_0` },
        { nzValue: `option_value_miss`, nzLabel: `option_label_miss` }
        // tslint:disable-next-line: no-any
      ] as any;
      service.listOfSelectedValue = [`option_value_1`, `option_value_miss_1`];
      service.listOfTemplateOption = createListOfOption(3);
      service.updateListOfTagOption();
      expect(service.listOfTagAndTemplateOption.length).toEqual(4);
      expect(service.listOfTagAndTemplateOption[0].nzValue).toEqual('option_value_0');
      expect(service.listOfTagAndTemplateOption[0].nzLabel).toEqual('option_label_0');
      expect(service.listOfTagAndTemplateOption[1].nzValue).toEqual('option_value_1');
      expect(service.listOfTagAndTemplateOption[1].nzLabel).toEqual('option_label_1');
    });
    it('should updateAddTagOption work', () => {
      service.listOfSelectedValue = [`option_value_0`, `option_value_1`];
      service.listOfTemplateOption = createListOfOption(3);
      service.searchValue = 'abc';
      service.updateAddTagOption();
      expect(service.addedTagOption!.nzValue).toEqual('abc');
      expect(service.addedTagOption!.nzLabel).toEqual('abc');
    });
  });
  describe('token', () => {
    it('should multiple work', () => {
      service.mode = 'multiple';
      const selectedValueSpy = spyOn(service, 'updateListOfSelectedValue');
      service.listOfTagAndTemplateOption = createListOfOption(3);
      service.tokenSeparate('option_label_0,b,c', [',']);
      expect(selectedValueSpy).toHaveBeenCalledWith(['option_value_0'], true);
    });
    it('should tags work', () => {
      service.mode = 'tags';
      const selectedValueSpy = spyOn(service, 'updateListOfSelectedValue');
      service.listOfTagAndTemplateOption = createListOfOption(3);
      service.tokenSeparate('option_label_0,b,c', [',']);
      expect(selectedValueSpy).toHaveBeenCalledWith(['option_value_0', 'b', 'c'], true);
    });
  });
  describe('remove', () => {
    it('should removeValueFormSelected work', () => {
      service.listOfSelectedValue = ['a', 'b', 'c'];
      const selectedValueSpy = spyOn(service, 'updateListOfSelectedValue');
      const option = new NzOptionComponent();
      option.nzValue = 'a';
      service.removeValueFormSelected(option);
      expect(selectedValueSpy).toHaveBeenCalledWith(['b', 'c'], true);
    });
  });
});
