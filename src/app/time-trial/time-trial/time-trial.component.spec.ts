import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrialComponent } from './time-trial.component';

describe('TimeTrialComponent', () => {
  let component: TimeTrialComponent;
  let fixture: ComponentFixture<TimeTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
