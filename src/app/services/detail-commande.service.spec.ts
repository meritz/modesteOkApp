import { TestBed, inject } from '@angular/core/testing';

import { DetailCommandeService } from './detail-commande.service';

describe('DetailCommandeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailCommandeService]
    });
  });

  it('should be created', inject([DetailCommandeService], (service: DetailCommandeService) => {
    expect(service).toBeTruthy();
  }));
});
