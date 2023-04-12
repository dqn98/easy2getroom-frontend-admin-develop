import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { UsersService } from 'src/app/services/users/users.service';
import { UserResultViewModel } from 'src/app/viewmodels/user/userResultViewModel';
import { Constant } from 'src/app/base/constants';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UpdateRoleViewModel } from 'src/app/viewmodels/user/updateRoleViewModel';

@Component({
  selector: 'app-detail-user-dialog',
  templateUrl: './detail-user-dialog.component.html',
  styleUrls: ['./detail-user-dialog.component.scss']
})
export class DetailUserDialogComponent implements OnInit {

  appUrl = environment.baseUrl;
  userSelected: UserResultViewModel;
  roleSelected: string = '';
  roles = Constant.userRoles;
  isChange: boolean = false;

  uploader: FileUploader;

  constructor(public dialogRef: MatDialogRef<DetailUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertify: AlertifyService,
    private userService: UsersService, 
    private authService: AuthService) {
    this.userSelected = data.user;
    this.roleSelected = data.user.roleName;
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close(this.isChange);
  }

  refresh() {
    this.userService.getUser(this.userSelected.id).subscribe(user => {
      this.userSelected = user;
    });
  }

  updateRole() {
    const viewModel: UpdateRoleViewModel = {
      id: this.userSelected.id,
      role: this.roleSelected == '' ? this.userSelected.roleName : this.roleSelected,
    }
    this.userService.updateRole(viewModel).subscribe(() => {
      this.refresh();
      this.alertify.success(Constant.messagesAlertify.UpdateSuccess);
      this.isChange = true;
    });
  }
}
