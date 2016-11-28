/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pri1i060Component } from './pri1i060.component';

describe('Pri1i060Component', () => {
  let component: Pri1i060Component;
  let fixture: ComponentFixture<Pri1i060Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pri1i060Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pri1i060Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
