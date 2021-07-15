import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoEntregaComponent } from './punto-entrega.component';

describe('PuntoEntregaComponent', () => {
  let component: PuntoEntregaComponent;
  let fixture: ComponentFixture<PuntoEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
