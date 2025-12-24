/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { NzSizeLDSType } from '../types';
import { NzFormSizeService } from './nz-form-size.service';

describe('NzFormSizeService', () => {
  let service: NzFormSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NzFormSizeService]
    });
    service = TestBed.inject(NzFormSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set form size', async () => {
    const testSize: NzSizeLDSType = 'large';
    service.setFormSize(testSize);
    const finalSize = await firstValueFrom(service.formSize$);
    expect(finalSize).toBe(testSize);
  });

  it('should update form size', async () => {
    service.setFormSize('default');
    let finalSize = await firstValueFrom(service.formSize$);
    expect(finalSize).toBe('default');
    service.setFormSize('small');
    finalSize = await firstValueFrom(service.formSize$);
    expect(finalSize).toBe('small');
  });
});
