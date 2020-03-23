import { TestBed } from '@angular/core/testing';

import { ContatoDataService } from './contato-data.service';

describe('ContatoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoDataService = TestBed.get(ContatoDataService);
    expect(service).toBeTruthy();
  });
});
