import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowerCreateComponent } from './rower-create.component';

describe('RowerCreateComponent', () => {
  let component: RowerCreateComponent;
  let fixture: ComponentFixture<RowerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
