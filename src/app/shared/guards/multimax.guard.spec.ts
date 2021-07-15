import { TestBed } from '@angular/core/testing';

import { MultimaxGuard } from './multimax.guard';

describe('MultimaxGuard', () => {
  let guard: MultimaxGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MultimaxGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
