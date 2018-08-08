import { TestBed, inject } from '@angular/core/testing';

import { WordPaletteService } from './word-palette.service';

describe('WordPaletteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordPaletteService]
    });
  });

  it('should be created', inject([WordPaletteService], (service: WordPaletteService) => {
    expect(service).toBeTruthy();
  }));
});
