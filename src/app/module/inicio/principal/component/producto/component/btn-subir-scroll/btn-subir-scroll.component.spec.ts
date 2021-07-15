import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSubirScrollComponent } from './btn-subir-scroll.component';

describe('BtnSubirScrollComponent', () => {
  let component: BtnSubirScrollComponent;
  let fixture: ComponentFixture<BtnSubirScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSubirScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSubirScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
