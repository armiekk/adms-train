/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad2i010Component } from './qad2i010.component';

describe('Qad2i010Component', () => {
  let component: Qad2i010Component;
  let fixture: ComponentFixture<Qad2i010Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad2i010Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad2i010Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
