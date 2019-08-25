import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrialBoatsFormComponent } from './time-trial-boats-form.component';

describe('TimeTrialBoatsFormComponent', () => {
  let component: TimeTrialBoatsFormComponent;
  let fixture: ComponentFixture<TimeTrialBoatsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTrialBoatsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrialBoatsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
