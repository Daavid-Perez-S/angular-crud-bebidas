import { TestBed } from '@angular/core/testing';

import { DjangoCrudApiService } from './django-crud-api.service';

describe('DjangoCrudApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DjangoCrudApiService = TestBed.get(DjangoCrudApiService);
    expect(service).toBeTruthy();
  });
});
