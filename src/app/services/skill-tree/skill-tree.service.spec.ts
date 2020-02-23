import { TestBed } from '@angular/core/testing';

import { SkillTreeService } from './skill-tree.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('SkillTreeService', () => {
  let service: SkillTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientModule]});
    service = TestBed.inject(SkillTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
