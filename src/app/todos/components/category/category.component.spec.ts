import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { hexToRgb } from '@swimlane/ngx-charts';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    component.category = {name: 'Work', color: '#ffffff'};
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
