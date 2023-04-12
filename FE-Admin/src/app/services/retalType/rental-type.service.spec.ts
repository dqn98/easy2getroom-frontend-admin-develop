import { TestBed } from '@angular/core/testing';

import { RentalTypeService } from './rental-type.service';

describe('RentalTypeService', () => {
  let service: RentalTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
