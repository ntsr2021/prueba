import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMovilComponent } from './pago-movil.component';

describe('PagoMovilComponent', () => {
  let component: PagoMovilComponent;
  let fixture: ComponentFixture<PagoMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
