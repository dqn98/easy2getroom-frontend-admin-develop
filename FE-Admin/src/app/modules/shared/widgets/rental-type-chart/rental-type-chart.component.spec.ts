import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalTypeChartComponent } from './rental-type-chart.component';

describe('RentalTypeChartComponent', () => {
  let component: RentalTypeChartComponent;
  let fixture: ComponentFixture<RentalTypeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalTypeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalTypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
