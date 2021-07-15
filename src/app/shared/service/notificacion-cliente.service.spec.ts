import { TestBed } from '@angular/core/testing';

import { NotificacionClienteService } from './notificacion-cliente.service';

describe('NotificacionClienteService', () => {
  let service: NotificacionClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacionClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
