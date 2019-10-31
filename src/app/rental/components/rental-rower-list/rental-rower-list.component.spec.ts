import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalRowerListComponent } from './rental-rower-list.component';

describe('RentalRowerListComponent', () => {
  let component: RentalRowerListComponent;
  let fixture: ComponentFixture<RentalRowerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalRowerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalRowerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
