/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SreComponent } from './sre.component';

describe('SreComponent', () => {
  let component: SreComponent;
  let fixture: ComponentFixture<SreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
