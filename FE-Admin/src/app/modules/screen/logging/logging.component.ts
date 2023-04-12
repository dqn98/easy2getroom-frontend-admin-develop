import { Component, OnInit, ViewChild } from '@angular/core';
import { LogsService } from 'src/app/services/logs/logs.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { LogViewModel } from 'src/app/viewmodels/logs/logViewModel';
import { LogType } from 'src/app/entities/logType';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Constant } from 'src/app/base/constants';
import * as signalR from "@aspnet/signalr";
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit {

  private loggedUserid: string;
  public logs: LogViewModel[] = [];
  public logTypes: LogType[] = [];
  public isLoadingResults: boolean;
  public keywordFilter: string = "";
  public dataSource: any;
  public config: PerfectScrollbarConfigInterface = {};
  public pageSizeOptions = Constant.pageSizeOptions;

  private hubConnection;
  public displayedColumns = ['event'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private logsService: LogsService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.loggedUserid = this.authService.decodedToken.user_id;
    this.route.data.subscribe(data => {
      this.logs = data['logs'];
      this.logTypes = data['logTypes'];
      this.dataSource = new MatTableDataSource(this.logs);
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    });
    this.signalrConn();
  }

  refresh() {

  }

  public signalrConn() {
    //Init Connection
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44390/LoggingHub?user=" + this.loggedUserid)
      .build();

    //Call client methods from hub to update User
    this.hubConnection.on("UpdateUserList", () => { });

    //Call client methods from hub to update User
    this.hubConnection.on("ReceiveNewLog", (log: LogViewModel) => {
      this.logs.unshift(log);
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

}
