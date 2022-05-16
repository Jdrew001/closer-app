import { TestBed } from '@angular/core/testing';

import { BarGraphService } from './bar-graph.service';

describe('BarGraphService', () => {
  let service: BarGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
