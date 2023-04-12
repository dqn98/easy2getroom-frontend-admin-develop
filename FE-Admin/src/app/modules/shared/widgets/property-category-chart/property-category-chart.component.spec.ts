import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCategoryChartComponent } from './property-category-chart.component';

describe('PropertyCategoryChartComponent', () => {
  let component: PropertyCategoryChartComponent;
  let fixture: ComponentFixture<PropertyCategoryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyCategoryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
