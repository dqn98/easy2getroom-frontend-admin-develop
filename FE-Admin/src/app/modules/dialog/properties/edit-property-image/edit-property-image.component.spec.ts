import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropertyImageComponent } from './edit-property-image.component';

describe('EditPropertyImageComponent', () => {
  let component: EditPropertyImageComponent;
  let fixture: ComponentFixture<EditPropertyImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPropertyImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPropertyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
