import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrialEditComponent } from './time-trial-edit.component';

describe('TimeTrialEditComponent', () => {
  let component: TimeTrialEditComponent;
  let fixture: ComponentFixture<TimeTrialEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTrialEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrialEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
