import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefijosTelefonoComponent } from './prefijos-telefono.component';

describe('PrefijosTelefonoComponent', () => {
  let component: PrefijosTelefonoComponent;
  let fixture: ComponentFixture<PrefijosTelefonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefijosTelefonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefijosTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
