import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPropertiesChartComponent } from './total-properties-chart.component';

describe('TotalPropertiesChartComponent', () => {
  let component: TotalPropertiesChartComponent;
  let fixture: ComponentFixture<TotalPropertiesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPropertiesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPropertiesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
