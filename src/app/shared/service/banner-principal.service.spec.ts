import { TestBed } from '@angular/core/testing';

import { BannerPrincipalService } from './banner-principal.service';

describe('BannerPrincipalService', () => {
  let service: BannerPrincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerPrincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
