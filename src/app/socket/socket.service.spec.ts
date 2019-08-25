import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';
import {Store} from '@ngrx/store';
import {TestStore} from '../../../testing/store.mock';

describe('SocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: Store, useClass: TestStore}]
  }));

  it('should be created', () => {
    const service: SocketService = TestBed.get(SocketService);
    expect(service).toBeTruthy();
  });
});
