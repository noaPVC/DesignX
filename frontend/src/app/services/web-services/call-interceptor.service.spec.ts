import { TestBed } from '@angular/core/testing';

import { CallInterceptorService } from './call-interceptor.service';

describe('CallInterceptorService', () => {
  let service: CallInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
