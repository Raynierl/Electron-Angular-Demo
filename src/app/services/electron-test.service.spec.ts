import { TestBed } from '@angular/core/testing';

import { ElectronTestService } from './electron-test.service';

describe('ElectronTestService', () => {
  let service: ElectronTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
