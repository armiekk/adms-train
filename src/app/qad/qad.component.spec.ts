/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QadComponent } from './qad.component';

describe('QadComponent', () => {
  let component: QadComponent;
  let fixture: ComponentFixture<QadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
