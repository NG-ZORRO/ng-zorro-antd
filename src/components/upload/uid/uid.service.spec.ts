import { TestBed, inject } from '@angular/core/testing';

import { UidService } from './uid.service';

describe('UidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UidService]
    });
  });

  it('should be created', inject([UidService], (service: UidService) => {
    expect(service).toBeTruthy();
  }));
});
