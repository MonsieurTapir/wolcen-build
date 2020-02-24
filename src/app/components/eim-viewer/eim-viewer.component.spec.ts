import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EimViewerComponent } from './eim-viewer.component';

describe('EimViewerComponent', () => {
  let component: EimViewerComponent;
  let fixture: ComponentFixture<EimViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EimViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EimViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
