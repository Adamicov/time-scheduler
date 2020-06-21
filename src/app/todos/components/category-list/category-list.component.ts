import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Category } from '@models/category';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  CategoryDialogComponent,
  CategoryDialogResponse,
} from '../category-dialog/category-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit, OnDestroy {
  @Input() categories: Category[];

  @Output() categoryChanges = new EventEmitter<CategoryDialogResponse>();

  subscription = new Subscription();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  addCategory(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {},
    });
    this.closeDialog(dialogRef);
  }

  editCategory(category: Category): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: { category },
    });
    this.closeDialog(dialogRef);
  }

  closeDialog(dialogRef: MatDialogRef<CategoryDialogComponent>) {
    this.subscription.add(
      dialogRef
        .afterClosed()
        .pipe(filter((res) => !!res))
        .subscribe((res) => this.categoryChanges.emit(res))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
