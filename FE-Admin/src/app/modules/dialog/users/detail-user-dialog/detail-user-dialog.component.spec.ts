import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserDialogComponent } from './detail-user-dialog.component';

describe('DetailUserDialogComponent', () => {
  let component: DetailUserDialogComponent;
  let fixture: ComponentFixture<DetailUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailUserDialogComponent);
    component = fixture.componentInstance;zz
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
