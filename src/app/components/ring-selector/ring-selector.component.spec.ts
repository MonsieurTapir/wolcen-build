import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingSelectorComponent } from './ring-selector.component';

describe('RingSelectorComponent', () => {
  let component: RingSelectorComponent;
  let fixture: ComponentFixture<RingSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RingSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
