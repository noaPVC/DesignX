import { TestBed } from '@angular/core/testing';

import { RegisterSharedService } from './register-shared.service';

describe('RegisterSharedService', () => {
  let service: RegisterSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
