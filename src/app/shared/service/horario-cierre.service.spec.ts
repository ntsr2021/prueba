import { TestBed } from '@angular/core/testing';

import { HorarioCierreService } from './horario-cierre.service';

describe('HorarioCierreService', () => {
  let service: HorarioCierreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioCierreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
