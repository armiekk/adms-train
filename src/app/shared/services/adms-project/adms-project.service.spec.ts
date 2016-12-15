/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdmsProjectService } from './adms-project.service';

describe('AdmsProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdmsProjectService]
    });
  });

  it('should ...', inject([AdmsProjectService], (service: AdmsProjectService) => {
    expect(service).toBeTruthy();
  }));
});
