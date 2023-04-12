import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyCommentDialogComponent } from './reply-comment-dialog.component';

describe('ReplyCommentDialogComponent', () => {
  let component: ReplyCommentDialogComponent;
  let fixture: ComponentFixture<ReplyCommentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyCommentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
