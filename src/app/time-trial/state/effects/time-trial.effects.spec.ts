import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimeTrialEffects } from './time-trial.effects';

describe('TimeTrialEffects', () => {
  let actions$: Observable<any>;
  let effects: TimeTrialEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimeTrialEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TimeTrialEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
