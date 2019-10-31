import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellCreateComponent } from './shell-create.component';

describe('ShellCreateComponent', () => {
  let component: ShellCreateComponent;
  let fixture: ComponentFixture<ShellCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
