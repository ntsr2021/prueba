import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProDetalleComponent } from './pro-detalle.component';

describe('ProDetalleComponent', () => {
  let component: ProDetalleComponent;
  let fixture: ComponentFixture<ProDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
