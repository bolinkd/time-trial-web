import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrialBoatsEditComponent } from './time-trial-boats-edit.component';

describe('TimeTrialBoatsEditComponent', () => {
  let component: TimeTrialBoatsEditComponent;
  let fixture: ComponentFixture<TimeTrialBoatsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTrialBoatsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrialBoatsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
