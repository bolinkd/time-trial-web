import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Store} from '@ngrx/store';
import {Boat} from '../time-trial/state/models/boat.model';
import {TimeTrial} from '../time-trial/state/models/time-trial.model';
import {CreateBoatSuccess, DeleteBoat, UpdateBoatSuccess} from '../time-trial/state/actions/boat.actions';
import {CreateTimeTrialSuccess, DeleteTimeTrial, UpdateTimeTrialSuccess} from '../time-trial/state/actions/time-trial.actions';
import * as moment from 'moment';
import {DeviceDetectorService} from 'ngx-device-detector';

export type DataTypes = 'boat' | 'time-trial';
export type UpdateMethods = 'create' | 'update' | 'delete' | 'join';

export interface UpdateEvent<T> {
  data_type: DataTypes;
  update_method: UpdateMethods;
  payload: T;
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:8080'; // TODO: GET REAL VAL;
  private socket: SocketIOClient.Socket;
  public channelID = '';

  constructor(private _store: Store<any>, private deviceDetectorService: DeviceDetectorService) { }

  init() {
    this.createSocket();
  }

  private createSocket() {
    if (this.socket == null) {
      this.socket = io(this.url, {
        transportOptions: {
          polling: { }
        }, reconnectionAttempts: 2,
      });
      this.initSocket();
      /*
      from(this.oktaService.getIdToken())
        .pipe(take(1))
        .subscribe(token => {
          this.socket = io(this.url, {
            transportOptions: {
              polling: {
                extraHeaders: {
                  'Authorization': 'Bearer ' + token
                }
              }
            }, reconnectionAttempts: 5,
          });
          this.initSocket();
        });
        */
    }
  }

  boatMessageReceived(updateEvent: UpdateEvent<Boat>) {
    const boat = new Boat(updateEvent.payload);
    switch (updateEvent.update_method) {
      case 'create': {
        this._store.dispatch(new CreateBoatSuccess({ boat }));
        return;
      }
      case 'update': {
        const boatUpdate = { id: boat.id, changes: boat };
        this._store.dispatch(new UpdateBoatSuccess({ boat: boatUpdate }));
        return;
      }
      case 'delete': {
        this._store.dispatch(new DeleteBoat({ id: boat.id }));
        return;
      }
    }
  }

  timeTrialMessageReceived(updateEvent: UpdateEvent<TimeTrial>) {
    const time_trial = new TimeTrial(updateEvent.payload);
    switch (updateEvent.update_method) {
      case 'create': {
        this._store.dispatch(new CreateTimeTrialSuccess({ time_trial }));
        return;
      }
      case 'update': {
        const timeTrialUpdate = { id: time_trial.id, changes: time_trial };
        this._store.dispatch(new UpdateTimeTrialSuccess({ time_trial: timeTrialUpdate }));
        return;
      }
      case 'delete': {
        this._store.dispatch(new DeleteTimeTrial({ id: time_trial.id }));
        return;
      }
    }
  }

  private initSocket() {
    this.socket.on('connected', () => {
      this.channelID = this.socket.id;
    });

    this.socket.on('race-data-update', (body: UpdateEvent<any>) => {
      console.log(body);
      switch (body.data_type) {
        case 'boat': {
          this.boatMessageReceived(body);
          return;
        }
        case 'time-trial': {
          this.timeTrialMessageReceived(body);
          return;
        }
      }
    });
  }

  public joinRace(timeTrial: TimeTrial) {
    const joinEvent = `join-race`;
    const raceEvent = `race-${timeTrial.id}`;
    const timestamp = moment().unix();
    const updateEvent: UpdateEvent<any> = {
      data_type: 'time-trial',
      update_method: 'join',
      payload: {
        timestamp,
        race_id: timeTrial.id,
        timers: timeTrial.timers,
        device_id: this.deviceDetectorService.device
      }
    };
    this.socket.on(raceEvent, (event) => {
      console.log(event, timestamp);
    });

    this.socket.emit(joinEvent, updateEvent);
  }
}
