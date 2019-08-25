import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrialCreateComponent } from './time-trial-create.component';

describe('TimeTrialCreateComponent', () => {
  let component: TimeTrialCreateComponent;
  let fixture: ComponentFixture<TimeTrialCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTrialCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
