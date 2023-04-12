import { Component, OnInit, ViewChild } from '@angular/core';
import { FeatureService } from 'src/app/services/feature/feature.service';
import { ActivatedRoute } from '@angular/router';
import { Feature } from 'src/app/entities/feature';
import { Constant } from 'src/app/base/constants';
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FeatureViewModel } from 'src/app/viewmodels/feature/featureViewModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  keywordFilter: string = "";

  isLoadingResults: boolean;
  isSelected: boolean = false;
  isAdd: boolean = false;
  isEdit: boolean = false;

  featureIdSelected: number;
  features: Feature[];
  public config: PerfectScrollbarConfigInterface = {};
  public dataSource: any;

  featureForm: FormGroup;

  constructor(private featureService: FeatureService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.route.data.subscribe(data => {
      this.features = data['features'];
      this.isLoadingResults = false;
    });
  }

  select(id: number) {
    this.featureIdSelected = id;
    this.isSelected = true;
  }

  add() {
    this.initForm();
    this.isAdd = true;
  }

  edit() {
    this.featureService.getFeature(this.featureIdSelected).subscribe(feature => {
      this.featureForm = this.formBuilder.group({
        name: [feature.name, Validators.required],
      });
      this.isEdit = true;
    }, error => {
      this.alertify.error(Constant.messagesAlertify.LoadError);
    });
  }

  initForm() {
    this.featureForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  save() {
    const viewModel: FeatureViewModel = {
      name: this.featureForm.value.name
    };
    this.featureService.add(viewModel).subscribe(res => {
      this.initForm();
      this.refresh();
      this.alertify.success(Constant.messagesAlertify.UpdateSuccess);
    }, error => {
      this.alertify.error(Constant.messagesAlertify.UpdateError);
    })
  }

  refresh() {
    this.isLoadingResults = true;
    const viewModel: FeatureViewModel = {
      name: this.keywordFilter
    }
    this.featureService.getFeatures(viewModel).subscribe(features => {
      console.log(features);
      this.features = features;
      this.isLoadingResults = false;
    }, error => {
      this.alertify.error(Constant.messagesAlertify.LoadError);
      this.isLoadingResults = false;
    });
  }

  resetAllFilter() {
    this.keywordFilter = "";
  }

  delete() {
    this.featureService.delete(this.featureIdSelected).subscribe(res=> {
      this.refresh();
      this.alertify.success(Constant.messagesAlertify.DeleteSuccess);
    }, error => {
      this.alertify.error(Constant.messagesAlertify.DeleteError);
    });
  }
}
