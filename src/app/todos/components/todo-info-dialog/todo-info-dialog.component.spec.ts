import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInfoDialogComponent } from './todo-info-dialog.component';

describe('TodoInfoDialogComponent', () => {
  let component: TodoInfoDialogComponent;
  let fixture: ComponentFixture<TodoInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
