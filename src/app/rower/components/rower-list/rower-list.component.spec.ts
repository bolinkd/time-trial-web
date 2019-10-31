import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowerListComponent } from './rower-list.component';

describe('RowerListComponent', () => {
  let component: RowerListComponent;
  let fixture: ComponentFixture<RowerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
