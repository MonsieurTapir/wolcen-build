import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EimListEntryComponent } from './eim-list-entry.component';

describe('EimListEntryComponent', () => {
  let component: EimListEntryComponent;
  let fixture: ComponentFixture<EimListEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EimListEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EimListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
