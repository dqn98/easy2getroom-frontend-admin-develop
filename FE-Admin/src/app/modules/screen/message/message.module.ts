import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { ChatComponent } from './chat/chat.component';
import { RouterModule } from '@angular/router';
import { UsersResolver } from 'src/app/resolver/user.resolver';

export const routes = [
  {
    path: '', component: MessageComponent,
    resolve: {
      users: UsersResolver
    },
    children: [
      { path: ':userId', component: ChatComponent }
    ]
  }
]

@NgModule({
  declarations: [
    MessageComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],

})
export class MessageModule { }
