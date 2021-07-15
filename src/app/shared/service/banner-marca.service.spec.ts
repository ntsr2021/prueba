import { TestBed } from '@angular/core/testing';

import { BannerMarcaService } from './banner-marca.service';

describe('BannerMarcaService', () => {
  let service: BannerMarcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerMarcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
