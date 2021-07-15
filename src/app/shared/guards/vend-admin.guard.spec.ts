import { TestBed } from '@angular/core/testing';

import { VendAdminGuard } from './vend-admin.guard';

describe('VendAdminGuard', () => {
  let guard: VendAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VendAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
