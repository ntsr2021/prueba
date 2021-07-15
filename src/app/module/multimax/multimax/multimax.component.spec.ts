import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimaxComponent } from './multimax.component';

describe('MultimaxComponent', () => {
  let component: MultimaxComponent;
  let fixture: ComponentFixture<MultimaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultimaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultimaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
