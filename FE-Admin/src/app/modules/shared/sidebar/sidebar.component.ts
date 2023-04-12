import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionService } from 'src/app/services/function/function.service';
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { Function } from 'src/app/entities/function';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {};

  avatar: string;
  fullName: string;
  public functions: Function[];

  constructor(private functionService: FunctionService, private alertify: AlertifyService, 
    private authService: AuthService) {
    this.functionService.getFunctions().subscribe(fucntions => {
      this.functions = fucntions;
    });
  }

  ngOnInit(): void {
    this.authService.avatar.subscribe(avatar => this.avatar = avatar);
    this.fullName = this.authService.decodedToken.full_name;
  }
}
