import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimiteTiempoComponent } from './limite-tiempo.component';

describe('LimiteTiempoComponent', () => {
  let component: LimiteTiempoComponent;
  let fixture: ComponentFixture<LimiteTiempoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimiteTiempoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimiteTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
