import { TestBed } from '@angular/core/testing';

import { PuntoEntregaService } from './punto-entrega.service';

describe('PuntoEntregaService', () => {
  let service: PuntoEntregaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntoEntregaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
