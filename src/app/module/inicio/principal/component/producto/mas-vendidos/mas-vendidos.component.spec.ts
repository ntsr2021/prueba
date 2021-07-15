import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasVendidosComponent } from './mas-vendidos.component';

describe('MasVendidosComponent', () => {
  let component: MasVendidosComponent;
  let fixture: ComponentFixture<MasVendidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasVendidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
