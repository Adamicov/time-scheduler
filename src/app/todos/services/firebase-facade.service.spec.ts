import { TestBed } from '@angular/core/testing';

import { FirebaseFacadeService } from './firebase-facade.service';

describe('FirebaseFacadeService', () => {
  let service: FirebaseFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
