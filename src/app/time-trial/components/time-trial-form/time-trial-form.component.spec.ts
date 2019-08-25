import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrialFormComponent } from './time-trial-form.component';

describe('TimeTrialFormComponent', () => {
  let component: TimeTrialFormComponent;
  let fixture: ComponentFixture<TimeTrialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTrialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
