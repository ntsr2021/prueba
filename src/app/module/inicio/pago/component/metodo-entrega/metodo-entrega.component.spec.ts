import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoEntregaComponent } from './metodo-entrega.component';

describe('MetodoEntregaComponent', () => {
  let component: MetodoEntregaComponent;
  let fixture: ComponentFixture<MetodoEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetodoEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
