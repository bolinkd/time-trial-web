import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellListComponent } from './shell-list.component';

describe('ShellListComponent', () => {
  let component: ShellListComponent;
  let fixture: ComponentFixture<ShellListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
