import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetMessageViewModel } from 'src/app/viewmodels/message/getMessageViewModel';
import { Message } from 'src/app/entities/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getMessage(viewModel: GetMessageViewModel): Observable<Message[]> {
    return this.http.post<Message[]>(this.appUrl + "Message/GetMessages", viewModel);
  }

}
