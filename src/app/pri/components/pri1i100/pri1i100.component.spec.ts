/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pri1i100Component } from './pri1i100.component';

describe('Pri1i100Component', () => {
  let component: Pri1i100Component;
  let fixture: ComponentFixture<Pri1i100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pri1i100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pri1i100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
