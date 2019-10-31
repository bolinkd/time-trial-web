import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupComponent } from './admin-group.component';

describe('AdminGroupComponent', () => {
  let component: AdminGroupComponent;
  let fixture: ComponentFixture<AdminGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
