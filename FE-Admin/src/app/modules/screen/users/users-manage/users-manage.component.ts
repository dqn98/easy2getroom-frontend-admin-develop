import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResultViewModel } from 'src/app/viewmodels/user/userResultViewModel';
import { MatTableDataSource } from '@angular/material/table';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Constant } from 'src/app/base/constants';
import { MatPaginator } from '@angular/material/paginator';
import { GetUserViewModel } from 'src/app/viewmodels/user/getUsersViewModel';
import { UsersService } from 'src/app/services/users/users.service';
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailUserDialogComponent } from 'src/app/modules/dialog/users/detail-user-dialog/detail-user-dialog.component';
import { AddAnnouncementViewModel } from 'src/app/viewmodels/announcement/addAnnouncementViewModel';
import { WarningDialogComponent } from 'src/app/modules/dialog/warning-dialog/warning-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import * as signalR from "@aspnet/signalr";
import { Announcement } from 'src/app/entities/announcement';

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.scss']
})
export class UsersManageComponent implements OnInit {

  private hubConnection;
  isExpaned: boolean = false;
  users: UserResultViewModel[];
  roleSelected: string = '';
  keywordFilter: string = '';
  roles = Constant.userRoles;
  isLoadingResults: boolean;

  public dataSource: any;

  public config: PerfectScrollbarConfigInterface = {};

  public pageSizeOptions = Constant.pageSizeOptions;

  public displayedColumns = ['order', 'fullname', 'email', 'role', 'dateCreated', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
    private usersService: UsersService,
    private changeDetectorRefs: ChangeDetectorRef,
    private alertify: AlertifyService,
    private authService: AuthService,
    private announcementService: AnnouncementService,
    private router: Router,
    private alertitfy: AlertifyService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.route.data.subscribe(data => {
      this.users = data['users'];
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    });
    this.signalrConn(this.authService.decodedToken.user_id);
  }

  refresh() {
    this.isLoadingResults = true;
    const viewModel: GetUserViewModel = {
      role: this.roleSelected,
      keyword: this.keywordFilter
    };
    this.usersService.getUsers(viewModel).subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
      this.isLoadingResults = false;
    });
    this.isExpaned = false;
  }

  resetAllFilter() {
    this.roleSelected = '';
    this.keywordFilter = '';
  }

  openDialog(id: string, user: UserResultViewModel) {
    const dialogRef = this.dialog.open(DetailUserDialogComponent, {
      data: {
        id: id,
        user: user
      },
      width: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === false) {
        return;
      }
      this.refresh();
    });
  }

  detail(id: string) {
    this.usersService.getUser(id).subscribe(user => {
      this.openDialog(id, user);
    });
  }

  add() {

  }

  public warning(id: string) {
    this.usersService.getUser(id).subscribe(property => {
      const dialogRef = this.dialog.open(WarningDialogComponent, {
        data: {
          id: id,
          property: property,
        },
        width: '50%',
      });

      dialogRef.afterClosed().subscribe(result => {
        let viewModel: AddAnnouncementViewModel = {
          content: result.content + ": by Admin " + this.authService.decodedToken.full_name,
          senderId: this.authService.decodedToken.user_id,
          receiverId: id,
          announcementTypeId: Constant.announcementContent.AnnouncementType.Warning
        };
        this.announcementService.saveAnnouncement(viewModel).subscribe(announcement => {
          this.sendAnnouncement(announcement);
        });
        this.alertitfy.success(Constant.messagesAlertify.SendAnnouncementSuccess)
      });
    });
  }

  delete(id: string) {
    this.alertify.confirm(Constant.messagesAlertify.ConfirmMessage, () => {
      this.usersService.delete(id).subscribe(() => {
        this.refresh();
        this.alertify.success(Constant.messagesAlertify.DeleteSuccess);
      }, error => {
        this.alertify.error(Constant.messagesAlertify.DeleteError);
      });
    });
  }

  public sendMessages(userId) {
    this.router.navigate(['/messages/' + userId]);
  }

  signalrConn(loggedUserid: string) {
    //Init Connection
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44390/NotifyHub?user=" + loggedUserid)
      .build();

    //Call client methods from hub to update User
    this.hubConnection.on("CreateConnection", () => { });

    //Start Connection
    this.hubConnection
      .start()
      .then(function () {
        console.log("Connected");
      }).catch(function (err) {
        return console.error(err.toString());
      });
  }

  sendAnnouncement(announcement: Announcement) {
    this.hubConnection.invoke('SendAnnouncement', announcement);
  }
}

