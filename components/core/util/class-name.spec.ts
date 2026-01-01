/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { generateClassName, getClassListFromValue } from './class-name';

describe('class-name utils', () => {
  describe('generateClassName', () => {
    it('should generate className with prefix and suffix', () => {
      expect(generateClassName('ant', 'button')).toBe('ant-button');
      expect(generateClassName('nz', 'alert')).toBe('nz-alert');
    });

    it('should handle empty strings', () => {
      expect(generateClassName('', 'suffix')).toBe('-suffix');
      expect(generateClassName('prefix', '')).toBe('prefix-');
      expect(generateClassName('', '')).toBe('-');
    });

    it('should handle special characters', () => {
      expect(generateClassName('ant-design', 'button-primary')).toBe('ant-design-button-primary');
      expect(generateClassName('nz_component', 'test_case')).toBe('nz_component-test_case');
    });

    it('should handle numbers', () => {
      expect(generateClassName('prefix', '123')).toBe('prefix-123');
      expect(generateClassName('v1', 'alpha')).toBe('v1-alpha');
    });
  });

  describe('getClassListFromValue', () => {
    it('should return array when input is an array', () => {
      const input = ['class1', 'class2', 'class3'];
      expect(getClassListFromValue(input)).toEqual(['class1', 'class2', 'class3']);
    });

    it('should split string by whitespace', () => {
      expect(getClassListFromValue('class1 class2 class3')).toEqual(['class1', 'class2', 'class3']);
      expect(getClassListFromValue('single')).toEqual(['single']);
    });

    it('should handle multiple spaces', () => {
      expect(getClassListFromValue('class1  class2   class3')).toEqual(['class1', 'class2', 'class3']);
      expect(getClassListFromValue('class1    class2')).toEqual(['class1', 'class2']);
    });

    it('should trim leading and trailing spaces', () => {
      expect(getClassListFromValue('  class1 class2  ')).toEqual(['class1', 'class2']);
      expect(getClassListFromValue('   single   ')).toEqual(['single']);
    });

    it('should handle tabs and newlines', () => {
      expect(getClassListFromValue('class1\tclass2\nclass3')).toEqual(['class1', 'class2', 'class3']);
      expect(getClassListFromValue('class1\n\nclass2')).toEqual(['class1', 'class2']);
    });

    it('should handle empty string', () => {
      expect(getClassListFromValue('')).toEqual([]);
      expect(getClassListFromValue('   ')).toEqual([]);
    });

    it('should handle empty array', () => {
      expect(getClassListFromValue([])).toEqual([]);
    });

    it('should handle array with empty strings', () => {
      const input = ['', 'class1', ''];
      expect(getClassListFromValue(input)).toEqual(['class1']);
    });

    it('should handle mixed whitespace characters', () => {
      expect(getClassListFromValue('class1\r\nclass2\t\tclass3   class4')).toEqual([
        'class1',
        'class2',
        'class3',
        'class4'
      ]);
    });

    it('should preserve class names with special characters', () => {
      expect(getClassListFromValue('ant-btn ant-btn-primary ant-btn-lg')).toEqual([
        'ant-btn',
        'ant-btn-primary',
        'ant-btn-lg'
      ]);
      expect(getClassListFromValue('class_1 class-2 class.3')).toEqual(['class_1', 'class-2', 'class.3']);
    });
  });
});
