/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PriStateResolverService } from './pri-state-resolver.service';

describe('Service: PriStateResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriStateResolverService]
    });
  });

  it('should ...', inject([PriStateResolverService], (service: PriStateResolverService) => {
    expect(service).toBeTruthy();
  }));
});
