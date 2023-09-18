import { TestBed } from '@angular/core/testing';

import { CatsImageService } from './cats-image.service';

describe('CatsImageService', () => {
  let service: CatsImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatsImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
