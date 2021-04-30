import { TestBed } from '@angular/core/testing';

import { DemoapiService } from './demoapi.service';

describe('DemoapiService', () => {
  let service: DemoapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
