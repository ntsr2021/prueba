import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolivaresComponent } from './bolivares.component';

describe('BolivaresComponent', () => {
  let component: BolivaresComponent;
  let fixture: ComponentFixture<BolivaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolivaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolivaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
