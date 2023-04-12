import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCommentDialogComponent } from './property-comment-dialog.component';

describe('PropertyCommentDialogComponent', () => {
  let component: PropertyCommentDialogComponent;
  let fixture: ComponentFixture<PropertyCommentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyCommentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
