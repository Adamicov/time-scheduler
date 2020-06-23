import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '@models/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COLORS } from '../../config';
import { CrudEnum } from '@models/crud-enum';

export interface CategoryDialogData {
  category?: Category | undefined;
}

export interface CategoryDialogResponse {
  data: Category;
  action: CrudEnum;
}

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  crudEnum = CrudEnum;
  COLORS = COLORS;

  category: Category | undefined;
  categoryForm: FormGroup;
  action: CrudEnum;
  selectedColor: string | undefined;

  constructor(
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: CategoryDialogData
  ) {}

  // set category(category: Category) {
  //   this.action = category ? CrudEnum.Update : CrudEnum.Save;
  //   const name = category?.name;
  //   const color = category?.color;
  //
  //   this.name = name ? name : '';
  //   this.selectedColor = color ? color : COLORS[0];
  // }

  ngOnInit(): void {
    this.category = this.data.category;
    this.selectedColor = this.category?.color ? this.category.color : COLORS[0];
    this.action = this.category ? CrudEnum.Update : CrudEnum.Save;
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
    if (this.category) {
      this.categoryForm.patchValue({ ...this.category });
    }
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  submit(): void {
    if (this.categoryForm.invalid) {
      return;
    }
    const previousCategory: Category | undefined = this.data.category;
    const category: Category = {
      ...previousCategory,
      name: this.categoryForm.value.name,
      color: this.selectedColor,
    };
    this.dialogRef.close({ data: category, action: this.action });
  }

  delete(): void {
    this.dialogRef.close({ data: this.category, action: CrudEnum.Delete });
  }
}
