import { TestBed } from '@angular/core/testing';

import { ReclamacoesService } from './reclamacoes.service';

describe('ReclamacoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReclamacoesService = TestBed.get(ReclamacoesService);
    expect(service).toBeTruthy();
  });
});
