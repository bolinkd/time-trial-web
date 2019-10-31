import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowerSelectComponent } from './rower-select.component';

describe('RowerSelectComponent', () => {
  let component: RowerSelectComponent;
  let fixture: ComponentFixture<RowerSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowerSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
