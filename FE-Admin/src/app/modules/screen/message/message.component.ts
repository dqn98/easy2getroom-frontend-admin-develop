import { Component, OnInit } from '@angular/core';
import { UserResultViewModel } from 'src/app/viewmodels/user/userResultViewModel';
import { ChatService } from 'src/app/services/message/chat.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public usersList: UserResultViewModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      console.log(data);
      this.usersList = data['users'];
    });
  }
  
  chooseUser(user: UserResultViewModel) {
    this.router.navigate(['/messages/' + user.id]);
  }


  public applyFilter(filterValue: string) {
    let tempUserList: UserResultViewModel[];
    this.usersList.forEach(user => {
      if (user.fullName.includes(filterValue)) {
        tempUserList.push(user);
      }
    });
    this.usersList = tempUserList;
  }
}
