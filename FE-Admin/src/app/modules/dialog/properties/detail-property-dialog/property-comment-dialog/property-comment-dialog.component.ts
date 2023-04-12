import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'src/app/entities/property';
import { CommentService } from 'src/app/services/comment/comment.service';
import { CommentResultViewModel } from 'src/app/viewmodels/comment/commentResultViewModel';
import { GetCommentViewModel } from 'src/app/viewmodels/comment/getCommentViewModel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ReplyCommentDialogComponent } from '../../reply-comment-dialog/reply-comment-dialog.component';
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { Constant } from 'src/app/base/constants';

@Component({
  selector: 'app-property-comment-dialog',
  templateUrl: './property-comment-dialog.component.html',
  styleUrls: ['./property-comment-dialog.component.scss']
})
export class PropertyCommentDialogComponent implements OnInit {

  @Input() property: Property;

  comments: CommentResultViewModel[];


  constructor(private commentService: CommentService,
    private authService: AuthService,
    private dialog: MatDialog,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    const viewModel: GetCommentViewModel = {
      propertyId: this.property.id,
      userId: this.authService.decodedToken.user_id
    }
    this.commentService.getComments(viewModel).subscribe(comments => {
      this.comments = comments;
    });
  }

  reply(comment: CommentResultViewModel) {
    const dialogRef = this.dialog.open(ReplyCommentDialogComponent, {
      data: {
        comment: comment
      },
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.alertify.success(Constant.messagesAlertify.UpdateSuccess);
      this.loadComments();
    }, error => {
      this.alertify.error(Constant.messagesAlertify.UpdateError);
    });
  }

  like(comment: CommentResultViewModel) {

  }
}
