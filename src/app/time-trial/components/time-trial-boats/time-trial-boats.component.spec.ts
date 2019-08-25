import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrialBoatsComponent } from './time-trial-boats.component';

describe('TimeTrialBoatsComponent', () => {
  let component: TimeTrialBoatsComponent;
  let fixture: ComponentFixture<TimeTrialBoatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTrialBoatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrialBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
