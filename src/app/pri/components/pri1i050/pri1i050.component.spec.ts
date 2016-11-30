/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pri1i050Component } from './pri1i050.component';

describe('Pri1i050Component', () => {
  let component: Pri1i050Component;
  let fixture: ComponentFixture<Pri1i050Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pri1i050Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pri1i050Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
