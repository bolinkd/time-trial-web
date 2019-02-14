import { TestBed } from '@angular/core/testing';

import { BoatService } from './boat.service';

describe('BoatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoatService = TestBed.get(BoatService);
    expect(service).toBeTruthy();
  });
});
