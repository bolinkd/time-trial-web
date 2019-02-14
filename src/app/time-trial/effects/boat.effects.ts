import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Update} from '@ngrx/entity';
import {BoatService} from '../services/boat.service';
import {
  BoatActionTypes,
  CreateBoat,
  CreateBoatFailure,
  CreateBoatSuccess,
  UpdateBoat,
  UpdateBoatFailure,
  UpdateBoatSuccess
} from '../actions/boat.actions';
import {Boat} from '../models/boat.model';





@Injectable()
export class BoatEffects {

  @Effect()
  createBoat$: Observable<Action> = this.actions$
    .pipe(
      ofType<CreateBoat>(BoatActionTypes.CreateBoat),
      switchMap(action => this.boatService.createBoat(action.payload.boat)
        .pipe(
          map(boat => new CreateBoatSuccess({ boat })),
          catchError(error => of(new CreateBoatFailure({ error })))
        ))
    );

  @Effect()
  updateBoat$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateBoat>(BoatActionTypes.UpdateBoat),
      switchMap(action => this.boatService.updateBoat(action.payload.boat)
        .pipe(
          map(resp => {
            const boat: Update<Boat> = { id: resp.id, changes: resp };
            return new UpdateBoatSuccess({ boat });
          }),
          catchError(error => of(new UpdateBoatFailure({ error })))
        ))
    );

  constructor(private actions$: Actions, private boatService: BoatService) {}

}
