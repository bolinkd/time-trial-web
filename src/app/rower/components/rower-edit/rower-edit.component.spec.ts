import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowerEditComponent } from './rower-edit.component';

describe('RowerEditComponent', () => {
  let component: RowerEditComponent;
  let fixture: ComponentFixture<RowerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
