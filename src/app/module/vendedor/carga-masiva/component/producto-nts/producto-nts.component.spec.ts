import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoNtsComponent } from './producto-nts.component';

describe('ProductoNtsComponent', () => {
  let component: ProductoNtsComponent;
  let fixture: ComponentFixture<ProductoNtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoNtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoNtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
