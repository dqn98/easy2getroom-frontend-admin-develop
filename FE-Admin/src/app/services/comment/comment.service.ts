import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddCommentViewModel } from 'src/app/viewmodels/comment/addCommentViewModel';
import { LikeViewModel } from 'src/app/viewmodels/comment/likeViewModel';
import { CommentResultViewModel } from 'src/app/viewmodels/comment/commentResultViewModel';
import { GetCommentViewModel } from 'src/app/viewmodels/comment/getCommentViewModel';
import { GetChildCommentsViewModel } from 'src/app/viewmodels/comment/getChildCommentsViewModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getComments(viewModel: GetCommentViewModel): Observable<CommentResultViewModel[]> {
    return this.http.post<CommentResultViewModel[]>(this.appUrl + "AdminComment/GetComments", viewModel);
  }

  getChildComments(viewModel: GetChildCommentsViewModel): Observable<CommentResultViewModel[]> {
    return this.http.post<CommentResultViewModel[]>(this.appUrl + "AdminComment/GetChildComments", viewModel);
  }
  
  addComment(viewModel: AddCommentViewModel): Observable<any> {
    return this.http.post(this.appUrl + "AdminComment/AddComment", viewModel);
  }

  like(viewModel: LikeViewModel): Observable<any> {
    return this.http.post(this.appUrl + 'AdminComment/Like', viewModel);
  }
}
