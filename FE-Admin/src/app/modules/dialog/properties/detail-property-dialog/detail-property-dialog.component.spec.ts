import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPropertyDialogComponent } from './detail-property-dialog.component';

describe('DetailPropertyDialogComponent', () => {
  let component: DetailPropertyDialogComponent;
  let fixture: ComponentFixture<DetailPropertyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPropertyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPropertyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
