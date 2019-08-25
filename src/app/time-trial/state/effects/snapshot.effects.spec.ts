import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SnapshotEffects } from './snapshot.effects';

describe('SnapshotEffects', () => {
  let actions$: Observable<any>;
  let effects: SnapshotEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SnapshotEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SnapshotEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
