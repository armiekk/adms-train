/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QadConstantsService } from './qad-constants.service';

describe('Service: QadConstants', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QadConstantsService]
    });
  });

  it('should ...', inject([QadConstantsService], (service: QadConstantsService) => {
    expect(service).toBeTruthy();
  }));
});
