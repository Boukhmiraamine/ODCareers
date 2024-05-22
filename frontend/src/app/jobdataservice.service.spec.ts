import { TestBed } from '@angular/core/testing';

import { JobdataserviceService } from './jobdataservice.service';

describe('JobdataserviceService', () => {
  let service: JobdataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobdataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
