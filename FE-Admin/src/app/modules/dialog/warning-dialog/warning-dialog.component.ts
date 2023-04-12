import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constant } from 'src/app/base/constants';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {

  public warningFrom: FormGroup;
  public property: any;

  public content: string = '';
  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.property = this.data.property;
    this.warningFrom = this.fb.group({
      type: [{ value: Constant.announcementContent.AnnouncementType.Warning, disabled: true }, Validators.required],
      content: ['The reason: ', Validators.required]
    });
  }

  onClose(): void {
    if (this.warningFrom.valid) {
      this.dialogRef.close(this.warningFrom.value);
    }
  }

  public send() {
    if (this.warningFrom.valid) {
      this.dialogRef.close(this.warningFrom.value);
    }
  }
}
