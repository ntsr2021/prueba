import { TestBed } from '@angular/core/testing';

import { NotificacionAdministracionService } from './notificacion-administracion.service';

describe('NotificacionService', () => {
  let service: NotificacionAdministracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacionAdministracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
