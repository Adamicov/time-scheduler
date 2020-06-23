import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosChartsComponent } from './todos-charts.component';

describe('TodosChartsComponent', () => {
  let component: TodosChartsComponent;
  let fixture: ComponentFixture<TodosChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
