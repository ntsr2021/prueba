import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumeMultimaxComponent } from './perfume-multimax.component';

describe('PerfumeMultimaxComponent', () => {
  let component: PerfumeMultimaxComponent;
  let fixture: ComponentFixture<PerfumeMultimaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfumeMultimaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfumeMultimaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
