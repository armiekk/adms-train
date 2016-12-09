/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleManagementService } from './role-management.service';

describe('RoleManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleManagementService]
    });
  });

  it('should ...', inject([RoleManagementService], (service: RoleManagementService) => {
    expect(service).toBeTruthy();
  }));
});
