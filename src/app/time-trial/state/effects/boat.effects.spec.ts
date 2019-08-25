import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BoatEffects } from './boat.effects';

describe('BoatEffects', () => {
  let actions$: Observable<any>;
  let effects: BoatEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BoatEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(BoatEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
