import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProResenaComponent } from './pro-resena.component';

describe('ProResenaComponent', () => {
  let component: ProResenaComponent;
  let fixture: ComponentFixture<ProResenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProResenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
