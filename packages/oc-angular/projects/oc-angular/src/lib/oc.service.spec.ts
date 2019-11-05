import { TestBed } from '@angular/core/testing';

import { OcService } from './oc.service';

describe('OcAngularService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OcService = TestBed.get(OcService);
    expect(service).toBeTruthy();
  });
});
