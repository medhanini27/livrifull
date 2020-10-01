import { TestBed } from '@angular/core/testing';

import { VarglobaleService } from './varglobale.service';

describe('VarglobaleService', () => {
  let service: VarglobaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarglobaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
