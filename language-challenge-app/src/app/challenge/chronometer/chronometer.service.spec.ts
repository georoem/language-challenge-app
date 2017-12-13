import { TestBed, inject } from '@angular/core/testing';

import { ChronometerService } from './chronometer.service';

describe('ChronometerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChronometerService]
    });
  });

  it('should be created', inject([ChronometerService], (service: ChronometerService) => {
    expect(service).toBeTruthy();
  }));
});
