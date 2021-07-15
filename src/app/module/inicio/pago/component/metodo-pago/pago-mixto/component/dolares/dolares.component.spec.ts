import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DolaresComponent } from './dolares.component';

describe('DolaresComponent', () => {
  let component: DolaresComponent;
  let fixture: ComponentFixture<DolaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DolaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DolaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
