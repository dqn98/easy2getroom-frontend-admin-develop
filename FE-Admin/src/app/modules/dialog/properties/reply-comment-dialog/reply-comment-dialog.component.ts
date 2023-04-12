import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommentResultViewModel } from 'src/app/viewmodels/comment/commentResultViewModel';
import { AddCommentViewModel } from 'src/app/viewmodels/comment/addCommentViewModel';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reply-comment-dialog',
  templateUrl: './reply-comment-dialog.component.html',
  styleUrls: ['./reply-comment-dialog.component.scss']
})
export class ReplyCommentDialogComponent implements OnInit {

  commentForm: FormGroup;
  comment: CommentResultViewModel;

  constructor(
    public dialogRef: MatDialogRef<ReplyCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commentService: CommentService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private fb: FormBuilder) {
    this.comment = data.comment;
  }

  ngOnInit(): void {
    this.createCommentForm();
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  save() {
    if (this.commentForm.valid) {
      const viewModel: AddCommentViewModel = {
        userId: this.authService.decodedToken.user_id,
        propertyId: this.comment.propertyId,
        content: this.commentForm.value.content,
        parentId: this.comment.id
      }
      this.commentService.addComment(viewModel).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
