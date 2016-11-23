/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad1i020Component } from './qad1i020.component';

describe('Qad1i020Component', () => {
  let component: Qad1i020Component;
  let fixture: ComponentFixture<Qad1i020Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad1i020Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad1i020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
