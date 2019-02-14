import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrialBoatsCreateComponent } from './time-trial-boats-create.component';

describe('TimeTrialBoatsCreateComponent', () => {
  let component: TimeTrialBoatsCreateComponent;
  let fixture: ComponentFixture<TimeTrialBoatsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTrialBoatsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrialBoatsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
