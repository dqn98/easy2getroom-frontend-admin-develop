import { TestBed } from '@angular/core/testing';

import { PropertyCategoryService } from './property-category.service';

describe('PropertyCategoryService', () => {
  let service: PropertyCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
