/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pri1i020Component } from './pri1i020.component';

describe('Pri1i020Component', () => {
  let component: Pri1i020Component;
  let fixture: ComponentFixture<Pri1i020Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pri1i020Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pri1i020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
