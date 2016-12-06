/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad2q010Component } from './qad2q010.component';

describe('Qad2q010Component', () => {
  let component: Qad2q010Component;
  let fixture: ComponentFixture<Qad2q010Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad2q010Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad2q010Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
