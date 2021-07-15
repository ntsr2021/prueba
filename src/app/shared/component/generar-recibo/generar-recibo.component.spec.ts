import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarReciboComponent } from './generar-recibo.component';

describe('ReciboComponent', () => {
  let component: GenerarReciboComponent;
  let fixture: ComponentFixture<GenerarReciboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarReciboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
