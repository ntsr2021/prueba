import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionPaypalComponent } from './comision-paypal.component';

describe('ComisionPaypalComponent', () => {
  let component: ComisionPaypalComponent;
  let fixture: ComponentFixture<ComisionPaypalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionPaypalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
