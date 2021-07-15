import { TestBed } from '@angular/core/testing';

import { ProductoMultimaxService } from './producto-multimax.service';

describe('ProductoMultimaxService', () => {
  let service: ProductoMultimaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoMultimaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
