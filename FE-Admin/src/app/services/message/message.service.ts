import { Injectable, EventEmitter } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageViewModel } from 'src/app/viewmodels/message/messageViewModel';
import { Message } from 'src/app/entities/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseService {
  
  constructor(private http: HttpClient) {
    super();
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.appUrl + "Message/GetMessages");
  }

  saveMessage(viewModel: MessageViewModel): Observable<Message> {
    return this.http.post<Message>(this.appUrl + "Message/SendMessage", viewModel);
  }
}
