import { TestBed } from '@angular/core/testing';

import { VendedorGuard } from './vendedor.guard';

describe('VendedorGuard', () => {
  let guard: VendedorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VendedorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
