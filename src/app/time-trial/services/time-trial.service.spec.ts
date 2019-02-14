import { TestBed } from '@angular/core/testing';

import { TimeTrialService } from './time-trial.service';

describe('TimeTrialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeTrialService = TestBed.get(TimeTrialService);
    expect(service).toBeTruthy();
  });
});
