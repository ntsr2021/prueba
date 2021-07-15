import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreTiendaComponent } from './cierre-tienda.component';

describe('CierreTiendaComponent', () => {
  let component: CierreTiendaComponent;
  let fixture: ComponentFixture<CierreTiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierreTiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierreTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
