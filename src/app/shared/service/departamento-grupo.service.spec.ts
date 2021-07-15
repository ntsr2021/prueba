import { TestBed } from '@angular/core/testing';

import { DepartamentoGrupoService } from './departamento-grupo.service';

describe('DepartamentoGrupoService', () => {
  let service: DepartamentoGrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartamentoGrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
