import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfectivoComponent } from './efectivo.component';

describe('EfectivoComponent', () => {
  let component: EfectivoComponent;
  let fixture: ComponentFixture<EfectivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfectivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
