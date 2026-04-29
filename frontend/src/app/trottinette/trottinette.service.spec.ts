import { TestBed } from '@angular/core/testing';

import { TrottinetteService } from './trottinette.service';

describe('TrottinetteService', () => {
  let service: TrottinetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrottinetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
