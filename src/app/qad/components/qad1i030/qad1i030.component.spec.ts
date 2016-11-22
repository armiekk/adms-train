/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad1i030Component } from './qad1i030.component';

describe('Qad1i030Component', () => {
  let component: Qad1i030Component;
  let fixture: ComponentFixture<Qad1i030Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad1i030Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad1i030Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
