import { TestBed } from '@angular/core/testing';

import { ProductoFotoService } from './producto-foto.service';

describe('ProductoFotoService', () => {
  let service: ProductoFotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoFotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
