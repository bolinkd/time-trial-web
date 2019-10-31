import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellEditComponent } from './shell-edit.component';

describe('ShellEditComponent', () => {
  let component: ShellEditComponent;
  let fixture: ComponentFixture<ShellEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
