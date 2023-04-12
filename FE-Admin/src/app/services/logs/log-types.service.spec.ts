import { TestBed } from '@angular/core/testing';

import { LogTypesService } from './log-types.service';

describe('LogTypesService', () => {
  let service: LogTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
