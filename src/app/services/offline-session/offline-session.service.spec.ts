import { TestBed } from '@angular/core/testing';

import { OfflineSessionService } from './offline-session.service';

describe('OfflineSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfflineSessionService = TestBed.get(OfflineSessionService);
    expect(service).toBeTruthy();
  });
});
