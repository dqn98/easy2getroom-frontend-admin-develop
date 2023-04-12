import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { MessageViewModel } from 'src/app/viewmodels/message/messageViewModel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/message/chat.service';
import * as signalR from "@aspnet/signalr";
import { ActivatedRoute } from '@angular/router';
import { UserResultViewModel } from 'src/app/viewmodels/user/userResultViewModel';
import { GetMessageViewModel } from 'src/app/viewmodels/message/getMessageViewModel';
import { Message } from 'src/app/entities/message';
import { Constant } from 'src/app/base/constants';
import { MessageService } from 'src/app/services/message/message.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages: Message[] = [];
  resmessage: string;
  loggedUserid: string;
  recipientId: string = '';
  recipient: UserResultViewModel;

  //Chat
  private sub: any;
  public chatMessages: Message[] = [];
  public chatMessage: Message = null;

  private hubConnection;
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.loggedUserid = this.authService.decodedToken.user_id;
  }

  ngOnInit() {
    this.loggedUserid = this.authService.decodedToken.user_id;
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.recipientId = params['userId'];
      this.signalrConn();
      this.chatLog();
    });
  }

  signalrConn() {
    //Init Connection
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44390/ChatHub?user=" + this.loggedUserid)
      .build();

    //Call client methods from hub to update User
    this.hubConnection.on("UpdateUserList", () => { });

    //Call client methods from hub to update User
    this.hubConnection.on("ReceiveMessage", (message: Message) => {
      message.status = Constant.messageStatus.Recipient;
      this.chatMessages.push(message);
      // this.chatLog()
    });

    //Start Connection
    this.hubConnection
      .start()
      .then(function () {
        console.log("Connected");
      }).catch(function (err) {
        return console.error(err.toString());
      });
  }

  sendMessage(content) {
    //Send Message
    if (content != '') {
      let viewModel = new MessageViewModel();
      viewModel.senderId = this.loggedUserid;
      viewModel.recipientId = this.recipientId;
      viewModel.content = content;
      viewModel.status = Constant.messageStatus.Sent;
      this.messageService.saveMessage(viewModel).subscribe(message => {
        this.chatMessages.push(message);
        this.hubConnection.invoke('SendMessage', message);
      });
    }
  }

  chatLog() {
    this.chatMessages = [];
    //ChatLog
    var viewModel: GetMessageViewModel = {
      senderId: this.loggedUserid,
      recipientId: this.recipientId
    }
    this.chatService.getMessage(viewModel).subscribe(messages => {
      this.messages = messages;
      if (this.messages != null) {
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].senderId === this.loggedUserid) {
            this.messages[i].status = Constant.messageStatus.Sent;
          }
          else {
            this.messages[i].status = Constant.messageStatus.Recipient;
          }
          this.chatMessages.push(this.messages[i]);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy() {
    //Stop Connection
    this.hubConnection
      .stop()
      .then(function () {
        console.log("Stopped");
      }).catch(function (err) {
        return console.error(err.toString());
      });
  }

}
